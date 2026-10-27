'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  LocationOrRealm,
  Faction,
  CanonStatus,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  Globe,
  Shield,
  Network,
  Search,
  Plus,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Layers,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface WorldAtlasViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onAddLocation: (loc: LocationOrRealm) => void;
  onAddFaction: (fac: Faction) => void;
  onUpdateNodeCoords: (id: string, kind: 'location' | 'faction', x: number, y: number) => void;
}

export const WorldAtlasView: React.FC<WorldAtlasViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onAddLocation,
  onAddFaction,
  onUpdateNodeCoords,
}) => {
  const [subTab, setSubTab] = useState<'realms' | 'factions' | 'canvas'>('realms');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState<'realm' | 'faction' | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Canvas Zoom & Pan State
  const [zoom, setZoom] = useState<number>(1);
  const [draggingNode, setDraggingNode] = useState<{
    id: string;
    kind: 'location' | 'faction';
  } | null>(null);

  // Create Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSector, setNewSector] = useState('Hellenic & Tartarean');
  const [newRealmType, setNewRealmType] =
    useState<LocationOrRealm['realmType']>('Underworld Sector');
  const [newSummary, setNewSummary] = useState('');
  const [newVisuals, setNewVisuals] = useState('');
  const [newEntities, setNewEntities] = useState('');
  const [newLaws, setNewLaws] = useState('');
  const [newPromptSpec, setNewPromptSpec] = useState('');
  const [newStatus, setNewStatus] = useState<CanonStatus>('Proposed');

  const uniqueSectors = Array.from(new Set(state.locations.map((l) => l.sector)));

  const filteredLocations = state.locations.filter((loc) => {
    const matchesSector = sectorFilter === 'ALL' || loc.sector === sectorFilter;
    const matchesQuery =
      !searchQuery.trim() ||
      loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.dominantEntities.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesQuery;
  });

  const filteredFactions = state.factions.filter((fac) => {
    return (
      !searchQuery.trim() ||
      fac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.notableSubHierarchies.some(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const selectedLocation =
    state.locations.find((l) => l.id === selectedRecordId) || filteredLocations[0];
  const selectedFaction =
    state.factions.find((f) => f.id === selectedRecordId) || filteredFactions[0];

  const handleCopyPrompt = (id: string, promptText: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(promptText);
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const now = new Date().toISOString();

    if (showCreateModal === 'realm') {
      const visualsText = newVisuals.trim() || 'Pending visual atmosphere specification.';
      const loc: LocationOrRealm = {
        id: `realm-${Date.now()}`,
        title: newTitle.trim(),
        summary: newSummary.trim() || 'Newly charted realm in the Ur-Verse.',
        realmType: newRealmType,
        sector: newSector,
        visualAtmosphere: visualsText,
        dominantEntities: newEntities.trim() || 'Unclassified indigenous entities.',
        environmentalLawsAndPhysics: newLaws.trim() || 'Standard Possibility Resistance applies.',
        geopoliticalContext: newSummary.trim(),
        worldDetailNotes: {
          horizonAndSkyMechanics: `Subterranean / Non-Euclidean ceiling mechanics of ${newSector}.`,
          architecturalScaleAndMaterials: visualsText,
          ambientTurnFieldBehavior: `Macro-scale Realm of Energy biasing local Turn Fields toward ${newSector} physics.`,
          realmImagePromptSpec:
            newPromptSpec.trim() ||
            `Wide-angle environmental concept art of ${newTitle.trim()} (${newSector}): ${visualsText}. High-contrast obsidian shadows, tactile geological textures, zero generic fantasy glow, 16:9.`,
        },
        canonStatus: newStatus,
        tags: [newSector, newRealmType, 'World Detail'],
        mapX: 350 + Math.floor(Math.random() * 300),
        mapY: 180 + Math.floor(Math.random() * 240),
        createdAt: now,
        updatedAt: now,
      };
      onAddLocation(loc);
      onSelectRecord(loc.id);
    } else if (showCreateModal === 'faction') {
      const fac: Faction = {
        id: `faction-${Date.now()}`,
        title: newTitle.trim(),
        summary: newSummary.trim() || 'Newly documented sovereign faction or hierarchy.',
        factionType: 'Infernal Hegemony',
        emblemCode: newTitle.slice(0, 6).toUpperCase(),
        governingPrinciple: newLaws.trim() || 'Pactional & Territorial Sovereignty',
        territoryOrRoot: newSector,
        notableSubHierarchies: [],
        canonStatus: newStatus,
        tags: ['Faction', newSector],
        mapX: 400 + Math.floor(Math.random() * 250),
        mapY: 200 + Math.floor(Math.random() * 200),
        createdAt: now,
        updatedAt: now,
      };
      onAddFaction(fac);
      onSelectRecord(fac.id);
    }

    setNewTitle('');
    setNewSummary('');
    setNewVisuals('');
    setNewEntities('');
    setNewLaws('');
    setNewPromptSpec('');
    setShowCreateModal(null);
  };

  // Atlas Canvas Node Lookup for Relationship Edges
  const canvasNodes: {
    id: string;
    title: string;
    kind: 'location' | 'faction';
    subtitle: string;
    x: number;
    y: number;
    color: string;
  }[] = [
    ...state.locations.map((l) => ({
      id: l.id,
      title: l.title.split('(')[0].trim(),
      kind: 'location' as const,
      subtitle: l.sector,
      x: l.mapX,
      y: l.mapY,
      color: l.realmType === 'Inverted Beast Manifold' ? '#76D5E0' : '#D3B477',
    })),
    ...state.factions.map((f) => ({
      id: f.id,
      title: f.title.split(':')[0].trim(),
      kind: 'faction' as const,
      subtitle: f.emblemCode,
      x: f.mapX,
      y: f.mapY,
      color: '#9A82E8',
    })),
  ];

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingNode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = (e.clientX - rect.left) / zoom;
    const rawY = (e.clientY - rect.top) / zoom;
    const clampedX = Math.max(40, Math.min(960, Math.round(rawX)));
    const clampedY = Math.max(40, Math.min(560, Math.round(rawY)));
    onUpdateNodeCoords(draggingNode.id, draggingNode.kind, clampedX, clampedY);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Workspace Header & Sub-Navigation */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('realms')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'realms'
                ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#D3B477]" />
            <span>World Details, Realms &amp; Image Prompts ({state.locations.length})</span>
          </button>

          <button
            onClick={() => setSubTab('factions')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'factions'
                ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#9A82E8]" />
            <span>144 Cacodictyology Roots &amp; Factions ({state.factions.length})</span>
          </button>

          <button
            onClick={() => setSubTab('canvas')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'canvas'
                ? 'bg-[#242633] border-[#76D5E0] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span>Atlas Relationship Canvas</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#A4A6B5] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter realms, roots, or hierarchies..."
              className="pl-8 pr-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2] placeholder-[#A4A6B5] focus:outline-none focus:border-[#9A82E8]"
            />
          </div>

          <button
            onClick={() => setShowCreateModal(subTab === 'factions' ? 'faction' : 'realm')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{subTab === 'factions' ? 'New Faction' : 'New Realm'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {subTab === 'realms' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left List + Sector Filter */}
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 flex flex-col overflow-hidden shrink-0">
            <div className="p-3 border-b border-[#353744]">
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              >
                <option value="ALL">All Cosmological Sectors ({state.locations.length})</option>
                {uniqueSectors.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#353744]">
              {filteredLocations.map((loc) => {
                const isSelected = selectedLocation?.id === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => onSelectRecord(loc.id)}
                    className={`w-full p-3.5 text-left transition-colors space-y-1 ${
                      isSelected ? 'bg-[#242633] border-l-2 border-l-[#D3B477]' : 'hover:bg-[#191B25]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#D3B477] truncate">
                        {loc.sector}
                      </span>
                      <CanonBadge status={loc.canonStatus} size="xs" />
                    </div>
                    <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                      {loc.title}
                    </div>
                    <p className="text-xs text-[#A4A6B5] line-clamp-2">{loc.summary}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Realm Detail & Image Design Prompt Panel */}
          {selectedLocation && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#353744] pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#D3B477] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {selectedLocation.realmType} · {selectedLocation.sector}
                    </span>
                  </div>
                  <CanonBadge status={selectedLocation.canonStatus} size="sm" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedLocation.title}
                </h2>
                <p className="text-sm text-[#A4A6B5] leading-relaxed">
                  {selectedLocation.geopoliticalContext}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    Visual Architecture &amp; Atmosphere
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedLocation.visualAtmosphere}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    Dominant Entities &amp; Denizens
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedLocation.dominantEntities}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2 md:col-span-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    Environmental Laws &amp; Metaphysical Physics
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedLocation.environmentalLawsAndPhysics}
                  </p>
                </div>
              </div>

              {/* World Detail & Realm Image Design Architect */}
              {selectedLocation.worldDetailNotes && (
                <div className="p-6 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#353744] pb-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                      <Sparkles className="w-4 h-4" />
                      <span>Realm Image Design &amp; World Detail Blueprint</span>
                    </div>
                    <button
                      onClick={() =>
                        handleCopyPrompt(
                          selectedLocation.id,
                          selectedLocation.worldDetailNotes!.realmImagePromptSpec
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#242633] hover:bg-[#9A82E8] hover:text-[#101117] border border-[#9A82E8]/50 text-xs font-mono text-[#E9E1D2] transition-colors"
                    >
                      {copiedPromptId === selectedLocation.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#76D5E0]" />
                          <span>Copied Image Prompt</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Realm Image Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3.5 rounded bg-[#101117] border border-[#353744] space-y-1">
                      <span className="font-mono text-[10px] uppercase text-[#76D5E0] block">
                        Horizon &amp; Ceiling Mechanics
                      </span>
                      <p className="text-[#E9E1D2] leading-relaxed">
                        {selectedLocation.worldDetailNotes.horizonAndSkyMechanics}
                      </p>
                    </div>
                    <div className="p-3.5 rounded bg-[#101117] border border-[#353744] space-y-1">
                      <span className="font-mono text-[10px] uppercase text-[#D3B477] block">
                        Scale &amp; Materiality
                      </span>
                      <p className="text-[#E9E1D2] leading-relaxed">
                        {selectedLocation.worldDetailNotes.architecturalScaleAndMaterials}
                      </p>
                    </div>
                    <div className="p-3.5 rounded bg-[#101117] border border-[#353744] space-y-1">
                      <span className="font-mono text-[10px] uppercase text-[#9A82E8] block">
                        Ambient Turn Field (Expression #5)
                      </span>
                      <p className="text-[#E9E1D2] leading-relaxed">
                        {selectedLocation.worldDetailNotes.ambientTurnFieldBehavior}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded bg-[#101117] border border-[#D3B477]/40 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#D3B477]">
                      Ready-to-Use Realm Image Generation Prompt Specification
                    </div>
                    <p className="text-xs font-mono text-[#E9E1D2] leading-relaxed select-all">
                      {selectedLocation.worldDetailNotes.realmImagePromptSpec}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {subTab === 'factions' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Factions & Roots List */}
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {filteredFactions.map((fac) => {
              const isSelected = selectedFaction?.id === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => onSelectRecord(fac.id)}
                  className={`w-full p-3.5 text-left transition-colors space-y-1 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#9A82E8]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                      {fac.emblemCode} · {fac.factionType}
                    </span>
                    <CanonBadge status={fac.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{fac.title}</div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{fac.summary}</p>
                </button>
              );
            })}
          </div>

          {/* Right Faction / Root 12-Hierarchy Matrix */}
          {selectedFaction && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#353744] pb-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    {selectedFaction.emblemCode} · {selectedFaction.territoryOrRoot}
                  </span>
                  <CanonBadge status={selectedFaction.canonStatus} size="sm" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedFaction.title}
                </h2>
                <p className="text-sm text-[#A4A6B5]">{selectedFaction.summary}</p>
                <div className="text-xs font-mono text-[#D3B477] pt-1">
                  Governing Principle: {selectedFaction.governingPrinciple}
                </div>
              </div>

              {selectedFaction.notableSubHierarchies.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    <Layers className="w-4 h-4" />
                    <span>
                      Sub-Hierarchies &amp; Divisions (
                      {selectedFaction.notableSubHierarchies.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
                    {selectedFaction.notableSubHierarchies.map((sub) => (
                      <div
                        key={sub.code}
                        className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#D3B477] font-semibold">{sub.code}</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#101117] text-[#76D5E0] border border-[#353744]">
                            {sub.tier}
                          </span>
                        </div>
                        <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                          {sub.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#9A82E8]">{sub.domain}</div>
                        <p className="text-xs text-[#A4A6B5] leading-relaxed">{sub.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {subTab === 'canvas' && (
        <div className="flex-1 flex flex-col relative overflow-hidden bg-[#101117]">
          {/* Canvas Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#191B25]/90 backdrop-blur-xs p-2 rounded border border-[#353744] text-xs">
            <span className="font-mono text-[#A4A6B5] px-2">
              Drag any Realm or Root node to organize spatial ontology
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
              className="p-1.5 rounded bg-[#242633] hover:bg-[#353744] text-[#E9E1D2]"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
              className="p-1.5 rounded bg-[#242633] hover:bg-[#353744] text-[#E9E1D2]"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded bg-[#242633] hover:bg-[#353744] text-[#A4A6B5] hover:text-[#E9E1D2]"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive SVG Map */}
          <div className="flex-1 overflow-auto">
            <svg
              width={1050 * zoom}
              height={640 * zoom}
              viewBox="0 0 1050 640"
              onMouseMove={handleSvgMouseMove}
              onMouseUp={() => setDraggingNode(null)}
              onMouseLeave={() => setDraggingNode(null)}
              className="select-none cursor-grab active:cursor-grabbing"
            >
              <defs>
                <pattern id="atlas-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path
                    d="M 50 0 L 0 0 0 50"
                    fill="none"
                    stroke="#353744"
                    strokeWidth="0.5"
                    strokeOpacity="0.4"
                  />
                </pattern>
              </defs>
              <rect width="1050" height="640" fill="url(#atlas-grid)" />

              {/* Relationship Edges */}
              {state.relationships.map((rel) => {
                const src = canvasNodes.find((n) => n.id === rel.sourceId);
                const tgt = canvasNodes.find((n) => n.id === rel.targetId);
                if (!src || !tgt) return null;
                const midX = (src.x + tgt.x) / 2;
                const midY = (src.y + tgt.y) / 2;
                return (
                  <g key={rel.id}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke="#9A82E8"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      strokeOpacity="0.7"
                    />
                    <rect
                      x={midX - 45}
                      y={midY - 9}
                      width="90"
                      height="18"
                      rx="4"
                      fill="#191B25"
                      stroke="#353744"
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      fill="#76D5E0"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {rel.relationType}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {canvasNodes.map((node) => {
                const isSelected = selectedRecordId === node.id;
                return (
                  <g
                    key={`${node.kind}-${node.id}`}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      onSelectRecord(node.id);
                      setDraggingNode({ id: node.id, kind: node.kind });
                    }}
                    className="cursor-pointer"
                  >
                    <circle
                      r={isSelected ? 11 : 7}
                      fill="#191B25"
                      stroke={node.color}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <rect
                      x={12}
                      y={-12}
                      width={Math.min(165, Math.max(95, node.title.length * 6.2))}
                      height={24}
                      rx={4}
                      fill={isSelected ? '#242633' : '#191B25'}
                      stroke={isSelected ? node.color : '#353744'}
                      strokeWidth={1}
                    />
                    <text
                      x={18}
                      y={3}
                      fill="#E9E1D2"
                      fontSize="10"
                      fontFamily="serif"
                      fontWeight="600"
                    >
                      {node.title.slice(0, 24)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Create Realm / Faction Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateSubmit}
            className="w-full max-w-lg bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              {showCreateModal === 'realm'
                ? 'Chart New Realm & Image Prompt Spec'
                : 'Document Sovereign Faction'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Styx-Khar (The Oath-Glass Basin)"
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-sm text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Sector / Root Territory
                </label>
                <input
                  type="text"
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Canon Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as CanonStatus)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Inferred">Inferred</option>
                  <option value="Unresolved">Unresolved</option>
                  <option value="Established">Established</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Geopolitical &amp; Lore Summary
              </label>
              <textarea
                rows={2}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            {showCreateModal === 'realm' && (
              <>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                    Visual Atmosphere &amp; Geological Materiality
                  </label>
                  <textarea
                    rows={2}
                    value={newVisuals}
                    onChange={(e) => setNewVisuals(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D3B477] mb-1">
                    Realm Image Prompt Specification (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={newPromptSpec}
                    onChange={(e) => setNewPromptSpec(e.target.value)}
                    placeholder="Custom prompt for generating Realm concept images..."
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>
              </>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(null)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Save to World Atlas
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
