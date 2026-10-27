'use client';

import React, { useState, useRef } from 'react';
import {
  WorkspaceId,
  ObservatoryWorkspaceState,
  RecordCollectionType,
} from '@/lib/observatoryTypes';
import { listAllRecordsWithTypes, triggerFileDownload } from '@/lib/observatoryStore';
import { CanonBadge } from './CanonBadge';
import {
  Compass,
  Globe,
  Users,
  Zap,
  Palette,
  Sparkles,
  BookOpen,
  Library,
  Search,
  Download,
  Upload,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightOpen,
  CheckCircle2,
  X,
  RotateCcw,
} from 'lucide-react';

export const WORKSPACE_NAV_ITEMS: {
  id: WorkspaceId;
  label: string;
  subtitle: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: 'observatory', label: 'Observatory', subtitle: 'Creative Home & Projects', icon: Compass },
  { id: 'world-atlas', label: 'World Atlas', subtitle: 'Realms, Factions & Map', icon: Globe },
  { id: 'entities', label: 'Entities', subtitle: 'Races, Breeds & Dossiers', icon: Users },
  { id: 'power-forge', label: 'Power Forge', subtitle: 'MWI, Ki, Fuels & Scaling', icon: Zap },
  { id: 'visual-studio', label: 'Visual Studio', subtitle: '2D/3D Boards & VFX', icon: Palette },
  { id: 'idea-constellation', label: 'Idea Constellation', subtitle: 'Brainstorming & Seeds', icon: Sparkles },
  { id: 'research-desk', label: 'Research Desk', subtitle: 'Occult & Physics Sources', icon: BookOpen },
  { id: 'lore-library', label: 'Lore Library', subtitle: 'Durable Canon Codex', icon: Library },
];

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

interface TopBarProps {
  activeWorkspace: WorkspaceId;
  state: ObservatoryWorkspaceState;
  inspectorOpen: boolean;
  onToggleInspector: () => void;
  onSelectRecord: (id: string, workspace?: WorkspaceId) => void;
  onImportState: (imported: ObservatoryWorkspaceState) => void;
  onResetToSeed: () => void;
}

export const ObservatoryTopBar: React.FC<TopBarProps> = ({
  activeWorkspace,
  state,
  inspectorOpen,
  onToggleInspector,
  onSelectRecord,
  onImportState,
  onResetToSeed,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentNav =
    WORKSPACE_NAV_ITEMS.find((w) => w.id === activeWorkspace) || WORKSPACE_NAV_ITEMS[0];

  const allRecords = listAllRecordsWithTypes(state);
  const filteredResults = searchQuery.trim()
    ? allRecords.filter(
        (r) =>
          r.record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.record.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.record.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allRecords.slice(0, 12);

  const handleExportJSON = () => {
    const filename = `lorekeepers_observatory_${new Date().toISOString().slice(0, 10)}.json`;
    triggerFileDownload(filename, JSON.stringify(state, null, 2), 'application/json');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as ObservatoryWorkspaceState;
        if (parsed && Array.isArray(parsed.loreDocuments) && Array.isArray(parsed.entities)) {
          onImportState(parsed);
        }
      } catch {
        // Invalid JSON ignored safely
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <header className="h-13 bg-[#191B25] border-b border-[#353744] px-4 flex items-center justify-between gap-4 shrink-0 select-none z-20">
        {/* Left: Brand & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#242633] border border-[#D3B477]/50 flex items-center justify-center text-[#D3B477] font-serif font-bold text-sm">
              U
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-serif font-semibold tracking-wide text-[#E9E1D2] leading-none">
                Lorekeeper&apos;s Observatory
              </div>
              <div className="text-[10px] font-mono text-[#D3B477] tracking-wider uppercase mt-0.5">
                Apocrypha DXD: ForeverWorlds · Ur-Verse
              </div>
            </div>
          </div>

          <span className="text-[#353744] hidden md:inline">/</span>

          <div className="flex items-center gap-2 bg-[#101117] px-2.5 py-1 rounded border border-[#353744]">
            <currentNav.icon className="w-3.5 h-3.5 text-[#9A82E8]" />
            <span className="text-xs font-medium text-[#E9E1D2]">{currentNav.label}</span>
            <span className="text-[11px] text-[#A4A6B5] hidden lg:inline">
              — {currentNav.subtitle}
            </span>
          </div>
        </div>

        {/* Center: Global Search Trigger */}
        <div className="flex-1 max-w-md hidden sm:block">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full px-3 py-1.5 rounded bg-[#101117] hover:bg-[#242633] border border-[#353744] hover:border-[#9A82E8]/50 flex items-center justify-between text-xs text-[#A4A6B5] transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#76D5E0]" />
              <span>Search {allRecords.length} canonical & proposed records...</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#191B25] rounded border border-[#353744] text-[#A4A6B5]">
              Find
            </kbd>
          </button>
        </div>

        {/* Right: Persistence Status, Export/Import, Inspector Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden p-1.5 rounded bg-[#242633] border border-[#353744] text-[#E9E1D2]"
            title="Search Records"
          >
            <Search className="w-4 h-4" />
          </button>

          <div
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#101117] border border-[#353744] text-[11px] font-mono text-[#A4A6B5]"
            title={`Last saved: ${state.lastSavedAt.replace('T', ' ').slice(0, 19)} UTC`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span>IndexedDB Persisted</span>
          </div>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#242633] hover:bg-[#353744] border border-[#353744] text-xs text-[#E9E1D2] transition-colors"
            title="Export Full Workspace JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#D3B477]" />
            <span className="hidden md:inline">Export</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImportFile}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#242633] hover:bg-[#353744] border border-[#353744] text-xs text-[#E9E1D2] transition-colors"
            title="Import Workspace JSON"
          >
            <Upload className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span className="hidden md:inline">Import</span>
          </button>

          {confirmReset ? (
            <div className="flex items-center gap-1 bg-[#101117] px-2 py-1 rounded border border-[#F18A82]">
              <button
                onClick={() => {
                  onResetToSeed();
                  setConfirmReset(false);
                }}
                className="text-[11px] font-mono text-[#F18A82] hover:underline"
              >
                Confirm Reset
              </button>
              <button
                onClick={() => setConfirmReset(false)}
                className="text-[11px] font-mono text-[#A4A6B5] ml-1"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="p-1.5 rounded bg-[#242633] hover:bg-[#353744] border border-[#353744] text-[#A4A6B5] hover:text-[#E9E1D2]"
              title="Re-sync Canonical Seed Records"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {!inspectorOpen && (
            <button
              onClick={onToggleInspector}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#9A82E8]/15 hover:bg-[#9A82E8]/25 border border-[#9A82E8]/50 text-xs text-[#E9E1D2] transition-colors"
              title="Open Context Inspector"
            >
              <PanelRightOpen className="w-3.5 h-3.5 text-[#9A82E8]" />
              <span className="hidden lg:inline">Inspector</span>
            </button>
          )}
        </div>
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-start justify-center pt-16 p-4">
          <div className="w-full max-w-2xl bg-[#191B25] border border-[#353744] rounded-lg shadow-2xl overflow-hidden">
            <div className="p-3 border-b border-[#353744] flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#76D5E0]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across Realms, Entities, Bloodlines, Fuels, Frameworks, Lore, and Ideas..."
                className="flex-1 bg-transparent text-sm text-[#E9E1D2] placeholder-[#A4A6B5] focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded hover:bg-[#242633] text-[#A4A6B5] hover:text-[#E9E1D2]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-[#353744]">
              {filteredResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#A4A6B5]">
                  No records matching &ldquo;{searchQuery}&rdquo; across the Observatory.
                </div>
              ) : (
                filteredResults.map((item) => (
                  <button
                    key={`${item.type}-${item.record.id}`}
                    onClick={() => {
                      onSelectRecord(item.record.id, TYPE_TO_WORKSPACE[item.type]);
                      setSearchOpen(false);
                    }}
                    className="w-full p-3 text-left hover:bg-[#242633] transition-colors flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#76D5E0]">
                          {item.typeLabel}
                        </span>
                        <span className="text-sm font-serif font-semibold text-[#E9E1D2] truncate">
                          {item.record.title}
                        </span>
                      </div>
                      <p className="text-xs text-[#A4A6B5] line-clamp-1">{item.record.summary}</p>
                    </div>
                    <CanonBadge status={item.record.canonStatus} size="xs" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface LeftRailProps {
  activeWorkspace: WorkspaceId;
  collapsed: boolean;
  state: ObservatoryWorkspaceState;
  onSelectWorkspace: (id: WorkspaceId) => void;
  onToggleCollapse: () => void;
}

export const ObservatoryLeftRail: React.FC<LeftRailProps> = ({
  activeWorkspace,
  collapsed,
  state,
  onSelectWorkspace,
  onToggleCollapse,
}) => {
  const counts: Record<WorkspaceId, number> = {
    observatory: state.projects.length,
    'world-atlas': state.locations.length + state.factions.length,
    entities: state.entities.length,
    'power-forge':
      state.powerSystems.length + state.abilities.length + state.powerInteractions.length,
    'visual-studio':
      state.visualReferences.length + state.designBoards.length + state.effectsSequences.length,
    'idea-constellation': state.ideas.length,
    'research-desk': state.researchRecords.length,
    'lore-library': state.loreDocuments.length,
  };

  return (
    <nav
      className={`${
        collapsed ? 'w-15' : 'w-60'
      } bg-[#191B25] border-r border-[#353744] flex flex-col justify-between shrink-0 transition-all duration-150 select-none`}
    >
      <div className="p-2 space-y-1 overflow-y-auto">
        <div className="px-2 py-1.5 flex items-center justify-between">
          {!collapsed && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A4A6B5]">
              8 Workspaces
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded hover:bg-[#242633] text-[#A4A6B5] hover:text-[#E9E1D2] transition-colors"
            title={collapsed ? 'Expand Navigation Rail' : 'Collapse Navigation Rail'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {WORKSPACE_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeWorkspace === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectWorkspace(item.id)}
              title={`${item.label} — ${item.subtitle}`}
              className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-md text-left transition-all border ${
                isActive
                  ? 'bg-[#242633] border-[#9A82E8]/60 text-[#E9E1D2] shadow-xs'
                  : 'border-transparent text-[#A4A6B5] hover:bg-[#242633]/60 hover:text-[#E9E1D2]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#9A82E8]' : 'text-[#A4A6B5]'
                  }`}
                />
                {!collapsed && (
                  <div className="min-w-0">
                    <div className="text-xs font-medium truncate leading-tight">{item.label}</div>
                    <div className="text-[10px] text-[#A4A6B5] truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                )}
              </div>
              {!collapsed && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-[#9A82E8]/20 text-[#9A82E8]'
                      : 'bg-[#101117] text-[#A4A6B5]'
                  }`}
                >
                  {counts[item.id]}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Epistemic Authority Legend */}
      {!collapsed && (
        <div className="p-3 m-2 rounded bg-[#101117] border border-[#353744] space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#D3B477]">
            Canon Authority Legend
          </div>
          <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-[#A4A6B5]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D3B477]" />
              <span>Established</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#9A82E8]" />
              <span>Proposed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#76D5E0]" />
              <span>Inferred</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F18A82]" />
              <span>Unresolved</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
