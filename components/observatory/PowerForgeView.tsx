'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  PowerSystem,
  Ability,
  PowerInteraction,
  CanonStatus,
  TurnFieldBehavior,
} from '@/lib/observatoryTypes';
import { COSMIC_FUEL_RESERVOIRS } from '@/lib/loreData';
import { CanonBadge } from './CanonBadge';
import {
  Zap,
  GitCommitHorizontal,
  Scale,
  Plus,
  AlertTriangle,
  ArrowRight,
  Flame,
  Activity,
  ShieldAlert,
  Radio,
  Sparkles,
  Layers,
} from 'lucide-react';

interface PowerForgeViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onAddAbility: (ability: Ability) => void;
  onAddInteraction: (interaction: PowerInteraction) => void;
  onAddPowerSystem: (ps: PowerSystem) => void;
}

const EXOTIC_MATTER_STATES = [
  {
    name: 'Time Crystals',
    vibe: 'Stepped, repeating temporal geometry; fractures and projectiles oscillate on a fixed 3-second loop without losing energy.',
    turnEffect: 'Locks local turn-field intervals into a repeating causal cadence; enemies must move on the beat or suffer temporal shear.',
  },
  {
    name: 'Superionic Ice',
    vibe: 'Pitch-black, scorching-hot crystalline ice that forms under crushing barometric pressure and conducts high-voltage bio-static.',
    turnEffect: 'Turns floor and air moisture into conductive black crystal spires; amplifies lightning/Shiden vectors while rooting targets.',
  },
  {
    name: 'Bose-Einstein Condensate (BEC)',
    vibe: 'Zero-Kelvin quantum fog where distinct particles merge into a single ghostly macroscopic wave-blur.',
    turnEffect: 'Blurs spatial coordinates inside the Turn Field; single-target precision attacks smear across the entire condensate volume.',
  },
  {
    name: 'Quark-Gluon Plasma (QGP)',
    vibe: 'Pre-hadronic primordial white-violet fire that strips atomic nuclei apart—silent, blinding, and hyper-dense.',
    turnEffect: 'Micro-radius absolute annihilation field; bypasses conventional armor hardness by dissolving baryon bonds.',
  },
  {
    name: 'Superfluid & Supersolid',
    vibe: 'Frictionless metallic or vitrified liquid that climbs upward over walls and seeps through microscopic armor seams.',
    turnEffect: 'Coats the Turn Field floor in zero-friction hazard mire (e.g., Kalakuta Bile or Apep-Sludge) that cannot be walled off.',
  },
  {
    name: 'Spacetime-Blind (Completely Non-Physical)',
    vibe: 'Zero mass, untouched by gravity, invisible to physical optics—requires Suffumigative smoke or Kushi-Ki nerve radar to detect.',
    turnEffect: 'Phases through all physical shields; can only be anchored or countered via medium-saturation Turn Fields.',
  },
];

export const PowerForgeView: React.FC<PowerForgeViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onAddAbility,
  onAddInteraction,
}) => {
  const [subTab, setSubTab] = useState<'turnFields' | 'systems' | 'abilities' | 'scaling'>('turnFields');
  const [showNewAbilityModal, setShowNewAbilityModal] = useState(false);
  const [showNewScalingModal, setShowNewScalingModal] = useState(false);

  // Interactive Turn Field & Power Vibe Architect state
  const [tfTitle, setTfTitle] = useState('');
  const [tfClassification, setTfClassification] = useState<TurnFieldBehavior['fieldClassification']>(
    '1. Active Turn Field (Localized Space Conversion)'
  );
  const [tfPhaseState, setTfPhaseState] = useState(EXOTIC_MATTER_STATES[0].name);
  const [tfFuelOrFramework, setTfFuelOrFramework] = useState('Aethelfire Flux + Pactional Perimeter');
  const [tfVibe, setTfVibe] = useState('');
  const [tfTrigger, setTfTrigger] = useState('');
  const [tfDominance, setTfDominance] = useState('');

  // Interactive MWI Possibility & Somatic Calibration Sandbox state
  const [naturalProb, setNaturalProb] = useState(18);
  const [selectedFuelId, setSelectedFuelId] = useState('tejas-flame');
  const [kiOutput, setKiOutput] = useState(80);
  const [kiVersion, setKiVersion] = useState<'Gen-Ki' | 'Ren-Ki' | 'Gō-Ki' | 'Yō-Ki' | 'Mu-Ki'>('Gō-Ki');

  const selectedSystem =
    state.powerSystems.find((p) => p.id === selectedRecordId) || state.powerSystems[0];
  const selectedAbility =
    state.abilities.find((a) => a.id === selectedRecordId) || state.abilities[0];
  const selectedInteraction =
    state.powerInteractions.find((i) => i.id === selectedRecordId) || state.powerInteractions[0];

  // New Ability Form State
  const [abTitle, setAbTitle] = useState('');
  const [abSummary, setAbSummary] = useState('');
  const [abSysId, setAbSysId] = useState(state.powerSystems[0]?.id || 'ps-turn-fields-6-forms');
  const [abDelta, setAbDelta] = useState('0.65 Delta');
  const [abVector, setAbVector] = useState('');
  const [abVibe, setAbVibe] = useState('');
  const [seqSource, setSeqSource] = useState('');
  const [seqActivation, setSeqActivation] = useState('');
  const [seqOperation, setSeqOperation] = useState('');
  const [seqTarget, setSeqTarget] = useState('');
  const [seqEffect, setSeqEffect] = useState('');
  const [seqCost, setSeqCost] = useState('');
  const [seqConsequence, setSeqConsequence] = useState('');
  const [seqFailure, setSeqFailure] = useState('');
  const [abStatus, setAbStatus] = useState<CanonStatus>('Proposed');

  // New Powerscaling / Interaction Form State
  const [piTitle, setPiTitle] = useState('');
  const [piType, setPiType] = useState<PowerInteraction['interactionType']>('Turn Field Clash');
  const [piSubA, setPiSubA] = useState('');
  const [piSubB, setPiSubB] = useState('');
  const [piPremise, setPiPremise] = useState('');
  const [piEvidence, setPiEvidence] = useState('');
  const [piCounter, setPiCounter] = useState('');
  const [piResolution, setPiResolution] = useState('');
  const [piUncertainty, setPiUncertainty] = useState('');

  // Simulator computations
  const activeFuel =
    COSMIC_FUEL_RESERVOIRS.find((f) => f.id === selectedFuelId) || COSMIC_FUEL_RESERVOIRS[0];
  const possibilityResistance = Math.max(0.05, ((100 - naturalProb) / 100) * 1.45).toFixed(2);
  const somaticCoreTemp = (
    98.6 +
    kiOutput * 0.16 * (kiVersion === 'Gō-Ki' ? 1.25 : kiVersion === 'Mu-Ki' ? 0.1 : 0.85)
  ).toFixed(1);
  const somaticMmHg = Math.round(115 + kiOutput * (kiVersion === 'Gō-Ki' ? 1.15 : 0.7));

  const selectedPhasePreset =
    EXOTIC_MATTER_STATES.find((m) => m.name === tfPhaseState) || EXOTIC_MATTER_STATES[0];

  const handleForgeTurnFieldAbility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tfTitle.trim()) return;
    const now = new Date().toISOString();
    const effectiveVibe = tfVibe.trim() || selectedPhasePreset.vibe;
    const effectiveTrigger =
      tfTrigger.trim() || 'Deploys across a 15-meter arena perimeter upon medium/hardware alignment.';
    const effectiveDominance = tfDominance.trim() || selectedPhasePreset.turnEffect;

    const newAb: Ability = {
      id: `ability-tf-${Date.now()}`,
      title: tfTitle.trim(),
      summary: `${tfClassification} expressing as ${tfPhaseState}. ${effectiveDominance}`,
      powerSystemId: 'ps-turn-fields-6-forms',
      powerSystemName: 'Turn Fields & The 6 Supernatural Energy Expressions',
      possibilityDelta: '0.72 Delta (Field-Stabilized)',
      fuelOrSomaticVector: tfFuelOrFramework,
      powerVibe: effectiveVibe,
      turnField: {
        fieldClassification: tfClassification,
        matterPhaseState: tfPhaseState,
        powerVibeAndSensoryTexture: effectiveVibe,
        turnConditionAndTrigger: effectiveTrigger,
        fieldBoundaryAndDominance: effectiveDominance,
      },
      sequence: {
        source: `${tfFuelOrFramework} channeled into ${tfClassification}.`,
        activation: effectiveTrigger,
        operation: `Converts local arena phase-state into ${tfPhaseState}.`,
        target: '15-meter bounded Turn Field volume.',
        effect: effectiveDominance,
        costAndLimitation: 'Requires continuous boundary integrity; collapses if anchor is severed.',
        consequence: `Leaves lingering ${tfPhaseState} residue across realm architecture.`,
        failureOrKickbackPath: 'Premature field rupture causes inward phase-state implosion on the caster.',
      },
      canonStatus: 'Proposed',
      tags: ['Turn Field', tfPhaseState, 'Power Vibe'],
      createdAt: now,
      updatedAt: now,
    };
    onAddAbility(newAb);
    onSelectRecord(newAb.id);
    setSubTab('abilities');
    setTfTitle('');
    setTfVibe('');
    setTfTrigger('');
    setTfDominance('');
  };

  const handleCreateAbility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!abTitle.trim()) return;
    const now = new Date().toISOString();
    const sysObj = state.powerSystems.find((s) => s.id === abSysId);
    const newAb: Ability = {
      id: `ability-${Date.now()}`,
      title: abTitle.trim(),
      summary: abSummary.trim() || 'Structured ability mechanics sequence.',
      powerSystemId: abSysId,
      powerSystemName: sysObj?.title || 'Custom Power System',
      possibilityDelta: abDelta,
      fuelOrSomaticVector: abVector.trim() || 'Supernatural Reserve',
      powerVibe: abVibe.trim() || 'Visceral, high-friction supernatural manifestation.',
      sequence: {
        source: seqSource.trim() || 'Primary reserve / somatic core.',
        activation: seqActivation.trim() || 'Precognitive simulation / somatic stance trigger.',
        operation: seqOperation.trim() || 'Timeline alignment or bio-hydraulic transmission.',
        target: seqTarget.trim() || 'Direct line-of-sight vector.',
        effect: seqEffect.trim() || 'Target reality state or physical impact realized.',
        costAndLimitation: seqCost.trim() || 'Fuel reserve drain and restrictor plate bounds.',
        consequence: seqConsequence.trim() || 'Post-activation environmental residue.',
        failureOrKickbackPath:
          seqFailure.trim() || 'Causal snapback or somatic thermal strain on misfire.',
      },
      canonStatus: abStatus,
      tags: ['Ability', abDelta, abVector].filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    onAddAbility(newAb);
    onSelectRecord(newAb.id);
    setAbTitle('');
    setAbSummary('');
    setAbVibe('');
    setShowNewAbilityModal(false);
  };

  const handleCreateInteraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!piTitle.trim()) return;
    const now = new Date().toISOString();
    const newPi: PowerInteraction = {
      id: `pi-${Date.now()}`,
      title: piTitle.trim(),
      summary: `${piSubA} vs. ${piSubB} — ${piResolution.slice(0, 100)}`,
      interactionType: piType,
      subjectA: piSubA.trim(),
      subjectB: piSubB.trim(),
      premiseAndConditions: piPremise.trim() || 'Neutral manifold encounter.',
      supportingEvidence: piEvidence
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      counterargumentsAndVulnerabilities: piCounter
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      mechanicalResolution: piResolution.trim(),
      uncertaintyAndEdgeCases: piUncertainty.trim() || 'Subject to environmental fuel availability.',
      canonStatus: 'Inferred',
      tags: ['Powerscaling', piType, piSubA, piSubB].filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    onAddInteraction(newPi);
    onSelectRecord(newPi.id);
    setPiTitle('');
    setShowNewScalingModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Sub-Navigation Bar */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubTab('turnFields')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'turnFields'
                ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-[#D3B477]" />
            <span>Turn Fields &amp; Power Vibe Architect</span>
          </button>

          <button
            onClick={() => setSubTab('systems')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'systems'
                ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#9A82E8]" />
            <span>Power Systems, Frameworks &amp; Fuels ({state.powerSystems.length})</span>
          </button>

          <button
            onClick={() => setSubTab('abilities')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'abilities'
                ? 'bg-[#242633] border-[#76D5E0] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <GitCommitHorizontal className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span>Ability Mechanics &amp; Field Sequences ({state.abilities.length})</span>
          </button>

          <button
            onClick={() => setSubTab('scaling')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'scaling'
                ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-[#D3B477]" />
            <span>Field Clashes &amp; Powerscaling ({state.powerInteractions.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'abilities' && (
            <button
              onClick={() => setShowNewAbilityModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Ability Sequence</span>
            </button>
          )}
          {subTab === 'scaling' && (
            <button
              onClick={() => setShowNewScalingModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#D3B477] text-[#101117] font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Clash / Comparison</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab 0: Turn Fields & Power Vibe Architect */}
      {subTab === 'turnFields' && (
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Banner Explaining Turn Fields & Power Vibe */}
            <div className="p-6 rounded-lg bg-[#191B25] border border-[#D3B477]/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D3B477]">
                  Canonical Energy Architecture · Expression #1: Turn Fields &amp; Power Vibe
                </span>
                <CanonBadge status="Established" size="sm" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                Turn Fields, Exotic Matter States &amp; The Ur-Verse Power Vibe
              </h2>
              <p className="text-xs sm:text-sm text-[#A4A6B5] leading-relaxed">
                In the Ur-Verse, supernatural energies are never weightless, generic fantasy lasers.
                They express across <strong>6 Structural Forms</strong> (1. <em>Fields / Turn Fields</em>, 2.{' '}
                <em>Reserves</em>, 3. <em>Connected Networks</em>, 4. <em>Essence</em>, 5.{' '}
                <em>Realms of Energy</em>, 6. <em>En-Grafted</em>) and manifest in <strong>11 Physical &amp; Exotic Matter States</strong>{' '}
                (Quark-Gluon Plasma, Bose-Einstein Condensate, Superfluid, Supersolid, Time Crystals,
                Superionic Ice) or <strong>Spacetime-Blind Non-Physicality</strong>. When a combatant
                deploys a <strong>Turn Field</strong>, they convert the local arena&apos;s phase-state,
                geometry, and turn-cadence into their domain.
              </p>
            </div>

            {/* Interactive Turn Field & Power Vibe Forge + Exotic Matter Reference */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left: Exotic Matter Phase-States & Vibe Cards (7 cols) */}
              <div className="xl:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                  <Layers className="w-4 h-4" />
                  <span>Exotic Matter Phase-States &amp; Turn-Field Vibe Reference</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {EXOTIC_MATTER_STATES.map((st) => {
                    const isPicked = tfPhaseState === st.name;
                    return (
                      <div
                        key={st.name}
                        onClick={() => setTfPhaseState(st.name)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all space-y-2 ${
                          isPicked
                            ? 'bg-[#242633] border-[#D3B477]'
                            : 'bg-[#191B25] border-[#353744] hover:border-[#9A82E8]/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-serif font-semibold text-[#E9E1D2]">
                            {st.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#101117] text-[#D3B477] border border-[#353744]">
                            Phase State
                          </span>
                        </div>
                        <div className="text-xs text-[#A4A6B5] leading-relaxed">
                          <strong className="text-[#9A82E8] font-mono text-[10px] uppercase block">
                            Power Vibe &amp; Sensory Texture:
                          </strong>
                          {st.vibe}
                        </div>
                        <div className="text-xs text-[#E9E1D2] leading-relaxed pt-1 border-t border-[#353744]">
                          <strong className="text-[#76D5E0] font-mono text-[10px] uppercase block">
                            Turn Field Mechanic:
                          </strong>
                          {st.turnEffect}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Forge New Turn Field Ability (5 cols) */}
              <form
                onSubmit={handleForgeTurnFieldAbility}
                className="xl:col-span-5 p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-4 self-start"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  <Sparkles className="w-4 h-4" />
                  <span>Forge New Turn Field &amp; Power Vibe Spec</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                    Turn Field / Technique Name
                  </label>
                  <input
                    type="text"
                    required
                    value={tfTitle}
                    onChange={(e) => setTfTitle(e.target.value)}
                    placeholder="e.g., Chronoclast Time-Crystal Arena Lock"
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                      Energy Expression Form
                    </label>
                    <select
                      value={tfClassification}
                      onChange={(e) =>
                        setTfClassification(
                          e.target.value as TurnFieldBehavior['fieldClassification']
                        )
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                    >
                      <option value="1. Active Turn Field (Localized Space Conversion)">
                        1. Active Turn Field
                      </option>
                      <option value="2. Internal Reserve Locus">2. Internal Reserve Locus</option>
                      <option value="3. Connected Ley/Psychic Network">
                        3. Connected Network
                      </option>
                      <option value="4. Pure Essence Projection">4. Pure Essence</option>
                      <option value="5. Micro-Realm of Energy">5. Micro-Realm of Energy</option>
                      <option value="6. En-Grafted Hardware Field">6. En-Grafted Field</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                      Matter / Metaphysical Phase
                    </label>
                    <select
                      value={tfPhaseState}
                      onChange={(e) => setTfPhaseState(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                    >
                      {EXOTIC_MATTER_STATES.map((m) => (
                        <option key={m.name} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                    Driving Fuel, Ki Variant, or Occult Framework
                  </label>
                  <input
                    type="text"
                    value={tfFuelOrFramework}
                    onChange={(e) => setTfFuelOrFramework(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#D3B477] mb-1">
                    Power Vibe &amp; Sensory Texture (Visual, Acoustic, Tactile)
                  </label>
                  <textarea
                    rows={2}
                    value={tfVibe}
                    onChange={(e) => setTfVibe(e.target.value)}
                    placeholder={selectedPhasePreset.vibe}
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#76D5E0] mb-1">
                    Turn Condition, Field Boundary &amp; Dominance Rule
                  </label>
                  <textarea
                    rows={2}
                    value={tfDominance}
                    onChange={(e) => setTfDominance(e.target.value)}
                    placeholder={selectedPhasePreset.turnEffect}
                    className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs hover:opacity-90"
                >
                  Save Turn Field to Power Forge
                </button>
              </form>
            </div>

            {/* Power Vibe Comparison Across Core Systems */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                Canonical Power Vibe &amp; Turn-Field Matrix Across All Major Systems
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {state.powerSystems.map((ps) => (
                  <div
                    key={ps.id}
                    onClick={() => {
                      onSelectRecord(ps.id);
                      setSubTab('systems');
                    }}
                    className="p-4 rounded-lg bg-[#191B25] border border-[#353744] hover:border-[#D3B477] cursor-pointer space-y-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                        {ps.systemCategory}
                      </span>
                      <CanonBadge status={ps.canonStatus} size="xs" />
                    </div>
                    <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                      {ps.title}
                    </div>
                    {ps.powerVibeSignature && (
                      <div className="p-2.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]">
                        <span className="block text-[10px] font-mono uppercase text-[#D3B477] mb-0.5">
                          Power Vibe:
                        </span>
                        {ps.powerVibeSignature}
                      </div>
                    )}
                    {ps.turnFieldMechanics && (
                      <div className="text-xs text-[#A4A6B5] leading-relaxed">
                        <span className="font-mono text-[10px] uppercase text-[#76D5E0] block">
                          Turn Field Behavior:
                        </span>
                        {ps.turnFieldMechanics}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 1: Power Systems, Frameworks & Fuels */}
      {subTab === 'systems' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {state.powerSystems.map((ps) => {
              const isSelected = selectedSystem?.id === ps.id;
              return (
                <button
                  key={ps.id}
                  onClick={() => onSelectRecord(ps.id)}
                  className={`w-full p-4 text-left transition-colors space-y-1 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#9A82E8]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                      {ps.systemCategory}
                    </span>
                    <CanonBadge status={ps.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{ps.title}</div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{ps.summary}</p>
                </button>
              );
            })}
          </div>

          {selectedSystem && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#353744] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    {selectedSystem.systemCategory} · {selectedSystem.epithet}
                  </span>
                  <CanonBadge status={selectedSystem.canonStatus} size="sm" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedSystem.title}
                </h2>
                <p className="text-sm text-[#A4A6B5]">{selectedSystem.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2 md:col-span-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    Core Ontological Axiom
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedSystem.coreAxiom}
                  </p>
                </div>

                {selectedSystem.powerVibeSignature && (
                  <div className="p-5 rounded-lg bg-[#191B25] border border-[#D3B477]/50 space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                      Power Vibe &amp; Sensory Aesthetic
                    </div>
                    <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                      {selectedSystem.powerVibeSignature}
                    </p>
                  </div>
                )}

                {selectedSystem.turnFieldMechanics && (
                  <div className="p-5 rounded-lg bg-[#191B25] border border-[#76D5E0]/50 space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                      Turn Field Deployment &amp; Domain Mechanics
                    </div>
                    <p className="text-xs sm:text-sm text-[#E9E1D2] whitespace-pre-line leading-relaxed">
                      {selectedSystem.turnFieldMechanics}
                    </p>
                  </div>
                )}

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    Operational Mechanics
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] whitespace-pre-line leading-relaxed">
                    {selectedSystem.operationalMechanics}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                    Hardware &amp; Medium Requirements
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedSystem.hardwareOrMediumRequired}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#F18A82]/40 space-y-2 md:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Restrictor Plates, Kickback &amp; Gatekeeping Enforcement</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] whitespace-pre-line leading-relaxed">
                    {selectedSystem.restrictorPlateAndKickback}
                  </p>
                </div>
              </div>

              {/* Interactive Diagnostic Bench for MWI Gun System or Somatic Ki */}
              {selectedSystem.id === 'ps-mwi-gun-system' && (
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                      <Flame className="w-4 h-4" />
                      <span>Interactive MWI Possibility Resistance Calibration Bench</span>
                    </div>
                    <span className="font-mono text-xs text-[#D3B477]">
                      Resistance Delta: {possibilityResistance} Δ
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A4A6B5] mb-1">
                        Natural Timeline Probability ({naturalProb}%)
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={99}
                        value={naturalProb}
                        onChange={(e) => setNaturalProb(Number(e.target.value))}
                        className="w-full accent-[#9A82E8]"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-[#A4A6B5] mt-1">
                        <span>1% (Axiom Breach)</span>
                        <span>50% (Plausible)</span>
                        <span>99% (Coincidental)</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A4A6B5] mb-1">
                        Loaded Cosmic Fuel (&ldquo;Bullet&rdquo;)
                      </label>
                      <select
                        value={selectedFuelId}
                        onChange={(e) => setSelectedFuelId(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                      >
                        {COSMIC_FUEL_RESERVOIRS.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} ({f.sector} · {f.fuelGrade})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-[#101117] border border-[#353744] text-xs space-y-1">
                    <div className="font-mono text-[#76D5E0]">
                      Encoded Outcome Vector: {activeFuel.axiomaticVector}
                    </div>
                    <div className="text-[#A4A6B5]">
                      Physical/Metaphysical State: {activeFuel.state}
                    </div>
                  </div>
                </div>
              )}

              {selectedSystem.id === 'ps-somatic-ki-engine' && (
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#76D5E0]/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                      <Activity className="w-4 h-4" />
                      <span>Somatic Hardware Thermal &amp; Hydraulic Stress Simulator</span>
                    </div>
                    <span className="font-mono text-xs text-[#F18A82]">
                      Core Temp: {somaticCoreTemp}°F · Pressure: {somaticMmHg} mmHg
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[#A4A6B5] mb-1">
                        Myofibril &amp; ATP Output ({kiOutput}%)
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={kiOutput}
                        onChange={(e) => setKiOutput(Number(e.target.value))}
                        className="w-full accent-[#76D5E0]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#A4A6B5] mb-1">
                        Operational Ki Version
                      </label>
                      <div className="flex gap-1.5">
                        {(['Gen-Ki', 'Ren-Ki', 'Gō-Ki', 'Yō-Ki', 'Mu-Ki'] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => setKiVersion(v)}
                            className={`px-2 py-1 rounded text-[11px] font-mono border ${
                              kiVersion === v
                                ? 'bg-[#76D5E0] text-[#101117] font-semibold border-[#76D5E0]'
                                : 'bg-[#101117] text-[#A4A6B5] border-[#353744]'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-[#101117] border border-[#353744] text-xs font-mono text-[#E9E1D2]">
                    {Number(somaticCoreTemp) >= 108
                      ? 'WARNING: Core temp exceeds 108°F — White pore-steam Turn Field venting active to prevent internal organ cooking.'
                      : kiVersion === 'Mu-Ki'
                      ? 'MU-KI STEALTH: Autonomic and electromagnetic signature collapsed to zero.'
                      : 'Somatic equilibrium nominal.'}
                  </div>
                </div>
              )}

              {/* Sub-Components / Reserves / Seed List */}
              {selectedSystem.subComponents.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    Registered Reserves, Variants &amp; Framework Seeds (
                    {selectedSystem.subComponents.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {selectedSystem.subComponents.map((sub, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded bg-[#191B25] border border-[#353744] space-y-1"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#76D5E0]">{sub.designation}</span>
                          {sub.stateOrGrade && (
                            <span className="px-1.5 py-0.5 rounded bg-[#101117] text-[#D3B477] border border-[#353744]">
                              {sub.stateOrGrade}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                          {sub.name}
                        </div>
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

      {/* Sub-Tab 2: Ability Mechanics Sequence Editor */}
      {subTab === 'abilities' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {state.abilities.map((ab) => {
              const isSelected = selectedAbility?.id === ab.id;
              return (
                <button
                  key={ab.id}
                  onClick={() => onSelectRecord(ab.id)}
                  className={`w-full p-4 text-left transition-colors space-y-1 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#76D5E0]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#76D5E0] truncate">
                      {ab.possibilityDelta}
                    </span>
                    <CanonBadge status={ab.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{ab.title}</div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{ab.summary}</p>
                </button>
              );
            })}
          </div>

          {selectedAbility && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#353744] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    {selectedAbility.powerSystemName} · {selectedAbility.possibilityDelta}
                  </span>
                  <CanonBadge status={selectedAbility.canonStatus} size="sm" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedAbility.title}
                </h2>
                <p className="text-sm text-[#A4A6B5]">{selectedAbility.summary}</p>
                <div className="text-xs font-mono text-[#D3B477]">
                  Fuel / Somatic Vector: {selectedAbility.fuelOrSomaticVector}
                </div>
              </div>

              {/* Power Vibe & Turn Field Profile */}
              {(selectedAbility.powerVibe || selectedAbility.turnField) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAbility.powerVibe && (
                    <div className="p-4 rounded-lg bg-[#191B25] border border-[#D3B477]/50 space-y-1.5">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#D3B477]">
                        Power Vibe &amp; Sensory Signature
                      </div>
                      <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                        {selectedAbility.powerVibe}
                      </p>
                    </div>
                  )}
                  {selectedAbility.turnField && (
                    <div className="p-4 rounded-lg bg-[#191B25] border border-[#76D5E0]/50 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[#76D5E0]">
                        <span>{selectedAbility.turnField.fieldClassification}</span>
                        <span className="text-[#D3B477]">
                          {selectedAbility.turnField.matterPhaseState}
                        </span>
                      </div>
                      <p className="text-xs text-[#E9E1D2] leading-relaxed">
                        <strong>Turn Trigger:</strong>{' '}
                        {selectedAbility.turnField.turnConditionAndTrigger}
                      </p>
                      <p className="text-xs text-[#A4A6B5] leading-relaxed">
                        <strong>Field Dominance:</strong>{' '}
                        {selectedAbility.turnField.fieldBoundaryAndDominance}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 7-Stage Causal Pipeline */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  7-Stage Ability Mechanics Sequence (Causal Pipeline)
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {(
                    [
                      { label: '1. Source (Reserve / Hardware Locus)', val: selectedAbility.sequence.source, color: '#D3B477' },
                      { label: '2. Activation (Simulation / Somatic Trigger)', val: selectedAbility.sequence.activation, color: '#9A82E8' },
                      { label: '3. Operation (Timeline Alignment / Mechanism)', val: selectedAbility.sequence.operation, color: '#76D5E0' },
                      { label: '4. Target (Vector & Turn-Field Envelope)', val: selectedAbility.sequence.target, color: '#E9E1D2' },
                      { label: '5. Effect (Realized Outcome State)', val: selectedAbility.sequence.effect, color: '#9A82E8' },
                      { label: '6. Cost & Limitation (Restrictor Plate)', val: selectedAbility.sequence.costAndLimitation, color: '#D3B477' },
                      { label: '7. Consequence (Aftermath & Residue)', val: selectedAbility.sequence.consequence, color: '#76D5E0' },
                    ] as const
                  ).map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#191B25] border border-[#353744] flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <div className="sm:w-64 shrink-0 flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" style={{ color: step.color }} />
                        <span
                          className="text-xs font-mono font-semibold uppercase"
                          style={{ color: step.color }}
                        >
                          {step.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed flex-1">
                        {step.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Failure / Kickback Branch */}
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#F18A82]/50 space-y-1.5 mt-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Failure Branch &amp; Causal / Somatic Kickback</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedAbility.sequence.failureOrKickbackPath}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 3: Power Interactions & Powerscaling Workspace */}
      {subTab === 'scaling' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {state.powerInteractions.map((pi) => {
              const isSelected = selectedInteraction?.id === pi.id;
              return (
                <button
                  key={pi.id}
                  onClick={() => onSelectRecord(pi.id)}
                  className={`w-full p-4 text-left transition-colors space-y-1 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#D3B477]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#D3B477]">
                      {pi.interactionType}
                    </span>
                    <CanonBadge status={pi.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{pi.title}</div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{pi.summary}</p>
                </button>
              );
            })}
          </div>

          {selectedInteraction && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="space-y-2 border-b border-[#353744] pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    {selectedInteraction.interactionType} · Contextual Evidence Analysis
                  </span>
                  <CanonBadge status={selectedInteraction.canonStatus} size="sm" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                  {selectedInteraction.title}
                </h2>
                <p className="text-sm text-[#A4A6B5]">{selectedInteraction.summary}</p>
              </div>

              {/* Combatants / Subjects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#191B25] border border-[#9A82E8]/50">
                  <div className="text-[10px] font-mono uppercase text-[#9A82E8]">Subject A</div>
                  <div className="text-base font-serif font-semibold text-[#E9E1D2] mt-0.5">
                    {selectedInteraction.subjectA}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-[#191B25] border border-[#76D5E0]/50">
                  <div className="text-[10px] font-mono uppercase text-[#76D5E0]">Subject B</div>
                  <div className="text-base font-serif font-semibold text-[#E9E1D2] mt-0.5">
                    {selectedInteraction.subjectB}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                  1. Premise, Arena &amp; Boundary Conditions
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedInteraction.premiseAndConditions}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    2. Supporting Canonical Evidence
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#E9E1D2]">
                    {selectedInteraction.supportingEvidence.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#76D5E0] font-mono">•</span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                    3. Counterarguments &amp; Vulnerabilities
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#E9E1D2]">
                    {selectedInteraction.counterargumentsAndVulnerabilities.map((ca, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F18A82] font-mono">•</span>
                        <span>{ca}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  4. Mechanical Resolution
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedInteraction.mechanicalResolution}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#101117] border border-[#353744] space-y-1">
                <div className="text-[11px] font-mono uppercase text-[#A4A6B5]">
                  5. Uncertainty &amp; Open Edge Cases
                </div>
                <p className="text-xs text-[#A4A6B5] leading-relaxed">
                  {selectedInteraction.uncertaintyAndEdgeCases}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* New Ability Modal */}
      {showNewAbilityModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateAbility}
            className="w-full max-w-2xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-3 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Create 7-Stage Ability Mechanics Sequence
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Ability Title
                </label>
                <input
                  type="text"
                  required
                  value={abTitle}
                  onChange={(e) => setAbTitle(e.target.value)}
                  placeholder="e.g., Sacred Itz Shadow-Pinning"
                  className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Parent Power System
                </label>
                <select
                  value={abSysId}
                  onChange={(e) => setAbSysId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                >
                  {state.powerSystems.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Possibility Resistance Delta
                </label>
                <input
                  type="text"
                  value={abDelta}
                  onChange={(e) => setAbDelta(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Fuel or Somatic Vector
                </label>
                <input
                  type="text"
                  value={abVector}
                  onChange={(e) => setAbVector(e.target.value)}
                  placeholder="e.g., Sacred Itz (Heavy Nectar)"
                  className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#D3B477] mb-1">
                Power Vibe &amp; Sensory Signature
              </label>
              <input
                type="text"
                value={abVibe}
                onChange={(e) => setAbVibe(e.target.value)}
                placeholder="How does it look, sound, and distort local space?"
                className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                Summary
              </label>
              <input
                type="text"
                value={abSummary}
                onChange={(e) => setAbSummary(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={seqSource}
                onChange={(e) => setSeqSource(e.target.value)}
                placeholder="1. Source (Reserve / Hardware)..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqActivation}
                onChange={(e) => setSeqActivation(e.target.value)}
                placeholder="2. Activation trigger..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqOperation}
                onChange={(e) => setSeqOperation(e.target.value)}
                placeholder="3. Operation mechanism..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqTarget}
                onChange={(e) => setSeqTarget(e.target.value)}
                placeholder="4. Target vector..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqEffect}
                onChange={(e) => setSeqEffect(e.target.value)}
                placeholder="5. Realized Effect..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqCost}
                onChange={(e) => setSeqCost(e.target.value)}
                placeholder="6. Cost & Limitation..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqConsequence}
                onChange={(e) => setSeqConsequence(e.target.value)}
                placeholder="7. Consequence..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={seqFailure}
                onChange={(e) => setSeqFailure(e.target.value)}
                placeholder="8. Failure / Kickback Path..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#F18A82]/50 text-xs text-[#E9E1D2]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewAbilityModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Save Ability Sequence
              </button>
            </div>
          </form>
        </div>
      )}

      {/* New Powerscaling Comparison Modal */}
      {showNewScalingModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateInteraction}
            className="w-full max-w-2xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-3 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Document Turn Field Clash / Powerscaling Analysis
            </h3>
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#A4A6B5] mb-1">
                Comparison Title
              </label>
              <input
                type="text"
                required
                value={piTitle}
                onChange={(e) => setPiTitle(e.target.value)}
                placeholder="e.g., Time Crystal Turn Field vs. Decanic Gearbox Field"
                className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={piSubA}
                onChange={(e) => setPiSubA(e.target.value)}
                placeholder="Subject / Turn Field A..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                required
                value={piSubB}
                onChange={(e) => setPiSubB(e.target.value)}
                placeholder="Subject / Turn Field B..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            <input
              type="text"
              value={piPremise}
              onChange={(e) => setPiPremise(e.target.value)}
              placeholder="Premise and environmental conditions..."
              className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              value={piEvidence}
              onChange={(e) => setPiEvidence(e.target.value)}
              placeholder="Supporting canonical evidence (one per line)..."
              className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              value={piCounter}
              onChange={(e) => setPiCounter(e.target.value)}
              placeholder="Counterarguments & vulnerabilities (one per line)..."
              className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              required
              value={piResolution}
              onChange={(e) => setPiResolution(e.target.value)}
              placeholder="Mechanical resolution..."
              className="w-full px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewScalingModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#D3B477] text-[#101117] font-semibold text-xs"
              >
                Save Powerscaling Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
