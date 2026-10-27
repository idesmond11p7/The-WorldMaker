'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  Idea,
  CanonStatus,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  Sparkles,
  GitBranch,
  Plus,
  LayoutList,
  Network,
  ArrowUpRight,
  Archive,
} from 'lucide-react';

interface IdeaConstellationViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onAddIdea: (idea: Idea) => void;
  onUpdateIdeaCoords: (id: string, x: number, y: number) => void;
  onPromoteIdeaToEntity: (idea: Idea) => void;
  onUpdateStatus: (id: string, status: CanonStatus, reason: string) => void;
}

export const IdeaConstellationView: React.FC<IdeaConstellationViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onAddIdea,
  onUpdateIdeaCoords,
  onPromoteIdeaToEntity,
  onUpdateStatus,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'constellation'>('list');
  const [domainFilter, setDomainFilter] = useState<string>('ALL');
  const [showNewModal, setShowNewModal] = useState(false);
  const [branchSource, setBranchSource] = useState<Idea | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState<Idea['domain']>('Missing Category Races');
  const [promptQuestion, setPromptQuestion] = useState('');
  const [etymology, setEtymology] = useState('');
  const [coreConcept, setCoreConcept] = useState('');
  const [restrictorPlate, setRestrictorPlate] = useState('');

  const domains = Array.from(new Set(state.ideas.map((i) => i.domain)));
  const filteredIdeas = state.ideas.filter(
    (i) => domainFilter === 'ALL' || i.domain === domainFilter
  );
  const selectedIdea =
    state.ideas.find((i) => i.id === selectedRecordId) || filteredIdeas[0];

  const handleOpenBranch = (idea: Idea) => {
    setBranchSource(idea);
    setTitle(`${idea.title} (Variant Branch)`);
    setDomain(idea.domain);
    setPromptQuestion(idea.promptQuestion);
    setEtymology(idea.etymology);
    setCoreConcept(idea.coreConcept);
    setRestrictorPlate(idea.restrictorPlate);
    setShowNewModal(true);
  };

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      title: title.trim(),
      summary: coreConcept.trim().slice(0, 160),
      domain,
      promptQuestion:
        promptQuestion.trim() || 'Open design investigation for the Ur-Verse.',
      contextFromDraft:
        branchSource?.contextFromDraft ||
        'Derived from unresolved design gaps in the primary ForeverWorlds draft.',
      etymology: etymology.trim() || 'Conceptual nomenclature study.',
      coreConcept: coreConcept.trim(),
      restrictorPlate:
        restrictorPlate.trim() || 'Locked behind strict ontological restrictor plates.',
      parentIdeaId: branchSource?.id,
      canonStatus: 'Proposed',
      tags: [domain, 'Proposed', branchSource ? 'Branched Variant' : 'Seed'],
      canvasX: branchSource ? Math.min(900, branchSource.canvasX + 110) : 250 + Math.floor(Math.random() * 450),
      canvasY: branchSource ? Math.min(520, branchSource.canvasY + 70) : 140 + Math.floor(Math.random() * 320),
      createdAt: now,
      updatedAt: now,
    };
    onAddIdea(newIdea);
    onSelectRecord(newIdea.id);
    setTitle('');
    setEtymology('');
    setCoreConcept('');
    setRestrictorPlate('');
    setBranchSource(null);
    setShowNewModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Top Bar */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border ${
              viewMode === 'list'
                ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5]'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5 text-[#9A82E8]" />
            <span>Structured Idea Stream ({state.ideas.length})</span>
          </button>

          <button
            onClick={() => setViewMode('constellation')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border ${
              viewMode === 'constellation'
                ? 'bg-[#242633] border-[#76D5E0] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5]'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span>Constellation Graph View</span>
          </button>

          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
          >
            <option value="ALL">All Brainstorm Domains</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setBranchSource(null);
            setTitle('');
            setCoreConcept('');
            setShowNewModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Capture New Idea</span>
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {filteredIdeas.map((idea) => {
              const isSelected = selectedIdea?.id === idea.id;
              return (
                <button
                  key={idea.id}
                  onClick={() => onSelectRecord(idea.id)}
                  className={`w-full p-4 text-left transition-colors space-y-1.5 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#9A82E8]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                      {idea.domain}
                    </span>
                    <CanonBadge status={idea.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                    {idea.title}
                  </div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{idea.coreConcept}</p>
                </button>
              );
            })}
          </div>

          {selectedIdea && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-3 border-b border-[#353744] pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    {selectedIdea.domain} · Brainstorm Seed
                  </span>
                  <div className="flex items-center gap-2">
                    <CanonBadge status={selectedIdea.canonStatus} size="sm" />
                    <button
                      onClick={() => handleOpenBranch(selectedIdea)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#242633] hover:bg-[#353744] border border-[#353744] text-xs text-[#E9E1D2]"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-[#76D5E0]" />
                      <span>Branch Alternative</span>
                    </button>
                    <button
                      onClick={() => onPromoteIdeaToEntity(selectedIdea)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#D3B477]/20 hover:bg-[#D3B477]/30 border border-[#D3B477]/50 text-xs text-[#D3B477]"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>Promote to Entity Dossier</span>
                    </button>
                    {selectedIdea.canonStatus !== 'Retired' && (
                      <button
                        onClick={() =>
                          onUpdateStatus(
                            selectedIdea.id,
                            'Retired',
                            'Retired from active brainstorming.'
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#101117] hover:bg-[#242633] border border-[#353744] text-xs text-[#A4A6B5]"
                      >
                        <Archive className="w-3.5 h-3.5" />
                        <span>Retire</span>
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedIdea.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    Unresolved Draft Question Being Answered
                  </div>
                  <p className="text-sm font-serif italic text-[#E9E1D2]">
                    &ldquo;{selectedIdea.promptQuestion}&rdquo;
                  </p>
                  <p className="text-xs text-[#A4A6B5] pt-1">
                    Primary Draft Context: {selectedIdea.contextFromDraft}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    Nomenclature &amp; Etymological Root
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedIdea.etymology}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    <Sparkles className="w-4 h-4" />
                    <span>Proposed In-Verse Concept &amp; Mechanics</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedIdea.coreConcept}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#F18A82]/50 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                    Ontological Restrictor Plate &amp; Hard Counterplay
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedIdea.restrictorPlate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Constellation SVG Graph View */
        <div className="flex-1 overflow-auto bg-[#101117]">
          <svg
            width={1050}
            height={620}
            viewBox="0 0 1050 620"
            onMouseMove={(e) => {
              if (!draggingId) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = Math.max(60, Math.min(960, Math.round(e.clientX - rect.left)));
              const y = Math.max(50, Math.min(560, Math.round(e.clientY - rect.top)));
              onUpdateIdeaCoords(draggingId, x, y);
            }}
            onMouseUp={() => setDraggingId(null)}
            className="select-none"
          >
            {/* Parent-Branch Lines */}
            {state.ideas.map((idea) => {
              if (!idea.parentIdeaId) return null;
              const parent = state.ideas.find((p) => p.id === idea.parentIdeaId);
              if (!parent) return null;
              return (
                <line
                  key={`branch-${idea.id}`}
                  x1={parent.canvasX}
                  y1={parent.canvasY}
                  x2={idea.canvasX}
                  y2={idea.canvasY}
                  stroke="#76D5E0"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              );
            })}

            {filteredIdeas.map((idea) => {
              const isSelected = selectedIdea?.id === idea.id;
              return (
                <g
                  key={idea.id}
                  transform={`translate(${idea.canvasX}, ${idea.canvasY})`}
                  onMouseDown={() => {
                    onSelectRecord(idea.id);
                    setDraggingId(idea.id);
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    r={isSelected ? 12 : 8}
                    fill="#191B25"
                    stroke={isSelected ? '#9A82E8' : '#76D5E0'}
                    strokeWidth={2.5}
                  />
                  <rect
                    x={16}
                    y={-18}
                    width={220}
                    height={36}
                    rx={6}
                    fill={isSelected ? '#242633' : '#191B25'}
                    stroke={isSelected ? '#9A82E8' : '#353744'}
                  />
                  <text
                    x={24}
                    y={-3}
                    fill="#9A82E8"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    {idea.domain.toUpperCase()}
                  </text>
                  <text
                    x={24}
                    y={11}
                    fill="#E9E1D2"
                    fontSize="10.5"
                    fontFamily="serif"
                    fontWeight="600"
                  >
                    {idea.title.slice(0, 28)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Capture / Branch Idea Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateIdea}
            className="w-full max-w-xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-3 shadow-2xl"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              {branchSource
                ? `Branch Alternative from: ${branchSource.title}`
                : 'Capture New Proposed Concept'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Concept Name..."
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value as Idea['domain'])}
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              >
                <option value="Missing Category Races">Missing Category Races</option>
                <option value="Unfleshed Demon Bloodlines">Unfleshed Demon Bloodlines</option>
                <option value="Classified Frameworks">Classified Frameworks</option>
                <option value="Netherfire Fuels">Netherfire Fuels</option>
                <option value="Ki & Magic Collisions">Ki &amp; Magic Collisions</option>
                <option value="Cosmology & Realms">Cosmology &amp; Realms</option>
              </select>
            </div>
            <input
              type="text"
              value={etymology}
              onChange={(e) => setEtymology(e.target.value)}
              placeholder="Etymology & Naming Logic..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={3}
              required
              value={coreConcept}
              onChange={(e) => setCoreConcept(e.target.value)}
              placeholder="Core in-verse concept & mechanics..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              value={restrictorPlate}
              onChange={(e) => setRestrictorPlate(e.target.value)}
              placeholder="Ontological Restrictor Plate / Hard Limit..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Save Proposed Idea
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
