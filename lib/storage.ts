import { LoreArticle, DossierRecord, CANONICAL_LORE_ARTICLES, INITIAL_DOSSIERS } from './loreData';

const STORAGE_KEYS = {
  ARTICLES: 'lorekeeper_custom_articles',
  DOSSIERS: 'lorekeeper_custom_dossiers',
  BOOKMARKS: 'lorekeeper_bookmarks',
  SESSION_LOGS: 'lorekeeper_session_logs',
};

export interface SessionLog {
  id: string;
  timestamp: string;
  title: string;
  summary: string;
  category: string;
  notes: string;
}

export interface StudioExportBundle {
  version: string;
  exportedAt: string;
  system: 'Lorekeeper / Worldmaker Studio (Ur-Worlds)';
  customArticles: LoreArticle[];
  customDossiers: DossierRecord[];
  bookmarks: string[];
  sessionLogs: SessionLog[];
}

export function getStoredArticles(): LoreArticle[] {
  if (typeof window === 'undefined') return CANONICAL_LORE_ARTICLES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!raw) return CANONICAL_LORE_ARTICLES;
    const parsed: LoreArticle[] = JSON.parse(raw);
    // Combine canonical with custom, avoiding duplicates by id
    const customOnly = parsed.filter(p => !CANONICAL_LORE_ARTICLES.some(c => c.id === p.id));
    return [...CANONICAL_LORE_ARTICLES, ...customOnly];
  } catch (err) {
    console.error('Failed to load stored articles:', err);
    return CANONICAL_LORE_ARTICLES;
  }
}

export function saveArticles(articles: LoreArticle[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  } catch (err) {
    console.error('Failed to save articles:', err);
  }
}

export function getStoredDossiers(): DossierRecord[] {
  if (typeof window === 'undefined') return INITIAL_DOSSIERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DOSSIERS);
    if (!raw) return INITIAL_DOSSIERS;
    const parsed: DossierRecord[] = JSON.parse(raw);
    const customOnly = parsed.filter(p => !INITIAL_DOSSIERS.some(c => c.id === p.id));
    return [...INITIAL_DOSSIERS, ...customOnly];
  } catch (err) {
    console.error('Failed to load stored dossiers:', err);
    return INITIAL_DOSSIERS;
  }
}

export function saveDossiers(dossiers: DossierRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.DOSSIERS, JSON.stringify(dossiers));
  } catch (err) {
    console.error('Failed to save dossiers:', err);
  }
}

export function getStoredBookmarks(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBookmark(id: string): string[] {
  if (typeof window === 'undefined') return [];
  const current = getStoredBookmarks();
  const next = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(next));
  return next;
}

export function getStoredSessionLogs(): SessionLog[] {
  if (typeof window === 'undefined') return DEFAULT_SESSION_LOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION_LOGS);
    return raw ? JSON.parse(raw) : DEFAULT_SESSION_LOGS;
  } catch {
    return DEFAULT_SESSION_LOGS;
  }
}

export function saveSessionLogs(logs: SessionLog[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.SESSION_LOGS, JSON.stringify(logs));
}

export const DEFAULT_SESSION_LOGS: SessionLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-23T08:30:00Z',
    title: 'Foundational Discovery & Primary Lore Synthesis',
    summary: 'Codified the core cosmological draft of the Ur-Worlds into formal ontological tiers.',
    category: 'Ontological Discovery',
    notes: 'Established the distinction between MWI quantum manipulation (MAGIC) and somatic biology (Ki). Outlined the 144 Cacodictyology roots and the Gun System energy economy.'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-23T08:45:00Z',
    title: 'Ki Somatic Engine & Hardware Toll Calibration',
    summary: 'Calculated thermal pore-steam venting thresholds and lactic vitrification parameters.',
    category: 'Power Systems',
    notes: 'Grounding Ki in physical biology rather than magical will ensures visceral game feel. Gō-Ki roar triggers 30-60 Hz acoustic suppression in surround mix.'
  }
];

export function exportProjectBundle(): string {
  const bundle: StudioExportBundle = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    system: 'Lorekeeper / Worldmaker Studio (Ur-Worlds)',
    customArticles: getStoredArticles(),
    customDossiers: getStoredDossiers(),
    bookmarks: getStoredBookmarks(),
    sessionLogs: getStoredSessionLogs()
  };
  return JSON.stringify(bundle, null, 2);
}

export function importProjectBundle(jsonString: string): boolean {
  try {
    const bundle: StudioExportBundle = JSON.parse(jsonString);
    if (!bundle.customArticles || !bundle.customDossiers) return false;
    saveArticles(bundle.customArticles);
    saveDossiers(bundle.customDossiers);
    if (bundle.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bundle.bookmarks));
    if (bundle.sessionLogs) saveSessionLogs(bundle.sessionLogs);
    return true;
  } catch (err) {
    console.error('Import failed:', err);
    return false;
  }
}
