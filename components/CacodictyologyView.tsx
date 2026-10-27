'use client';

import React, { useState } from 'react';
import { CACODICTYOLOGY_ROOTS, HierarchyItem, CacodictyologyRoot } from '@/lib/loreData';
import { Search, ShieldAlert, Sparkles, Network, Compass, ChevronRight } from 'lucide-react';

export const CacodictyologyView: React.FC = () => {
  const [selectedRootNum, setSelectedRootNum] = useState<number>(1);
  const [selectedHierarchyId, setSelectedHierarchyId] = useState<string>('caco-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('All');

  const selectedRoot = CACODICTYOLOGY_ROOTS.find((r) => r.rootNumber === selectedRootNum) || CACODICTYOLOGY_ROOTS[0];

  // Flatten all 144 hierarchies for global searching
  const allHierarchies = CACODICTYOLOGY_ROOTS.flatMap((r) => r.hierarchies);

  const filteredHierarchies = allHierarchies.filter((h) => {
    const matchesRoot = searchQuery ? true : h.rootNumber === selectedRootNum;
    const matchesTier = tierFilter === 'All' || h.threatTier === tierFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.domain.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q);
    return matchesRoot && matchesTier && matchesSearch;
  });

  const selectedHierarchy = allHierarchies.find((h) => h.id === selectedHierarchyId) || filteredHierarchies[0] || allHierarchies[0];

  const threatColor = (tier: HierarchyItem['threatTier']) => {
    switch (tier) {
      case 'Axiomatic': return 'text-purple-400 bg-purple-950/40 border-purple-800/50';
      case 'Cataclysmic': return 'text-rose-400 bg-rose-950/40 border-rose-800/50';
      case 'Prime': return 'text-amber-400 bg-amber-950/40 border-amber-800/50';
      case 'Cognitive': return 'text-sky-400 bg-sky-950/40 border-sky-800/50';
      default: return 'text-stone-400 bg-stone-900 border-stone-800';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden bg-stone-950 text-stone-200">
      {/* Column 1: The 12 Roots Directory */}
      <div className="w-full lg:w-72 flex flex-col border-r border-stone-800 bg-stone-950 shrink-0">
        <div className="p-4 border-b border-stone-800 space-y-1">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-500">
            The Cacodictyology Tree
          </div>
          <h2 className="text-sm font-serif font-bold text-stone-100">
            The 12 Negative Roots
          </h2>
          <p className="text-[11px] text-stone-500">
            144 Ontological Hierarchies of the Nethermost
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-stone-900">
          {CACODICTYOLOGY_ROOTS.map((root) => {
            const isSelected = selectedRootNum === root.rootNumber;
            return (
              <button
                key={root.rootNumber}
                onClick={() => {
                  setSelectedRootNum(root.rootNumber);
                  setSelectedHierarchyId(root.hierarchies[0].id);
                }}
                className={`w-full text-left p-3.5 transition-colors ${
                  isSelected
                    ? 'bg-stone-900 border-l-2 border-amber-500'
                    : 'hover:bg-stone-900/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 mb-0.5">
                  <span>{root.romanNumeral}</span>
                  <span>12 Hierarchies</span>
                </div>
                <div className="text-xs font-serif font-semibold text-stone-200 line-clamp-1">
                  {root.title}
                </div>
                <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                  {root.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Column 2: Hierarchies Grid & Search */}
      <div className="flex-1 flex flex-col border-r border-stone-800 bg-stone-950 overflow-hidden">
        <div className="p-4 border-b border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif font-bold text-stone-100">
              {searchQuery ? `Search Results (${filteredHierarchies.length})` : `${selectedRoot.romanNumeral}: ${selectedRoot.title}`}
            </h3>
            <span className="text-[11px] font-mono text-stone-500">
              {filteredHierarchies.length} items
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 144 hierarchies..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-md text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600"
              />
            </div>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-2 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded text-stone-300 focus:outline-none focus:border-amber-600"
            >
              <option value="All">All Threat Tiers</option>
              <option value="Axiomatic">Axiomatic</option>
              <option value="Cataclysmic">Cataclysmic</option>
              <option value="Prime">Prime</option>
              <option value="Cognitive">Cognitive</option>
              <option value="Subterranean">Subterranean</option>
            </select>
          </div>
        </div>

        {/* Hierarchies List */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredHierarchies.length === 0 ? (
            <div className="col-span-2 p-8 text-center text-xs text-stone-500">
              No hierarchies match the criteria.
            </div>
          ) : (
            filteredHierarchies.map((item) => {
              const isSelected = selectedHierarchy?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedHierarchyId(item.id)}
                  className={`p-3 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 border-amber-500/70 shadow-sm'
                      : 'bg-stone-900/30 border-stone-800/80 hover:bg-stone-900/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-stone-500">
                        #{item.number} · Root {item.rootNumber}
                      </span>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${threatColor(item.threatTier)}`}>
                        {item.threatTier}
                      </span>
                    </div>
                    <div className="text-xs font-serif font-bold text-stone-100">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-amber-500/80 font-mono">
                      {item.domain}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Column 3: Deep Hierarchy Inspector */}
      <div className="w-full lg:w-96 p-6 overflow-y-auto bg-stone-950 shrink-0 border-t lg:border-t-0 border-stone-800">
        {selectedHierarchy ? (
          <div className="space-y-5">
            <div className="border-b border-stone-800 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  Ontological Dossier #{selectedHierarchy.number}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${threatColor(selectedHierarchy.threatTier)}`}>
                  {selectedHierarchy.threatTier} Threat
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-stone-100">
                {selectedHierarchy.name}
              </h2>
              <div className="text-xs font-mono text-stone-400">
                Root {selectedHierarchy.rootNumber} Invariant
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="text-[10px] font-mono uppercase text-stone-500 mb-1">Domain & Vector</div>
                <div className="p-2.5 bg-stone-900 rounded border border-stone-800 font-mono text-amber-300">
                  {selectedHierarchy.domain}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-stone-500 mb-1">Phenomenological Description</div>
                <p className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 leading-relaxed">
                  {selectedHierarchy.description}
                </p>
              </div>

              <div>
                <div className="text-[10px] font-mono uppercase text-stone-500 mb-1">Cacodictyology Network Mechanics</div>
                <p className="text-stone-400 leading-relaxed text-[11px]">
                  Binds across the Bio-Manifold by exploiting mortal precognitive simulations. Category 5 Netherbound entities draw upon this specific hierarchy to anchor reality-warping outcomes and avoid Many-Worlds probability collapse.
                </p>
              </div>

              <div className="border-t border-stone-800 pt-3 space-y-2">
                <div className="text-[10px] font-mono uppercase text-stone-500">Ender-Trait Signature</div>
                <div className="text-[11px] text-stone-300 bg-stone-950 p-2.5 rounded border border-stone-800">
                  Does not engage in prolonged psychological torture; executes complete structural and soul erasure, leaving silent ruins.
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-stone-500 text-xs">
            Select a hierarchy to inspect its full ontological signature.
          </div>
        )}
      </div>
    </div>
  );
};
