'use client';

import React, { useState } from 'react';
import { VISUAL_ASSETS, VisualAsset } from '@/lib/visualAssets';
import { Maximize2, X, Palette, Box, Sparkles, Layers } from 'lucide-react';

export const VisualBoardView: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<VisualAsset | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Environment', 'Character / Somatics', 'Artifact / Seal', 'Inverted Realm'];

  const filtered = VISUAL_ASSETS.filter((a) => filterCategory === 'All' || a.category === filterCategory);

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] overflow-y-auto bg-stone-950 text-stone-200 p-6 lg:p-8">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Visual Direction & Concept Art
            </div>
            <h1 className="text-2xl font-serif font-bold text-stone-100 mt-1">
              Visual Reference Boards
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Curated artwork establishing lighting, color palettes, silhouette discipline, and 3D shader targets.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 p-1 bg-stone-900 border border-stone-800 rounded-lg shrink-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  filterCategory === c
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="bg-stone-900/50 border border-stone-800 rounded-lg overflow-hidden flex flex-col group hover:border-stone-700 transition-colors"
            >
              {/* Image Container with Styled Fallback */}
              <div className="relative aspect-video bg-stone-950 overflow-hidden cursor-pointer" onClick={() => setSelectedAsset(asset)}>
                <img
                  src={asset.src}
                  alt={asset.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAsset(asset);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-stone-900/80 hover:bg-stone-800 text-stone-200 rounded-md backdrop-blur-sm transition-colors"
                  title="Inspect Full Image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    {asset.category}
                  </span>
                  <h3 className="text-base font-serif font-bold text-stone-100">
                    {asset.title}
                  </h3>
                </div>
              </div>

              {/* Curatorial Breakdown */}
              <div className="p-5 space-y-4 text-xs flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Palette Swatches */}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-500 mb-1.5 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-amber-400" />
                      <span>Color Palette Tokens</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {asset.colorPalette.map((col) => (
                        <div key={col.name} className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded border border-stone-800 text-[10px] font-mono">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="text-stone-300">{col.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase text-stone-500 mb-1">In-World Grounding</div>
                    <p className="text-stone-300 leading-relaxed font-serif text-[11px]">
                      {asset.inWorldGrounding}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-800">
                  <div className="text-[10px] font-mono uppercase text-stone-500 mb-1 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-sky-400" />
                    <span>3D Production & Shader Directive</span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-400">
                    {asset.production3DNotes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-4xl bg-stone-900 border border-stone-700 rounded-lg shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-950">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-amber-500">
                  {selectedAsset.category}
                </span>
                <h2 className="text-sm font-serif font-bold text-stone-100">
                  {selectedAsset.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-5">
              <div className="rounded-lg overflow-hidden border border-stone-800 bg-stone-950 max-h-[460px] flex items-center justify-center">
                <img
                  src={selectedAsset.src}
                  alt={selectedAsset.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[460px] w-auto object-contain"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 p-3 bg-stone-950 rounded border border-stone-800">
                  <div className="font-mono text-amber-400 text-[10px] uppercase">Composition & Framing</div>
                  <p className="text-stone-300 leading-relaxed">{selectedAsset.composition}</p>
                </div>
                <div className="space-y-2 p-3 bg-stone-950 rounded border border-stone-800">
                  <div className="font-mono text-sky-400 text-[10px] uppercase">Lighting & Volumetric Atmosphere</div>
                  <p className="text-stone-300 leading-relaxed">{selectedAsset.lightingAndAtmosphere}</p>
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded border border-stone-800 space-y-1.5 text-xs">
                <div className="font-mono text-stone-400 text-[10px] uppercase">Prompt Blueprint</div>
                <p className="font-mono text-[11px] text-stone-300 leading-relaxed bg-stone-900 p-2.5 rounded">
                  {selectedAsset.prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
