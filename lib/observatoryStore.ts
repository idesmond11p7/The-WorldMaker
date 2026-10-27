import {
  ObservatoryWorkspaceState,
  RecordCollectionType,
  BaseRecord,
  CanonStatus,
  RevisionRecord,
  LoreDocument,
} from './observatoryTypes';
import { buildCanonicalObservatorySeed } from './observatorySeed';

const IDB_NAME = 'LorekeepersObservatoryDB';
const IDB_VERSION = 2;
const STORE_NAME = 'workspace_state';
const STATE_KEY = 'observatory_v2_main';

function openObservatoryIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadObservatoryState(): Promise<ObservatoryWorkspaceState> {
  const seed = buildCanonicalObservatorySeed();
  if (typeof window === 'undefined') return seed;

  try {
    const db = await openObservatoryIDB();
    const stored = await new Promise<ObservatoryWorkspaceState | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(STATE_KEY);
      getReq.onsuccess = () => resolve(getReq.result);
      getReq.onerror = () => reject(getReq.error);
    });
    db.close();

    if (stored && stored.version === seed.version) {
      return stored;
    }
  } catch {
    // Fallback to localStorage if IDB fails
    try {
      const raw = window.localStorage.getItem(STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ObservatoryWorkspaceState;
        if (parsed && parsed.version === seed.version) {
          return parsed;
        }
      }
    } catch {
      // Ignore fallback error
    }
  }

  // Save initial seed on first run
  await saveObservatoryState(seed);
  return seed;
}

export async function saveObservatoryState(state: ObservatoryWorkspaceState): Promise<string> {
  const timestamp = new Date().toISOString();
  const nextState: ObservatoryWorkspaceState = {
    ...state,
    lastSavedAt: timestamp,
  };

  if (typeof window !== 'undefined') {
    try {
      const db = await openObservatoryIDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const putReq = store.put(nextState, STATE_KEY);
        putReq.onsuccess = () => resolve();
        putReq.onerror = () => reject(putReq.error);
      });
      db.close();
    } catch {
      try {
        window.localStorage.setItem(STATE_KEY, JSON.stringify(nextState));
      } catch {
        // Quota or private browsing fallback
      }
    }

    // Also mirror lightweight metadata & custom records to server /api/records
    try {
      fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          version: nextState.version,
          lastSavedAt: timestamp,
          recordCounts: {
            loreDocuments: nextState.loreDocuments.length,
            entities: nextState.entities.length,
            locations: nextState.locations.length,
            factions: nextState.factions.length,
            abilities: nextState.abilities.length,
            powerSystems: nextState.powerSystems.length,
            powerInteractions: nextState.powerInteractions.length,
            visualReferences: nextState.visualReferences.length,
            designBoards: nextState.designBoards.length,
            effectsSequences: nextState.effectsSequences.length,
            ideas: nextState.ideas.length,
            researchRecords: nextState.researchRecords.length,
            relationships: nextState.relationships.length,
          },
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking server mirror
    }
  }

  return timestamp;
}

export function findRecordAcrossState(
  state: ObservatoryWorkspaceState,
  id: string
): { record: BaseRecord; type: RecordCollectionType } | null {
  const collections: { key: keyof ObservatoryWorkspaceState; type: RecordCollectionType }[] = [
    { key: 'projects', type: 'project' },
    { key: 'loreDocuments', type: 'lore' },
    { key: 'entities', type: 'entity' },
    { key: 'locations', type: 'location' },
    { key: 'factions', type: 'faction' },
    { key: 'abilities', type: 'ability' },
    { key: 'powerSystems', type: 'powerSystem' },
    { key: 'powerInteractions', type: 'powerInteraction' },
    { key: 'visualReferences', type: 'visualReference' },
    { key: 'designBoards', type: 'designBoard' },
    { key: 'effectsSequences', type: 'effectsSequence' },
    { key: 'ideas', type: 'idea' },
    { key: 'researchRecords', type: 'research' },
  ];

  for (const col of collections) {
    const arr = state[col.key] as unknown as BaseRecord[];
    if (Array.isArray(arr)) {
      const found = arr.find((item) => item.id === id);
      if (found) {
        return { record: found, type: col.type };
      }
    }
  }
  return null;
}

export function listAllRecordsWithTypes(
  state: ObservatoryWorkspaceState
): { record: BaseRecord; type: RecordCollectionType; typeLabel: string }[] {
  const mapping: { key: keyof ObservatoryWorkspaceState; type: RecordCollectionType; label: string }[] = [
    { key: 'loreDocuments', type: 'lore', label: 'Lore Document' },
    { key: 'locations', type: 'location', label: 'Realm / Location' },
    { key: 'factions', type: 'faction', label: 'Faction / Root' },
    { key: 'entities', type: 'entity', label: 'Entity' },
    { key: 'powerSystems', type: 'powerSystem', label: 'Power System' },
    { key: 'abilities', type: 'ability', label: 'Ability' },
    { key: 'powerInteractions', type: 'powerInteraction', label: 'Power Interaction' },
    { key: 'visualReferences', type: 'visualReference', label: 'Visual Reference' },
    { key: 'designBoards', type: 'designBoard', label: 'Design Board' },
    { key: 'effectsSequences', type: 'effectsSequence', label: 'Effects Sequence' },
    { key: 'ideas', type: 'idea', label: 'Idea / Concept' },
    { key: 'researchRecords', type: 'research', label: 'Research Record' },
    { key: 'projects', type: 'project', label: 'Project' },
  ];

  const results: { record: BaseRecord; type: RecordCollectionType; typeLabel: string }[] = [];
  for (const m of mapping) {
    const list = state[m.key] as unknown as BaseRecord[];
    if (Array.isArray(list)) {
      for (const item of list) {
        results.push({ record: item, type: m.type, typeLabel: m.label });
      }
    }
  }
  return results;
}

export function updateRecordCanonStatus(
  state: ObservatoryWorkspaceState,
  recordId: string,
  newStatus: CanonStatus,
  reason: string
): ObservatoryWorkspaceState {
  const found = findRecordAcrossState(state, recordId);
  if (!found) return state;

  const now = new Date().toISOString();
  const prevStatus = found.record.canonStatus;

  const rev: RevisionRecord = {
    id: `rev-${Date.now()}`,
    recordId,
    recordType: found.type,
    recordTitle: found.record.title,
    previousStatus: prevStatus,
    newStatus,
    changeSummary: reason || `Canon authority updated from ${prevStatus} to ${newStatus}.`,
    timestamp: now,
  };

  const updateCollection = <T extends BaseRecord>(arr: T[]): T[] =>
    arr.map((item) => (item.id === recordId ? { ...item, canonStatus: newStatus, updatedAt: now } : item));

  return {
    ...state,
    projects: updateCollection(state.projects),
    loreDocuments: updateCollection(state.loreDocuments),
    entities: updateCollection(state.entities),
    locations: updateCollection(state.locations),
    factions: updateCollection(state.factions),
    abilities: updateCollection(state.abilities),
    powerSystems: updateCollection(state.powerSystems),
    powerInteractions: updateCollection(state.powerInteractions),
    visualReferences: updateCollection(state.visualReferences),
    designBoards: updateCollection(state.designBoards),
    effectsSequences: updateCollection(state.effectsSequences),
    ideas: updateCollection(state.ideas),
    researchRecords: updateCollection(state.researchRecords),
    revisions: [rev, ...state.revisions],
  };
}

export function exportLoreDocumentToMarkdown(doc: LoreDocument): string {
  return `# ${doc.title}

- **ID:** \`${doc.id}\`
- **Category:** ${doc.category}
- **Kicker:** ${doc.kicker}
- **Canon Status:** ${doc.canonStatus}
- **Source Citation:** ${doc.sourceCitation || 'Primary Draft'}
- **Tags:** ${doc.tags.join(', ')}
- **Last Updated:** ${doc.updatedAt}

## Executive Summary
${doc.summary}

---

## Full Analysis & Documentation
${doc.content}

---

## Epistemic Separation

### 1. Established Facts (Directly Stated in Primary Draft)
${doc.establishedFacts.map((f) => `- ${f}`).join('\n')}

### 2. Inferred Principles (Deduced from Design Logic)
${doc.inferredPrinciples.map((p) => `- ${p}`).join('\n')}

### 3. Unresolved Questions (Open for Creative Development)
${doc.unresolvedQuestions.map((q) => `- ${q}`).join('\n')}
`;
}

export function triggerFileDownload(filename: string, content: string, mimeType = 'application/json') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
