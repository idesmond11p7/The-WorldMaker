'use client';

import React, { useState } from 'react';
import { COSMIC_FUEL_RESERVOIRS, FuelReservoir } from '@/lib/loreData';
import { Gauge, Flame, Wind, Activity, AlertTriangle, Shield, Zap, Sparkles } from 'lucide-react';

export const PowerSystemsView: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<'gunSystem' | 'kiEngine'>('gunSystem');

  // Gun System State
  const [selectedOutcomeChamber, setSelectedOutcomeChamber] = useState<'spatial' | 'necrosis' | 'thermal' | 'temporal' | 'adhesion'>('spatial');
  const [selectedFuelId, setSelectedFuelId] = useState<string>('tejas-flame');
  const [naturalProbability, setNaturalProbability] = useState<number>(20); // 0% to 100%

  // Ki Somatic State
  const [selectedKiType, setSelectedKiType] = useState<'ara' | 'nigi' | 'kushi' | 'saki'>('ara');
  const [selectedVersion, setSelectedVersion] = useState<number>(2); // 0=Gen, 1=Ren, 2=Go, 3=Yo, 4=Mu
  const [selectedPhenotype, setSelectedPhenotype] = useState<string>('kokotsu');
  const [somaticOutputPower, setSomaticOutputPower] = useState<number>(75); // 0 to 100%

  // Calculations for Gun System
  const selectedFuel = COSMIC_FUEL_RESERVOIRS.find((f) => f.id === selectedFuelId) || COSMIC_FUEL_RESERVOIRS[0];

  // Possibility Resistance is inversely proportional to natural probability
  const possibilityResistance = Math.max(0.05, ((100 - naturalProbability) / 100) * 1.5).toFixed(2);
  const fuelRequired = Math.round(Number(possibilityResistance) * 85);
  const neuralLagMs = Math.round(Number(possibilityResistance) * 220);
  const temporalKickbackRisk = naturalProbability < 15 ? 'Critical (Dimensional Fracture Danger)' : naturalProbability < 40 ? 'Moderate (Spatial Shear)' : 'Minimal (Clean Timeline Alignment)';

  // Chamber matching validation
  const chamberMap: Record<string, { label: string; compatibleGrades: string[]; desc: string }> = {
    spatial: { label: 'Spatial / Dimensional Fold', compatibleGrades: ['Volatile', 'Superfluid'], desc: 'Displaces spatial coordinates or pinches metric space.' },
    necrosis: { label: 'Biological Axiom Erasure', compatibleGrades: ['Superfluid', 'Heavy Nectar'], desc: 'Deletes biological regenerative axioms.' },
    thermal: { label: 'Sub-Atomic Thermal Conflagration', compatibleGrades: ['Plasma', 'Vitrified'], desc: 'Superheats atomic bonds directly inside target matter.' },
    temporal: { label: 'Timeline Compression / Stasis', compatibleGrades: ['Superfluid', 'Vitrified'], desc: 'Forces localized timeline synchronization.' },
    adhesion: { label: 'Metaphysical Concept Adhesion', compatibleGrades: ['Heavy Nectar', 'Plasma'], desc: 'Binds disparate concepts (e.g. shadow to granite).' }
  };

  const isChamberCompatible = chamberMap[selectedOutcomeChamber].compatibleGrades.includes(selectedFuel.fuelGrade);

  // Calculations for Ki Somatic Engine
  const baseTemp = 98.6;
  const tempRise = (somaticOutputPower * 0.18) * (selectedVersion === 2 ? 1.4 : selectedVersion === 1 ? 0.8 : selectedVersion === 4 ? 0.2 : 1.0);
  const currentTemp = (baseTemp + tempRise).toFixed(1);
  const poreSteamActive = Number(currentTemp) >= 104.0;
  const lacticRisk = somaticOutputPower > 80 && selectedKiType === 'ara';
  const hydraulicPressure = (120 + somaticOutputPower * 1.1).toFixed(0);
  const scleralBleedRisk = Number(hydraulicPressure) >= 200;

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-y-auto bg-stone-950 text-stone-200 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Header Ribbon & Engine Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Mechanics Laboratory
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-100 mt-1">
              Dual Supernatural Engines
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Simulate Possibility Resistance in MWI reality warping vs. biological hardware strain in somatic Ki.
            </p>
          </div>

          {/* Engine Selector */}
          <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveEngine('gunSystem')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeEngine === 'gunSystem'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>The Gun System (MWI MAGIC)</span>
            </button>
            <button
              onClick={() => setActiveEngine('kiEngine')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeEngine === 'kiEngine'
                  ? 'bg-rose-600 text-stone-100 font-semibold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Somatic Ki Hardware (Biology)</span>
            </button>
          </div>
        </div>

        {/* ENGINE 1: THE GUN SYSTEM */}
        {activeEngine === 'gunSystem' && (
          <div className="space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-5">
              <h2 className="text-sm font-serif font-bold text-amber-400 uppercase tracking-wider mb-1">
                The Military Reserve Gun System: Possibility Resistance Calculator
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                In Ur-Worlds metaphysics, an intended outcome is an empty physical chamber. Specialized fuel acts as ammunition. Mental precognitive simulation acts as the blueprint. Cost is determined entirely by how far the desired outcome is from natural occurrence in the timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Step 1: Outcome Chamber */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Step 1: The Shell (Outcome Chamber)
                </div>
                <div className="space-y-2">
                  {(Object.keys(chamberMap) as (keyof typeof chamberMap)[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSelectedOutcomeChamber(key as 'spatial' | 'necrosis' | 'thermal' | 'temporal' | 'adhesion')}
                      className={`w-full text-left p-3 rounded border text-xs transition-colors ${
                        selectedOutcomeChamber === key
                          ? 'bg-amber-500/10 border-amber-500/60 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className="font-semibold text-stone-200">{chamberMap[key].label}</div>
                      <div className="text-[11px] text-stone-500 mt-1">{chamberMap[key].desc}</div>
                      <div className="text-[10px] font-mono text-amber-400/80 mt-1">
                        Requires: {chamberMap[key].compatibleGrades.join(' or ')} Fuel
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Specialized Fuel Ammunition */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Step 2: The Bullet (Fuel Reservoir)
                </div>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {COSMIC_FUEL_RESERVOIRS.map((fuel) => {
                    const isSelected = selectedFuelId === fuel.id;
                    return (
                      <button
                        key={fuel.id}
                        onClick={() => setSelectedFuelId(fuel.id)}
                        className={`w-full text-left p-2.5 rounded border text-xs transition-colors ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/60 text-stone-100'
                            : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-200">{fuel.name}</span>
                          <span className="text-[10px] font-mono text-stone-500">{fuel.fuelGrade}</span>
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono mt-0.5">{fuel.sector}</div>
                        <div className="text-[11px] text-stone-400 line-clamp-1 mt-1">{fuel.axiomaticVector}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Timeline Deviation & Telemetry */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-5">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Step 3: Timeline Probability & Telemetry
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-400">Natural Timeline Probability</span>
                    <span className="font-mono text-amber-400">{naturalProbability}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="99"
                    value={naturalProbability}
                    onChange={(e) => setNaturalProbability(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>Absolute Impossibility</span>
                    <span>High Natural Likelihood</span>
                  </div>
                </div>

                {/* Compatibility Warning */}
                {!isChamberCompatible ? (
                  <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded text-xs text-rose-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Mismatched Ammunition</div>
                      <div className="text-[11px] text-rose-200/80 mt-0.5">
                        Selected chamber requires {chamberMap[selectedOutcomeChamber].compatibleGrades.join(' or ')} propellant. Attempting to fire will cause catastrophic chamber blowout.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/30 border border-emerald-800/50 rounded text-xs text-emerald-300 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ammunition matches outcome chamber specifications.</span>
                  </div>
                )}

                {/* Telemetry Readouts */}
                <div className="space-y-3 border-t border-stone-800 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Possibility Resistance Index:</span>
                    <span className="font-mono text-sm text-stone-100 font-bold tabular-nums">
                      {possibilityResistance} <span className="text-[10px] text-stone-500">PR</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Fuel Reservoir Depletion:</span>
                    <span className="font-mono text-sm text-amber-400 font-bold tabular-nums">
                      {fuelRequired} <span className="text-[10px] text-stone-500">Units</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Cognitive Rendering Latency:</span>
                    <span className="font-mono text-sm text-sky-400 font-bold tabular-nums">
                      +{neuralLagMs} ms
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Temporal Kickback:</span>
                    <span className="text-[11px] text-stone-300 font-mono text-right">
                      {temporalKickbackRisk}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ENGINE 2: SOMATIC KI HARDWARE */}
        {activeEngine === 'kiEngine' && (
          <div className="space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-5">
              <h2 className="text-sm font-serif font-bold text-rose-400 uppercase tracking-wider mb-1">
                Universal Ontological Taxonomy: Ki Somatic Hardware Simulator
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                Ki is the indigenous somatic and kinetic constant of physical biology asserting territory, mass, and velocity against an indifferent universe. It does not tax Many-Worlds Possibility Resistance; it taxes muscle, bone, and vascular hardware.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Type & Version Selector */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Primal Type (Ichirei Shikon)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ara', label: 'Ara-Ki (荒気)', sub: 'Kinetic Ravage' },
                    { id: 'nigi', label: 'Nigi-Ki (和気)', sub: 'Cohesive Density' },
                    { id: 'kushi', label: 'Kushi-Ki (奇気)', sub: 'Prescient Instinct' },
                    { id: 'saki', label: 'Saki-Ki (幸気)', sub: 'Trophic Predation' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedKiType(t.id as any)}
                      className={`p-2.5 rounded border text-xs text-left transition-colors ${
                        selectedKiType === t.id
                          ? 'bg-rose-500/20 border-rose-500/60 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className="font-semibold text-stone-200">{t.label}</div>
                      <div className="text-[10px] text-stone-500">{t.sub}</div>
                    </button>
                  ))}
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-stone-400 pt-2 border-t border-stone-800">
                  Operational Version
                </div>
                <div className="space-y-1.5">
                  {[
                    { v: 0, label: 'Version 0: Gen-Ki (元気)', sub: 'Metabolic Baseline' },
                    { v: 1, label: 'Version I: Ren-Ki (練気)', sub: 'Coiled Somatic Tension' },
                    { v: 2, label: 'Version II: Gō-Ki (豪気)', sub: 'Atmospheric Rupture' },
                    { v: 3, label: 'Version III: Yō-Ki (妖気)', sub: 'Inverted Bestial Warp' },
                    { v: 4, label: 'Version IV: Mu-Ki (無気)', sub: 'Null-Somatic Void' },
                  ].map((ver) => (
                    <button
                      key={ver.v}
                      onClick={() => setSelectedVersion(ver.v)}
                      className={`w-full p-2 rounded border text-xs flex items-center justify-between transition-colors ${
                        selectedVersion === ver.v
                          ? 'bg-rose-500/20 border-rose-500/60 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <span className="font-medium">{ver.label}</span>
                      <span className="text-[10px] text-stone-500 font-mono">{ver.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phenotypic Variant */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Biological Phenotype Variant
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'kokotsu', label: 'Kokotsu (骨刹 — Tectonic Bone)', desc: 'Osteoblast mineralization; delivers immovable bedrock mass into impacts.' },
                    { id: 'raiketsu', label: 'Raiketsu (雷血 — Synaptic Rend)', desc: 'Accelerates nerve conduction to sub-millisecond speeds; electric discharge.' },
                    { id: 'chiryoku', label: 'Chiryoku (血力 — Hydraulic Sanguine)', desc: 'Pressurizes capillaries into supersonic vacuum-edges severing steel cables.' },
                    { id: 'kagekiri', label: 'Kage-Kiri (影切 — Photonic Sink)', desc: 'Matte-black dermal absorption; deletes optical and acoustic wake.' },
                    { id: 'ryuketsu', label: 'Ryū-Ketsu (竜血 — Interlocking Scale)', desc: 'Bio-mineral copper plates under epidermis; explosive acoustic roars.' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhenotype(p.id)}
                      className={`w-full p-2.5 rounded border text-xs text-left transition-colors ${
                        selectedPhenotype === p.id
                          ? 'bg-rose-500/20 border-rose-500/60 text-stone-100'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className="font-semibold text-stone-200">{p.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Somatic Toll Readout */}
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-5 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Live Somatic Toll & Hardware Engine
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-stone-400">Somatic Output Overdrive</span>
                    <span className="font-mono text-rose-400">{somaticOutputPower}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={somaticOutputPower}
                    onChange={(e) => setSomaticOutputPower(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                {/* Live Gauges */}
                <div className="space-y-3 border-t border-stone-800 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Core Body Temperature:</span>
                    <span className={`font-mono text-sm font-bold tabular-nums ${Number(currentTemp) > 105 ? 'text-rose-400' : 'text-stone-200'}`}>
                      {currentTemp}°F
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Thermal Pore-Steam Vent:</span>
                    <span className={`font-mono text-xs ${poreSteamActive ? 'text-amber-400 font-bold' : 'text-stone-500'}`}>
                      {poreSteamActive ? 'ACTIVE (Scalding Vapor Clouds)' : 'Inactive'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Arterial Backpressure:</span>
                    <span className={`font-mono text-sm font-bold tabular-nums ${scleralBleedRisk ? 'text-rose-400' : 'text-stone-200'}`}>
                      {hydraulicPressure} mmHg
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Lactic Vitrification Risk:</span>
                    <span className={`font-mono text-xs ${lacticRisk ? 'text-rose-500 font-bold' : 'text-emerald-400'}`}>
                      {lacticRisk ? 'HIGH (Muscular Calcification Imminent)' : 'Nominal'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400">Acoustic Tell / Kiai:</span>
                    <span className="text-[11px] font-mono text-stone-300">
                      {selectedVersion === 4 ? 'Absolute Silence (0 dB)' : selectedVersion === 2 ? 'Concussive Shockwave (135 dB)' : 'Atmospheric Disturbance'}
                    </span>
                  </div>
                </div>

                {/* Combat Visual Direction Card */}
                <div className="p-3 bg-stone-950 border border-stone-800 rounded text-xs space-y-1">
                  <div className="text-[10px] font-mono uppercase text-stone-500">Visual & Audio Signature</div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    {selectedVersion === 2
                      ? 'Heavy plumes of Sanguine-Crimson and Bruised Indigo snapping with kinetic static vent from shoulders. Movement punches vacuum-edges through air.'
                      : selectedVersion === 4
                      ? 'Target completely deletes presence from environment. Zero heat radiation, zero acoustic reflection, strikes land with zero pre-strike atmospheric pressure.'
                      : 'Skin-clinging boundary of translucent pressurized force distorting optical light.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
