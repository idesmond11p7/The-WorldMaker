'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  WorkspaceId,
  ObservatoryWorkspaceState,
  CanonStatus,
  RelationType,
  BaseRecord,
  Project,
  LocationOrRealm,
  Faction,
  Entity,
  Ability,
  PowerInteraction,
  PowerSystem,
  VisualReference,
  DesignBoardItem,
  EffectsSequence,
  Idea,
  ResearchRecord,
  LoreDocument,
} from '@/lib/observatoryTypes';
import { buildCanonicalObservatorySeed } from '@/lib/observatorySeed';
import {
  loadObservatoryState,
  saveObservatoryState,
  findRecordAcrossState,
  updateRecordCanonStatus,
} from '@/lib/observatoryStore';
import {
  ObservatoryTopBar,
  ObservatoryLeftRail,
} from '@/components/observatory/NavigationShell';
import { ContextInspector } from '@/components/observatory/ContextInspector';
import { ObservatoryHomeView } from '@/components/observatory/ObservatoryHomeView';
import { WorldAtlasView } from '@/components/observatory/WorldAtlasView';
import { EntitiesView } from '@/components/observatory/EntitiesView';
import { PowerForgeView } from '@/components/observatory/PowerForgeView';
import { VisualStudioView } from '@/components/observatory/VisualStudioView';
import { IdeaConstellationView } from '@/components/observatory/IdeaConstellationView';
import { ResearchDeskView } from '@/components/observatory/ResearchDeskView';
import { LoreLibraryView } from '@/components/observatory/LoreLibraryView';

export default function LorekeepersObservatoryApp() {
  const [state, setState] = useState<ObservatoryWorkspaceState>(() =>
    buildCanonicalObservatorySeed()
  );
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceId>('observatory');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>('cosmology-ontology');
  const [railCollapsed, setRailCollapsed] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(true);

  // Load persisted state from IndexedDB on client mount
  useEffect(() => {
    let mounted = true;
    loadObservatoryState().then((loaded) => {
      if (mounted) {
        setState(loaded);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const commitState = useCallback(
    (updater: (prev: ObservatoryWorkspaceState) => ObservatoryWorkspaceState) => {
      setState((prev) => {
        const next = updater(prev);
        saveObservatoryState(next);
        return next;
      });
    },
    []
  );

  const handleSelectRecord = useCallback(
    (id: string, targetWorkspace?: WorkspaceId) => {
      setSelectedRecordId(id);
      if (targetWorkspace) {
        setActiveWorkspace(targetWorkspace);
      }
      setInspectorOpen(true);

      commitState((prev) => {
        const found = findRecordAcrossState(prev, id);
        if (!found) return prev;
        const filteredRecent = prev.recentRecordIds.filter((r) => r.id !== id);
        return {
          ...prev,
          recentRecordIds: [
            {
              id,
              type: found.type,
              title: found.record.title,
              timestamp: new Date().toISOString(),
            },
            ...filteredRecent,
          ].slice(0, 12),
        };
      });
    },
    [commitState]
  );

  const handleUpdateStatus = useCallback(
    (recordId: string, newStatus: CanonStatus, reason: string) => {
      commitState((prev) => updateRecordCanonStatus(prev, recordId, newStatus, reason));
    },
    [commitState]
  );

  const handleAddRelationship = useCallback(
    (sourceId: string, targetId: string, relationType: RelationType, notes: string) => {
      commitState((prev) => {
        const src = findRecordAcrossState(prev, sourceId);
        const tgt = findRecordAcrossState(prev, targetId);
        if (!src || !tgt) return prev;
        const newRel = {
          id: `rel-${Date.now()}`,
          sourceId,
          sourceType: src.type,
          sourceTitle: src.record.title,
          targetId,
          targetType: tgt.type,
          targetTitle: tgt.record.title,
          relationType,
          notes,
          canonStatus: 'Proposed' as CanonStatus,
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          relationships: [newRel, ...prev.relationships],
        };
      });
    },
    [commitState]
  );

  const handleDeleteRelationship = useCallback(
    (relId: string) => {
      commitState((prev) => ({
        ...prev,
        relationships: prev.relationships.filter((r) => r.id !== relId),
      }));
    },
    [commitState]
  );

  const handleAddTagToRecord = useCallback(
    (recordId: string, tag: string) => {
      commitState((prev) => {
        const addTag = <T extends BaseRecord>(arr: T[]): T[] =>
          arr.map((item) =>
            item.id === recordId && !item.tags.includes(tag)
              ? { ...item, tags: [...item.tags, tag], updatedAt: new Date().toISOString() }
              : item
          );
        return {
          ...prev,
          projects: addTag(prev.projects),
          loreDocuments: addTag(prev.loreDocuments),
          entities: addTag(prev.entities),
          locations: addTag(prev.locations),
          factions: addTag(prev.factions),
          abilities: addTag(prev.abilities),
          powerSystems: addTag(prev.powerSystems),
          powerInteractions: addTag(prev.powerInteractions),
          visualReferences: addTag(prev.visualReferences),
          designBoards: addTag(prev.designBoards),
          effectsSequences: addTag(prev.effectsSequences),
          ideas: addTag(prev.ideas),
          researchRecords: addTag(prev.researchRecords),
        };
      });
    },
    [commitState]
  );

  const handlePromoteIdeaToEntity = useCallback(
    (idea: Idea) => {
      const now = new Date().toISOString();
      const newEnt: Entity = {
        id: `ent-from-${idea.id}`,
        title: idea.title,
        summary: idea.coreConcept,
        kind: idea.domain === 'Unfleshed Demon Bloodlines' ? 'Demon Bloodline' : 'Category Race',
        categoryTier: 'Proposed Expansion',
        cognitionTier: 'Tier 3–8',
        factionOrCaste: idea.domain,
        originOrRealm: 'Ur-Verse / ForeverWorlds',
        metaphysicalNature: `Etymology: ${idea.etymology}\n\nCore Concept: ${idea.coreConcept}\n\nDraft Context: ${idea.contextFromDraft}`,
        appearanceAndSilhouette: 'Promoted from Idea Constellation; ready for 2D/3D visual study.',
        abilitiesAndPowers: idea.coreConcept,
        restrictorPlatesAndLimits: idea.restrictorPlate,
        associatedFuelOrKi: 'MWI Simulation / Supernatural Reserve',
        canonStatus: 'Proposed',
        tags: [...idea.tags, 'Promoted from Constellation'],
        createdAt: now,
        updatedAt: now,
      };
      commitState((prev) => ({
        ...prev,
        entities: [newEnt, ...prev.entities],
        relationships: [
          {
            id: `rel-prom-${Date.now()}`,
            sourceId: newEnt.id,
            sourceType: 'entity',
            sourceTitle: newEnt.title,
            targetId: idea.id,
            targetType: 'idea',
            targetTitle: idea.title,
            relationType: 'Originates from',
            notes: 'Promoted from Idea Constellation into full Entity Dossier.',
            canonStatus: 'Proposed',
            createdAt: now,
          },
          ...prev.relationships,
        ],
      }));
      setSelectedRecordId(newEnt.id);
      setActiveWorkspace('entities');
    },
    [commitState]
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-[#101117] text-[#E9E1D2] overflow-hidden">
      {/* Top Bar */}
      <ObservatoryTopBar
        activeWorkspace={activeWorkspace}
        state={state}
        inspectorOpen={inspectorOpen}
        onToggleInspector={() => setInspectorOpen((o) => !o)}
        onSelectRecord={handleSelectRecord}
        onImportState={(imported) => {
          commitState(() => imported);
        }}
        onResetToSeed={() => {
          const fresh = buildCanonicalObservatorySeed();
          commitState(() => fresh);
        }}
      />

      {/* 3-Region Desktop Workbench */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. Left Navigation Rail */}
        <ObservatoryLeftRail
          activeWorkspace={activeWorkspace}
          collapsed={railCollapsed}
          state={state}
          onSelectWorkspace={(ws) => setActiveWorkspace(ws)}
          onToggleCollapse={() => setRailCollapsed((c) => !c)}
        />

        {/* 2. Central Canvas */}
        <main className="flex-1 overflow-hidden relative bg-[#101117]">
          {activeWorkspace === 'observatory' && (
            <ObservatoryHomeView
              state={state}
              onNavigateWorkspace={(ws) => setActiveWorkspace(ws)}
              onSelectRecord={handleSelectRecord}
              onCreateProject={(proj: Project) =>
                commitState((prev) => ({
                  ...prev,
                  projects: [proj, ...prev.projects],
                }))
              }
            />
          )}

          {activeWorkspace === 'world-atlas' && (
            <WorldAtlasView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onAddLocation={(loc: LocationOrRealm) =>
                commitState((prev) => ({
                  ...prev,
                  locations: [loc, ...prev.locations],
                }))
              }
              onAddFaction={(fac: Faction) =>
                commitState((prev) => ({
                  ...prev,
                  factions: [fac, ...prev.factions],
                }))
              }
              onUpdateNodeCoords={(id, kind, x, y) =>
                commitState((prev) => ({
                  ...prev,
                  locations:
                    kind === 'location'
                      ? prev.locations.map((l) => (l.id === id ? { ...l, mapX: x, mapY: y } : l))
                      : prev.locations,
                  factions:
                    kind === 'faction'
                      ? prev.factions.map((f) => (f.id === id ? { ...f, mapX: x, mapY: y } : f))
                      : prev.factions,
                }))
              }
            />
          )}

          {activeWorkspace === 'entities' && (
            <EntitiesView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onSaveEntity={(ent: Entity) =>
                commitState((prev) => ({
                  ...prev,
                  entities: [ent, ...prev.entities],
                }))
              }
            />
          )}

          {activeWorkspace === 'power-forge' && (
            <PowerForgeView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onAddAbility={(ab: Ability) =>
                commitState((prev) => ({
                  ...prev,
                  abilities: [ab, ...prev.abilities],
                }))
              }
              onAddInteraction={(pi: PowerInteraction) =>
                commitState((prev) => ({
                  ...prev,
                  powerInteractions: [pi, ...prev.powerInteractions],
                }))
              }
              onAddPowerSystem={(ps: PowerSystem) =>
                commitState((prev) => ({
                  ...prev,
                  powerSystems: [ps, ...prev.powerSystems],
                }))
              }
            />
          )}

          {activeWorkspace === 'visual-studio' && (
            <VisualStudioView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onUploadVisualReference={(ref: VisualReference) =>
                commitState((prev) => ({
                  ...prev,
                  visualReferences: [ref, ...prev.visualReferences],
                }))
              }
              onUpdateDesignBoardItemPos={(boardId, itemId, x, y) =>
                commitState((prev) => ({
                  ...prev,
                  designBoards: prev.designBoards.map((b) =>
                    b.id === boardId
                      ? {
                          ...b,
                          items: b.items.map((it) =>
                            it.id === itemId ? { ...it, x, y } : it
                          ),
                        }
                      : b
                  ),
                }))
              }
              onAddDesignBoardItem={(boardId, item: DesignBoardItem) =>
                commitState((prev) => ({
                  ...prev,
                  designBoards: prev.designBoards.map((b) =>
                    b.id === boardId ? { ...b, items: [...b.items, item] } : b
                  ),
                }))
              }
              onToggleBoardMode={(boardId, mode) =>
                commitState((prev) => ({
                  ...prev,
                  designBoards: prev.designBoards.map((b) =>
                    b.id === boardId ? { ...b, mode } : b
                  ),
                }))
              }
              onAddEffectsSequence={(seq: EffectsSequence) =>
                commitState((prev) => ({
                  ...prev,
                  effectsSequences: [seq, ...prev.effectsSequences],
                }))
              }
            />
          )}

          {activeWorkspace === 'idea-constellation' && (
            <IdeaConstellationView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onAddIdea={(idea: Idea) =>
                commitState((prev) => ({
                  ...prev,
                  ideas: [idea, ...prev.ideas],
                }))
              }
              onUpdateIdeaCoords={(id, x, y) =>
                commitState((prev) => ({
                  ...prev,
                  ideas: prev.ideas.map((i) =>
                    i.id === id ? { ...i, canvasX: x, canvasY: y } : i
                  ),
                }))
              }
              onPromoteIdeaToEntity={handlePromoteIdeaToEntity}
              onUpdateStatus={handleUpdateStatus}
            />
          )}

          {activeWorkspace === 'research-desk' && (
            <ResearchDeskView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onAddResearchRecord={(rec: ResearchRecord) =>
                commitState((prev) => ({
                  ...prev,
                  researchRecords: [rec, ...prev.researchRecords],
                }))
              }
            />
          )}

          {activeWorkspace === 'lore-library' && (
            <LoreLibraryView
              state={state}
              selectedRecordId={selectedRecordId}
              onSelectRecord={(id) => handleSelectRecord(id)}
              onSaveLoreDocument={(doc: LoreDocument) =>
                commitState((prev) => ({
                  ...prev,
                  loreDocuments: [doc, ...prev.loreDocuments],
                }))
              }
            />
          )}
        </main>

        {/* 3. Right Context Inspector */}
        {inspectorOpen && (
          <ContextInspector
            state={state}
            selectedRecordId={selectedRecordId}
            onClose={() => setInspectorOpen(false)}
            onSelectRecord={handleSelectRecord}
            onUpdateStatus={handleUpdateStatus}
            onAddRelationship={handleAddRelationship}
            onDeleteRelationship={handleDeleteRelationship}
            onAddTagToRecord={handleAddTagToRecord}
          />
        )}
      </div>
    </div>
  );
}
