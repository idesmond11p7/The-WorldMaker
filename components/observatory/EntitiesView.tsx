'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  Entity,
  EntityKind,
  CanonStatus,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  Users,
  Search,
  Plus,
  ShieldAlert,
  Sparkles,
  Box,
  Volume2,
  Eye,
  Ruler,
} from 'lucide-react';

interface EntitiesViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onSaveEntity: (entity: Entity) => void;
}

const ENTITY_KINDS: ('ALL' | EntityKind)[] = [
  'ALL',
  'Character',
  'Creature',
  'Demon Breed',
  'Demon Bloodline',
  'Astral Entity',
  'Category Race',
  'Goetarch / Sovereign',
  'Artifact',
];

export const EntitiesView: React.FC<EntitiesViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onSaveEntity,
}) => {
  const [kindFilter, setKindFilter] = useState<'ALL' | EntityKind>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // New Entity Form
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<EntityKind>('Character');
  const [categoryTier, setCategoryTier] = useState('Category 5');
  const [factionOrCaste, setFactionOrCaste] = useState('');
  const [originOrRealm, setOriginOrRealm] = useState('');
  const [summary, setSummary] = useState('');
  const [metaphysicalNature, setMetaphysicalNature] = useState('');
  const [appearanceAndSilhouette, setAppearanceAndSilhouette] = useState('');
  const [headRatio, setHeadRatio] = useState('7.8 Heads Tall (Heroic Martial Proportion)');
  const [statureMass, setStatureMass] = useState('');
  const [craniofacial, setCraniofacial] = useState('');
  const [ocularFeatures, setOcularFeatures] = useState('');
  const [abilitiesAndPowers, setAbilitiesAndPowers] = useState('');
  const [restrictorPlatesAndLimits, setRestrictorPlatesAndLimits] = useState('');
  const [associatedFuelOrKi, setAssociatedFuelOrKi] = useState('');
  const [production3DBrief, setProduction3DBrief] = useState('');
  const [canonStatus, setCanonStatus] = useState<CanonStatus>('Proposed');

  const filteredEntities = state.entities.filter((ent) => {
    const matchesKind = kindFilter === 'ALL' || ent.kind === kindFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      ent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.metaphysicalNature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ent.factionOrCaste.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesKind && matchesSearch;
  });

  const selectedEntity =
    state.entities.find((e) => e.id === selectedRecordId) || filteredEntities[0];

  const handleCreateEntity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const newEnt: Entity = {
      id: `ent-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim() || 'Custom entity dossier created in the Observatory.',
      kind,
      categoryTier,
      cognitionTier: 'Tier 6-8',
      factionOrCaste: factionOrCaste.trim() || 'Independent',
      originOrRealm: originOrRealm.trim() || 'Ur-Worlds',
      metaphysicalNature: metaphysicalNature.trim() || summary.trim(),
      appearanceAndSilhouette: appearanceAndSilhouette.trim() || 'Pending silhouette study.',
      proportionsAndFacialFeatures: {
        headHeightRatio: headRatio.trim() || '7.5–8.0 Heads Tall',
        statureAndMass: statureMass.trim() || 'Standard high-density somatic build',
        somatotypeAndLimbRatio: appearanceAndSilhouette.trim() || 'Balanced martial proportions',
        craniofacialStructure:
          craniofacial.trim() || 'Defined supraorbital brow, zygomatic arch, and jawline geometry',
        ocularAndFacialFeatures:
          ocularFeatures.trim() || 'Distinct iris, scleral, and dermal somatic markers',
        postureAndCenterOfGravity: 'Grounded combat center-of-gravity',
      },
      abilitiesAndPowers: abilitiesAndPowers.trim() || 'Pending ability calibration.',
      restrictorPlatesAndLimits:
        restrictorPlatesAndLimits.trim() || 'Locked behind ontological restrictor plates.',
      associatedFuelOrKi: associatedFuelOrKi.trim() || 'Netherfire / Somatic Ki',
      production3DBrief: production3DBrief.trim(),
      canonStatus,
      tags: [kind, categoryTier, factionOrCaste, 'Proportions'].filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    onSaveEntity(newEnt);
    onSelectRecord(newEnt.id);
    setTitle('');
    setSummary('');
    setMetaphysicalNature('');
    setAppearanceAndSilhouette('');
    setCraniofacial('');
    setOcularFeatures('');
    setAbilitiesAndPowers('');
    setRestrictorPlatesAndLimits('');
    setShowModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Top Filter Bar */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {ENTITY_KINDS.map((k) => (
            <button
              key={k}
              onClick={() => setKindFilter(k)}
              className={`px-2.5 py-1 rounded text-xs font-mono whitespace-nowrap border transition-all ${
                kindFilter === k
                  ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2] font-semibold'
                  : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2] hover:bg-[#242633]/50'
              }`}
            >
              {k === 'ALL' ? `All Entities (${state.entities.length})` : k}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#A4A6B5] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search breeds, bloodlines, proportions..."
              className="pl-8 pr-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2] placeholder-[#A4A6B5] focus:outline-none focus:border-[#9A82E8]"
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs hover:opacity-90"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Entity &amp; Proportions</span>
          </button>
        </div>
      </div>

      {/* Split List + Detailed Dossier */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left List */}
        <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
          {filteredEntities.map((ent) => {
            const isSelected = selectedEntity?.id === ent.id;
            return (
              <button
                key={ent.id}
                onClick={() => onSelectRecord(ent.id)}
                className={`w-full p-3.5 text-left transition-colors space-y-1 ${
                  isSelected ? 'bg-[#242633] border-l-2 border-l-[#9A82E8]' : 'hover:bg-[#191B25]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#76D5E0] truncate">
                    {ent.kind} · {ent.categoryTier}
                  </span>
                  <CanonBadge status={ent.canonStatus} size="xs" />
                </div>
                <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{ent.title}</div>
                <p className="text-xs text-[#A4A6B5] line-clamp-2">{ent.summary}</p>
              </button>
            );
          })}
        </div>

        {/* Right Entity Dossier */}
        {selectedEntity ? (
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <div className="space-y-3 border-b border-[#353744] pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#76D5E0]">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {selectedEntity.kind} · {selectedEntity.categoryTier} ·{' '}
                    {selectedEntity.factionOrCaste}
                  </span>
                </div>
                <CanonBadge status={selectedEntity.canonStatus} size="sm" />
              </div>

              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                {selectedEntity.title}
              </h2>
              <p className="text-sm text-[#A4A6B5] leading-relaxed">{selectedEntity.summary}</p>

              <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#191B25] border border-[#353744] text-[#D3B477]">
                  Origin: {selectedEntity.originOrRealm}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#191B25] border border-[#353744] text-[#9A82E8]">
                  Energy Vector: {selectedEntity.associatedFuelOrKi}
                </span>
              </div>
            </div>

            {/* Character Proportions & Craniofacial Morphology Studio Panel */}
            {selectedEntity.proportionsAndFacialFeatures && (
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#D3B477]/50 space-y-4">
                <div className="flex items-center justify-between border-b border-[#353744] pb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    <Ruler className="w-4 h-4" />
                    <span>
                      Character Proportions, Somatotype &amp; Craniofacial Morphology Spec
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#76D5E0]">
                    {selectedEntity.proportionsAndFacialFeatures.headHeightRatio}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                  <div className="p-3 rounded bg-[#101117] border border-[#353744] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#D3B477] block">
                      Stature &amp; Structural Mass
                    </span>
                    <p className="text-[#E9E1D2] leading-relaxed">
                      {selectedEntity.proportionsAndFacialFeatures.statureAndMass}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[#101117] border border-[#353744] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#9A82E8] block">
                      Somatotype &amp; Limb Ratio
                    </span>
                    <p className="text-[#E9E1D2] leading-relaxed">
                      {selectedEntity.proportionsAndFacialFeatures.somatotypeAndLimbRatio}
                    </p>
                  </div>

                  <div className="p-3 rounded bg-[#101117] border border-[#353744] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#76D5E0] block">
                      Posture &amp; Center of Gravity
                    </span>
                    <p className="text-[#E9E1D2] leading-relaxed">
                      {selectedEntity.proportionsAndFacialFeatures.postureAndCenterOfGravity}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#101117] border border-[#353744] space-y-1 md:col-span-2">
                    <span className="font-mono text-[10px] uppercase text-[#D3B477] block">
                      Craniofacial Bone Structure (Jaw, Zygomatic Arch, Brow Ridge, Nasal Bridge)
                    </span>
                    <p className="text-[#E9E1D2] leading-relaxed">
                      {selectedEntity.proportionsAndFacialFeatures.craniofacialStructure}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-[#101117] border border-[#353744] space-y-1">
                    <span className="font-mono text-[10px] uppercase text-[#76D5E0] block">
                      Ocular, Dental &amp; Facial Features
                    </span>
                    <p className="text-[#E9E1D2] leading-relaxed">
                      {selectedEntity.proportionsAndFacialFeatures.ocularAndFacialFeatures}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* Metaphysical Nature & Roster */}
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2 xl:col-span-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Metaphysical Nature, Ontology &amp; Canonical Roster</span>
                </div>
                <div className="text-xs sm:text-sm text-[#E9E1D2] whitespace-pre-line leading-relaxed">
                  {selectedEntity.metaphysicalNature}
                </div>
              </div>

              {/* Appearance & Silhouette */}
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Appearance, Anatomy &amp; Silhouette Direction</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedEntity.appearanceAndSilhouette}
                </p>
              </div>

              {/* Abilities & Combat Doctrine */}
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Abilities, Powers &amp; Operational Role</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedEntity.abilitiesAndPowers}
                </p>
              </div>

              {/* Restrictor Plates & Hard Limits */}
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#F18A82]/40 space-y-2 xl:col-span-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Ontological Restrictor Plates, Weaknesses &amp; Unresolved Gaps</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedEntity.restrictorPlatesAndLimits}
                </p>
              </div>

              {/* Optional 3D Production & Audio Specs */}
              {(selectedEntity.production3DBrief || selectedEntity.soundAndVfxDirection) && (
                <>
                  {selectedEntity.soundAndVfxDirection && (
                    <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A4A6B5]">
                        <Volume2 className="w-3.5 h-3.5 text-[#76D5E0]" />
                        <span>Acoustic &amp; Combat VFX Signature</span>
                      </div>
                      <p className="text-xs text-[#E9E1D2] leading-relaxed">
                        {selectedEntity.soundAndVfxDirection}
                      </p>
                    </div>
                  )}
                  {selectedEntity.production3DBrief && (
                    <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A4A6B5]">
                        <Box className="w-3.5 h-3.5 text-[#D3B477]" />
                        <span>3D Modeling, Topology &amp; Shader Brief</span>
                      </div>
                      <p className="text-xs text-[#E9E1D2] leading-relaxed">
                        {selectedEntity.production3DBrief}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-sm text-[#A4A6B5]">
            No entities match the current filter.
          </div>
        )}
      </div>

      {/* Create Entity Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateEntity}
            className="w-full max-w-2xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Create New Entity &amp; Character Proportions Dossier
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Entity Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., The Nadirim Gravity-Inverter"
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Entity Classification
                </label>
                <select
                  value={kind}
                  onChange={(e) => setKind(e.target.value as EntityKind)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                >
                  {ENTITY_KINDS.filter((k) => k !== 'ALL').map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Category Tier
                </label>
                <input
                  type="text"
                  value={categoryTier}
                  onChange={(e) => setCategoryTier(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Faction or Caste
                </label>
                <input
                  type="text"
                  value={factionOrCaste}
                  onChange={(e) => setFactionOrCaste(e.target.value)}
                  placeholder="e.g., Chthonic Dread-Lords"
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Canon Status
                </label>
                <select
                  value={canonStatus}
                  onChange={(e) => setCanonStatus(e.target.value as CanonStatus)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                >
                  <option value="Proposed">Proposed</option>
                  <option value="Inferred">Inferred</option>
                  <option value="Unresolved">Unresolved</option>
                  <option value="Established">Established</option>
                </select>
              </div>
            </div>

            {/* Proportions & Craniofacial Inputs */}
            <div className="p-3.5 rounded bg-[#101117] border border-[#D3B477]/40 space-y-3">
              <div className="text-[11px] font-mono uppercase text-[#D3B477]">
                Character Proportions &amp; Facial Features Specification
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={headRatio}
                  onChange={(e) => setHeadRatio(e.target.value)}
                  placeholder="Head-to-Body Ratio (e.g. 7.8 Heads Tall)..."
                  className="px-2.5 py-1.5 rounded bg-[#191B25] border border-[#353744] text-xs text-[#E9E1D2]"
                />
                <input
                  type="text"
                  value={statureMass}
                  onChange={(e) => setStatureMass(e.target.value)}
                  placeholder="Stature & Mass (e.g. 6'4'', 280 lbs calcified)..."
                  className="px-2.5 py-1.5 rounded bg-[#191B25] border border-[#353744] text-xs text-[#E9E1D2]"
                />
                <input
                  type="text"
                  value={craniofacial}
                  onChange={(e) => setCraniofacial(e.target.value)}
                  placeholder="Craniofacial structure (jawline, cheekbones, brow)..."
                  className="px-2.5 py-1.5 rounded bg-[#191B25] border border-[#353744] text-xs text-[#E9E1D2]"
                />
                <input
                  type="text"
                  value={ocularFeatures}
                  onChange={(e) => setOcularFeatures(e.target.value)}
                  placeholder="Ocular, scleral, dental, or horn features..."
                  className="px-2.5 py-1.5 rounded bg-[#191B25] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                Executive Summary
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Metaphysical Nature &amp; Origins
                </label>
                <textarea
                  rows={2}
                  value={metaphysicalNature}
                  onChange={(e) => setMetaphysicalNature(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Overall Silhouette &amp; Somatotype
                </label>
                <textarea
                  rows={2}
                  value={appearanceAndSilhouette}
                  onChange={(e) => setAppearanceAndSilhouette(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#A4A6B5] mb-1">
                  Abilities &amp; Turn Field Doctrine
                </label>
                <textarea
                  rows={2}
                  value={abilitiesAndPowers}
                  onChange={(e) => setAbilitiesAndPowers(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[#F18A82] mb-1">
                  Ontological Restrictor Plates &amp; Limits
                </label>
                <textarea
                  rows={2}
                  value={restrictorPlatesAndLimits}
                  onChange={(e) => setRestrictorPlatesAndLimits(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Save Entity Dossier
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
