'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  WorkspaceId,
  RecordCollectionType,
  Project,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  Compass,
  Clock,
  FolderKanban,
  Sparkles,
  BookOpen,
  Network,
  ArrowUpRight,
  Plus,
  Layers,
  Globe,
  Zap,
  Palette,
} from 'lucide-react';

interface ObservatoryHomeViewProps {
  state: ObservatoryWorkspaceState;
  onNavigateWorkspace: (ws: WorkspaceId) => void;
  onSelectRecord: (id: string, ws?: WorkspaceId) => void;
  onCreateProject: (project: Project) => void;
}

const TYPE_TO_WORKSPACE: Record<RecordCollectionType, WorkspaceId> = {
  project: 'observatory',
  lore: 'lore-library',
  location: 'world-atlas',
  faction: 'world-atlas',
  entity: 'entities',
  powerSystem: 'power-forge',
  ability: 'power-forge',
  powerInteraction: 'power-forge',
  visualReference: 'visual-studio',
  designBoard: 'visual-studio',
  effectsSequence: 'visual-studio',
  idea: 'idea-constellation',
  research: 'research-desk',
};

export const ObservatoryHomeView: React.FC<ObservatoryHomeViewProps> = ({
  state,
  onNavigateWorkspace,
  onSelectRecord,
  onCreateProject,
}) => {
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projTitle, setProjTitle] = useState('');
  const [projFocus, setProjFocus] = useState('Cosmology & Power Systems');
  const [projSummary, setProjSummary] = useState('');
  const [projObjectives, setProjObjectives] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;
    const now = new Date().toISOString();
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: projTitle.trim(),
      summary: projSummary.trim() || 'Active worldbuilding and design initiative.',
      universeName: 'Ur-Verse / ForeverWorlds',
      focusDomain: projFocus,
      activeObjectives: projObjectives
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      linkedRecordIds: [],
      canonStatus: 'Proposed',
      tags: ['Initiative', projFocus],
      createdAt: now,
      updatedAt: now,
    };
    onCreateProject(newProj);
    setProjTitle('');
    setProjSummary('');
    setProjObjectives('');
    setShowNewProjectModal(false);
  };

  return (
    <div className="h-full overflow-y-auto p-6 lg:p-8 space-y-8 bg-[#101117]">
      {/* Hero Banner */}
      <div className="p-6 rounded-lg bg-[#191B25] border border-[#353744] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D3B477]">
            <Compass className="w-3.5 h-3.5" />
            <span>Lorekeeper&apos;s Observatory · Persistent Creative Environment</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2] tracking-tight">
            Apocrypha DXD: ForeverWorlds &amp; The Ur-Verse
          </h1>
          <p className="text-xs sm:text-sm text-[#A4A6B5] leading-relaxed">
            Unified workbench for cosmology, MWI reality-warping mechanics, Ichirei Shikon somatic Ki,
            the 144 Cacodictyology Hierarchies, 29 Underworld Sectors, 2D/3D visual direction, and
            epistemically separated canon documentation.
          </p>
        </div>

        {/* Quick Workspace Launchers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 shrink-0">
          <button
            onClick={() => onNavigateWorkspace('world-atlas')}
            className="px-3 py-2 rounded bg-[#242633] hover:bg-[#9A82E8]/20 border border-[#353744] hover:border-[#9A82E8] text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#E9E1D2]">
              <Globe className="w-3.5 h-3.5 text-[#D3B477]" />
              <span>World Atlas</span>
            </div>
            <div className="text-[10px] font-mono text-[#A4A6B5] mt-0.5">
              {state.locations.length} Realms · {state.factions.length} Roots
            </div>
          </button>

          <button
            onClick={() => onNavigateWorkspace('power-forge')}
            className="px-3 py-2 rounded bg-[#242633] hover:bg-[#9A82E8]/20 border border-[#353744] hover:border-[#9A82E8] text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#E9E1D2]">
              <Zap className="w-3.5 h-3.5 text-[#9A82E8]" />
              <span>Power Forge</span>
            </div>
            <div className="text-[10px] font-mono text-[#A4A6B5] mt-0.5">
              {state.powerSystems.length} Systems · {state.abilities.length} Abilities
            </div>
          </button>

          <button
            onClick={() => onNavigateWorkspace('visual-studio')}
            className="px-3 py-2 rounded bg-[#242633] hover:bg-[#9A82E8]/20 border border-[#353744] hover:border-[#9A82E8] text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#E9E1D2]">
              <Palette className="w-3.5 h-3.5 text-[#76D5E0]" />
              <span>Visual Studio</span>
            </div>
            <div className="text-[10px] font-mono text-[#A4A6B5] mt-0.5">
              {state.visualReferences.length} Refs · {state.designBoards.length} Boards
            </div>
          </button>

          <button
            onClick={() => onNavigateWorkspace('lore-library')}
            className="px-3 py-2 rounded bg-[#242633] hover:bg-[#9A82E8]/20 border border-[#353744] hover:border-[#9A82E8] text-left transition-all"
          >
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#E9E1D2]">
              <Layers className="w-3.5 h-3.5 text-[#D3B477]" />
              <span>Lore Library</span>
            </div>
            <div className="text-[10px] font-mono text-[#A4A6B5] mt-0.5">
              {state.loreDocuments.length} Canonical Articles
            </div>
          </button>
        </div>
      </div>

      {/* Section 1: Continue Working & Active Creative Projects */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Continue Working (5 cols) */}
        <div className="xl:col-span-5 bg-[#191B25] border border-[#353744] rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#353744] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#76D5E0]" />
                <h2 className="text-base font-serif font-semibold text-[#E9E1D2]">
                  Continue Working
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#A4A6B5]">Recent Active Records</span>
            </div>

            <div className="divide-y divide-[#353744]">
              {state.recentRecordIds.slice(0, 6).map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  onClick={() => onSelectRecord(item.id, TYPE_TO_WORKSPACE[item.type])}
                  className="w-full py-2.5 px-2 hover:bg-[#242633] rounded transition-colors flex items-center justify-between gap-3 text-left group"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase text-[#76D5E0]">
                      {item.type}
                    </div>
                    <div className="text-xs font-medium text-[#E9E1D2] group-hover:text-[#9A82E8] truncate">
                      {item.title}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A4A6B5] group-hover:text-[#E9E1D2] shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#353744] flex items-center justify-between text-[11px] font-mono text-[#A4A6B5]">
            <span>Total Semantic Links: {state.relationships.length}</span>
            <span>Revisions Logged: {state.revisions.length}</span>
          </div>
        </div>

        {/* Creative Projects (7 cols) */}
        <div className="xl:col-span-7 bg-[#191B25] border border-[#353744] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#353744] pb-3">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-[#D3B477]" />
              <h2 className="text-base font-serif font-semibold text-[#E9E1D2]">
                Creative Projects &amp; Worldbuilding Tracks
              </h2>
            </div>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs hover:opacity-90"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {state.projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectRecord(proj.id)}
                className="p-4 rounded bg-[#101117] border border-[#353744] hover:border-[#D3B477]/60 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#D3B477]">
                      {proj.universeName} · {proj.focusDomain}
                    </div>
                    <h3 className="text-base font-serif font-semibold text-[#E9E1D2] mt-0.5">
                      {proj.title}
                    </h3>
                  </div>
                  <CanonBadge status={proj.canonStatus} size="xs" />
                </div>
                <p className="text-xs text-[#A4A6B5] leading-relaxed">{proj.summary}</p>
                {proj.activeObjectives.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[10px] font-mono uppercase text-[#76D5E0]">
                      Active Objectives:
                    </div>
                    <ul className="space-y-1 text-xs text-[#E9E1D2]/90">
                      {proj.activeObjectives.map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#9A82E8] font-mono">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Recent Ideas Stream, Research & References, and Connected Work */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Ideas Stream */}
        <div className="bg-[#191B25] border border-[#353744] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#353744] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9A82E8]" />
              <h2 className="text-base font-serif font-semibold text-[#E9E1D2]">
                Recent Ideas &amp; Proposals
              </h2>
            </div>
            <button
              onClick={() => onNavigateWorkspace('idea-constellation')}
              className="text-xs font-mono text-[#9A82E8] hover:underline"
            >
              Open Constellation →
            </button>
          </div>
          <div className="space-y-2.5">
            {state.ideas.slice(0, 4).map((idea) => (
              <div
                key={idea.id}
                onClick={() => onSelectRecord(idea.id, 'idea-constellation')}
                className="p-3 rounded bg-[#101117] border border-[#353744] hover:border-[#9A82E8]/60 cursor-pointer space-y-1.5 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#9A82E8] uppercase">
                    {idea.domain}
                  </span>
                  <CanonBadge status={idea.canonStatus} size="xs" />
                </div>
                <div className="text-xs font-serif font-semibold text-[#E9E1D2]">
                  {idea.title}
                </div>
                <p className="text-[11px] text-[#A4A6B5] line-clamp-2">{idea.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Research & Visual References */}
        <div className="bg-[#191B25] border border-[#353744] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#353744] pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#76D5E0]" />
              <h2 className="text-base font-serif font-semibold text-[#E9E1D2]">
                Research &amp; References
              </h2>
            </div>
            <button
              onClick={() => onNavigateWorkspace('research-desk')}
              className="text-xs font-mono text-[#76D5E0] hover:underline"
            >
              Research Desk →
            </button>
          </div>
          <div className="space-y-2.5">
            {state.researchRecords.slice(0, 4).map((res) => (
              <div
                key={res.id}
                onClick={() => onSelectRecord(res.id, 'research-desk')}
                className="p-3 rounded bg-[#101117] border border-[#353744] hover:border-[#76D5E0]/60 cursor-pointer space-y-1 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-[#76D5E0] truncate">
                    {res.sourceAuthorOrTradition}
                  </span>
                  <CanonBadge status={res.canonStatus} size="xs" />
                </div>
                <div className="text-xs font-serif font-semibold text-[#E9E1D2]">
                  {res.title}
                </div>
                <p className="text-[11px] text-[#A4A6B5] line-clamp-2">
                  {res.inVerseTranslation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Work Graph Highlights */}
        <div className="bg-[#191B25] border border-[#353744] rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#353744] pb-3">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-[#D3B477]" />
              <h2 className="text-base font-serif font-semibold text-[#E9E1D2]">
                Connected Work Graph
              </h2>
            </div>
            <button
              onClick={() => onNavigateWorkspace('world-atlas')}
              className="text-xs font-mono text-[#D3B477] hover:underline"
            >
              Atlas Graph →
            </button>
          </div>
          <div className="space-y-2.5">
            {state.relationships.slice(0, 5).map((rel) => (
              <div
                key={rel.id}
                className="p-2.5 rounded bg-[#101117] border border-[#353744] space-y-1 text-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() =>
                      onSelectRecord(rel.sourceId, TYPE_TO_WORKSPACE[rel.sourceType])
                    }
                    className="font-medium text-[#E9E1D2] hover:text-[#9A82E8] truncate"
                  >
                    {rel.sourceTitle}
                  </button>
                  <span className="px-1.5 py-0.5 rounded bg-[#242633] text-[10px] font-mono text-[#D3B477] shrink-0">
                    {rel.relationType}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onSelectRecord(rel.targetId, TYPE_TO_WORKSPACE[rel.targetType])
                  }
                  className="text-[#76D5E0] hover:underline truncate block text-left w-full"
                >
                  → {rel.targetTitle}
                </button>
                {rel.notes && (
                  <p className="text-[11px] text-[#A4A6B5] line-clamp-1">{rel.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddProject}
            className="w-full max-w-lg bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Create Worldbuilding Project Track
            </h3>
            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={projTitle}
                onChange={(e) => setProjTitle(e.target.value)}
                placeholder="e.g., Category 3 Markovian Lattice Civilization Track"
                className="w-full px-3 py-2 rounded bg-[#101117] border border-[#353744] text-sm text-[#E9E1D2]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Focus Domain
              </label>
              <input
                type="text"
                value={projFocus}
                onChange={(e) => setProjFocus(e.target.value)}
                className="w-full px-3 py-2 rounded bg-[#101117] border border-[#353744] text-sm text-[#E9E1D2]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Summary
              </label>
              <textarea
                rows={2}
                value={projSummary}
                onChange={(e) => setProjSummary(e.target.value)}
                placeholder="High-level scope and creative intent..."
                className="w-full px-3 py-2 rounded bg-[#101117] border border-[#353744] text-sm text-[#E9E1D2]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Active Objectives (One per line)
              </label>
              <textarea
                rows={3}
                value={projObjectives}
                onChange={(e) => setProjObjectives(e.target.value)}
                placeholder="Define biological hardware&#10;Map home sector in World Atlas"
                className="w-full px-3 py-2 rounded bg-[#101117] border border-[#353744] text-sm text-[#E9E1D2]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewProjectModal(false)}
                className="px-3 py-1.5 rounded text-xs text-[#A4A6B5] hover:text-[#E9E1D2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
