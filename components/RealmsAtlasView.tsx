'use client';

import React, { useState } from 'react';
import { UNDERWORLD_SECTORS, INVERTED_BEAST_MANIFOLDS } from '@/lib/loreData';
import { Swords, ShieldAlert, Skull } from 'lucide-react';

export const RealmsAtlasView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sectors' | 'beastManifolds' | 'coldWar'>('sectors');
  const [selectedRealmId, setSelectedRealmId] = useState<string>(UNDERWORLD_SECTORS[0].id);

  const selectedSector = UNDERWORLD_SECTORS.find((r) => r.id === selectedRealmId) || UNDERWORLD_SECTORS[0];

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-y-auto bg-stone-950 text-stone-200 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Dimensional Geography & Geopolitics
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-100 mt-1">
              Underworld Atlas & Beast Manifolds
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Catalog of infernal sovereign territories, geopolitical cold wars, and inverted predatory biospheres.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'sectors'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Mythic Sectors ({UNDERWORLD_SECTORS.length})
            </button>
            <button
              onClick={() => setActiveTab('beastManifolds')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'beastManifolds'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Inverted Beast Manifolds ({INVERTED_BEAST_MANIFOLDS.length})
            </button>
            <button
              onClick={() => setActiveTab('coldWar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'coldWar'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              The Great Cold War Matrix
            </button>
          </div>
        </div>

        {/* TAB 1: MYTHIC SECTORS */}
        {activeTab === 'sectors' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {UNDERWORLD_SECTORS.map((realm) => {
                const isSelected = selectedRealmId === realm.id;
                return (
                  <button
                    key={realm.id}
                    onClick={() => setSelectedRealmId(realm.id)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs transition-colors ${
                      isSelected
                        ? 'bg-stone-900 border-amber-500 shadow-sm'
                        : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:bg-stone-900'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-amber-500 uppercase tracking-wider mb-1">
                      {realm.sector}
                    </div>
                    <div className="font-serif font-bold text-stone-100 text-sm mb-1">
                      {realm.name}
                    </div>
                    <div className="text-[11px] text-stone-400 line-clamp-2">
                      {realm.loreContext}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-2 bg-stone-900/60 border border-stone-800 rounded-lg p-6 space-y-6">
              <div className="border-b border-stone-800 pb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-1">
                  {selectedSector.sector}
                </div>
                <h2 className="text-xl font-serif font-bold text-stone-100">
                  {selectedSector.name}
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  {selectedSector.loreContext}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                    Environmental Visuals & Spatial Layout
                  </h3>
                  <div className="p-3.5 bg-stone-950 border border-stone-800 rounded text-stone-300 leading-relaxed font-serif text-sm">
                    {selectedSector.visuals}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                    Dominant Demonic Castes & Entities
                  </h3>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded font-mono text-amber-300">
                    {selectedSector.dominantEntities}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
                    <span className="text-[10px] font-mono text-stone-500 uppercase">Acoustic Propagation</span>
                    <p className="text-[11px] text-stone-300">
                      Standard atmospheric displacement; acoustic dampening along basalt walls.
                    </p>
                  </div>
                  <div className="p-3 bg-stone-950 border border-stone-800 rounded space-y-1">
                    <span className="text-[10px] font-mono text-stone-500 uppercase">Possibility Resistance Threshold</span>
                    <p className="text-[11px] text-stone-300">
                      High timeline friction (PR ~0.72) due to ancient chthonic treaties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVERTED BEAST MANIFOLDS */}
        {activeTab === 'beastManifolds' && (
          <div className="space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-5">
              <h2 className="text-sm font-serif font-bold text-amber-400 uppercase tracking-wider mb-1">
                The Inverted Beast Manifolds: Predatory Mirror Biospheres
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                Tethered across the outer branches of the Void-Tree, these realms are inverted reflections of mortal fauna, populated by apex predatory demonic castes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INVERTED_BEAST_MANIFOLDS.map((bm) => (
                <div key={bm.id} className="p-5 bg-stone-900/60 border border-stone-800 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-base text-stone-100">{bm.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                      {bm.mirrorAnimal}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-500">Ruling Demon Caste</div>
                    <div className="text-xs font-mono text-amber-400 mt-0.5">{bm.rulingCaste}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-500">Inverted Environmental Nature</div>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      {bm.nature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: THE GREAT COLD WAR MATRIX */}
        {activeTab === 'coldWar' && (
          <div className="space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-5">
              <h2 className="text-sm font-serif font-bold text-amber-400 uppercase tracking-wider mb-1">
                The Global Geopolitical Balance: The Great Cold War
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                The underworld factions do not exist in harmony. They maintain an armed peace governed by treaties, judicial extradition agreements, and the shared dread of primordial uncreated horrors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-mono uppercase tracking-wider">
                  <Swords className="w-4 h-4" />
                  <span>Border Friction</span>
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-sm">
                  Solomonic-Hellenic Border Friction
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  The 72 Goetic Pillar Clans (Bael, Paimon, Asmodeus) constantly probe the borders of the House of Hades, attempting to annex soul-rights along the River Acheron and the River Phlegethon.
                </p>
                <div className="text-[10px] font-mono text-stone-500 border-t border-stone-800 pt-2">
                  Status: Active Skirmishes · Diplomatic Embargo
                </div>
              </div>

              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Judicial Accord</span>
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-sm">
                  The Diyu-Naraka Judicial Accord
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  The Ten Courts of Yanluo and Lord Yama’s Court in Yamaloka share an uneasy administrative treaty, cross-referencing records between Chitragupta’s Agrasamdhani and the Scrolls of Mount Fengdu to hunt escaped souls.
                </p>
                <div className="text-[10px] font-mono text-stone-500 border-t border-stone-800 pt-2">
                  Status: High Compliance · Mutual Extradition Pact
                </div>
              </div>

              <div className="p-5 bg-stone-900/60 border border-stone-800 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                  <Skull className="w-4 h-4" />
                  <span>Existential Wildcard</span>
                </div>
                <h3 className="font-serif font-bold text-stone-100 text-sm">
                  The Primordial Chaos Wildcards
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Apep (Egypt), Typhon’s Chained Brood (Greece), and the Mindless Horrors of Root I care nothing for treaties or courts. When their cosmic chains loosen, all civilized demon dynasties must mobilize joint shock-legions to prevent total annihilation into the Void.
                </p>
                <div className="text-[10px] font-mono text-stone-500 border-t border-stone-800 pt-2">
                  Status: Critical Monitoring · Defense Protocol Pre-Approved
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
