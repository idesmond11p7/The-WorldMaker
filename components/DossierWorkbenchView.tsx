'use client';

import React, { useState } from 'react';
import { DossierRecord } from '@/lib/loreData';
import { Plus, Search, Layers, Box, Volume2, Shield, Sparkles, X, Check } from 'lucide-react';

interface DossierWorkbenchViewProps {
  dossiers: DossierRecord[];
  onAddDossier: (dossier: DossierRecord) => void;
}

export const DossierWorkbenchView: React.FC<DossierWorkbenchViewProps> = ({
  dossiers,
  onAddDossier
}) => {
  const [selectedId, setSelectedId] = useState<string>(dossiers[0]?.id || '');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Dossier Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<DossierRecord['type']>('Character');
  const [categoryTier, setCategoryTier] = useState<DossierRecord['categoryTier']>('Category 4');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [visualDirection, setVisualDirection] = useState('');
  const [soundDesignNotes, setSoundDesignNotes] = useState('');
  const [production3DNotes, setProduction3DNotes] = useState('');
  const [associatedFuelOrKi, setAssociatedFuelOrKi] = useState('');
  const [possibilityResistanceTier, setPossibilityResistanceTier] = useState('');
  const [tags, setTags] = useState('');

  const types = ['All', 'Character', 'Creature', 'Artifact', '3D Production Spec'];

  const filteredDossiers = dossiers.filter((d) => {
    const matchesType = typeFilter === 'All' || d.type === typeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q));
    return matchesType && matchesSearch;
  });

  const selectedDossier = dossiers.find((d) => d.id === selectedId) || filteredDossiers[0] || dossiers[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newRecord: DossierRecord = {
      id: `dossier-${Date.now()}`,
      title: title.trim(),
      type,
      categoryTier,
      summary: summary.trim() || description.slice(0, 120) + '...',
      description: description.trim(),
      visualDirection: visualDirection.trim() || 'Visual direction pending review.',
      soundDesignNotes: soundDesignNotes.trim() || 'Sound design profile pending review.',
      production3DNotes: production3DNotes.trim() || '3D production target: standard LOD0 hero asset.',
      associatedFuelOrKi: associatedFuelOrKi.trim() || 'Unassigned',
      possibilityResistanceTier: possibilityResistanceTier.trim() || 'Standard (0.20 Delta)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    onAddDossier(newRecord);
    setSelectedId(newRecord.id);
    setIsModalOpen(false);

    // Reset Form
    setTitle('');
    setSummary('');
    setDescription('');
    setVisualDirection('');
    setSoundDesignNotes('');
    setProduction3DNotes('');
    setAssociatedFuelOrKi('');
    setPossibilityResistanceTier('');
    setTags('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden bg-stone-950 text-stone-200">
      {/* Column 1: Dossiers Ledger */}
      <div className="w-full lg:w-96 flex flex-col border-r border-stone-800 bg-stone-950 shrink-0">
        <div className="p-4 border-b border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500">
              Creative Production Ledger
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded hover:bg-amber-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Dossier</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search characters, creatures, specs..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-900 border border-stone-800 rounded-md text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600"
            />
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap gap-1">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                  typeFilter === t
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Dossiers List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-900">
          {filteredDossiers.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No matching production dossiers.
            </div>
          ) : (
            filteredDossiers.map((dossier) => {
              const isSelected = selectedDossier?.id === dossier.id;
              return (
                <button
                  key={dossier.id}
                  onClick={() => setSelectedId(dossier.id)}
                  className={`w-full text-left p-4 transition-colors ${
                    isSelected
                      ? 'bg-stone-900/90 border-l-2 border-amber-500'
                      : 'hover:bg-stone-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-amber-500 uppercase">{dossier.type}</span>
                    <span className="text-stone-500">{dossier.categoryTier}</span>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-stone-100 line-clamp-1 mb-1">
                    {dossier.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {dossier.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-stone-500">
                    <span>{dossier.associatedFuelOrKi}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Column 2: Deep Production Inspector */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-stone-950">
        {selectedDossier ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <header className="border-b border-stone-800 pb-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
                  {selectedDossier.type} · {selectedDossier.categoryTier}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  Updated: {new Date(selectedDossier.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-100">
                {selectedDossier.title}
              </h1>
              <p className="text-xs lg:text-sm text-stone-300 font-serif italic leading-relaxed">
                {selectedDossier.summary}
              </p>
            </header>

            {/* Mechanics & Lore Description */}
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-stone-400">
                Concept & In-World Mechanics
              </div>
              <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-lg text-xs lg:text-sm text-stone-300 leading-relaxed whitespace-pre-line font-serif">
                {selectedDossier.description}
              </div>
            </div>

            {/* Disciplines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Visual Direction */}
              <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Visual Direction & Silhouette</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {selectedDossier.visualDirection}
                </p>
              </div>

              {/* Sound Design */}
              <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
                  <Volume2 className="w-4 h-4" />
                  <span>Sound Design & Game Feel</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {selectedDossier.soundDesignNotes}
                </p>
              </div>

              {/* 3D Production Spec */}
              <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-rose-400">
                  <Box className="w-4 h-4" />
                  <span>3D Production & Engine Spec</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-mono text-[11px]">
                  {selectedDossier.production3DNotes}
                </p>
              </div>

              {/* Power Systems Integration */}
              <div className="p-4 bg-stone-900/50 border border-stone-800 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
                  <Shield className="w-4 h-4" />
                  <span>Power System Integration</span>
                </div>
                <div className="text-xs text-stone-300 space-y-1 font-mono text-[11px]">
                  <div><span className="text-stone-500">Fuel / Ki:</span> {selectedDossier.associatedFuelOrKi}</div>
                  <div><span className="text-stone-500">Possibility Resistance:</span> {selectedDossier.possibilityResistanceTier}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-800 pt-4 flex flex-wrap gap-1.5">
              {selectedDossier.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono text-stone-400 bg-stone-900 px-2 py-1 rounded border border-stone-800">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-stone-500 text-xs">
            Select a dossier to inspect full production specifications.
          </div>
        )}
      </div>

      {/* Create New Dossier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <h2 className="text-sm font-serif font-bold text-stone-100">
                New Production Dossier
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Title / Codename</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Asura Dual-Blade Shock-Vanguard"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Character">Character</option>
                    <option value="Creature">Creature</option>
                    <option value="Artifact">Artifact</option>
                    <option value="3D Production Spec">3D Production Spec</option>
                    <option value="Custom Lore">Custom Lore</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Category Tier</label>
                  <select
                    value={categoryTier}
                    onChange={(e) => setCategoryTier(e.target.value as any)}
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  >
                    <option value="Category 3">Category 3 (Precognitive / No Emotion)</option>
                    <option value="Category 4">Category 4 (Emotional Mortal / Human)</option>
                    <option value="Category 5">Category 5 (Netherbound / Advanced)</option>
                    <option value="Category 7">Category 7 (Axiomarchical Authority)</option>
                    <option value="Artifact">Artifact / Relic</option>
                    <option value="Environment">Environment / Sector</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g. Asura, Maharaurava, Dual-Blade"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Summary (One Line)</label>
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Concise high-level summary..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Detailed Mechanics & Narrative</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe abilities, combat behavior, and lore connections..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Visual Direction</label>
                  <textarea
                    rows={2}
                    value={visualDirection}
                    onChange={(e) => setVisualDirection(e.target.value)}
                    placeholder="Silhouette, color cues, textures..."
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Sound Design & Game Feel</label>
                  <textarea
                    rows={2}
                    value={soundDesignNotes}
                    onChange={(e) => setSoundDesignNotes(e.target.value)}
                    placeholder="Acoustic tells, sub-bass, vacuum cuts..."
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">3D Production Spec</label>
                  <input
                    type="text"
                    value={production3DNotes}
                    onChange={(e) => setProduction3DNotes(e.target.value)}
                    placeholder="e.g. Poly budget: 50k tris, PBR 4K, SSS shader"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1 font-medium">Associated Fuel or Ki Variant</label>
                  <input
                    type="text"
                    value={associatedFuelOrKi}
                    onChange={(e) => setAssociatedFuelOrKi(e.target.value)}
                    placeholder="e.g. Ara-Ki + Kalakuta Bile"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-stone-400 hover:text-stone-200 bg-stone-800 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-stone-950 bg-amber-500 rounded hover:bg-amber-400"
                >
                  Save Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
