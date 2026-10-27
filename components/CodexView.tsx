'use client';

import React, { useState } from 'react';
import { LoreArticle } from '@/lib/loreData';
import { Search, BookOpen, Plus, CheckCircle2, HelpCircle, Compass, Sparkles, X } from 'lucide-react';

interface CodexViewProps {
  articles: LoreArticle[];
  onAddArticle: (article: LoreArticle) => void;
}

export const CodexView: React.FC<CodexViewProps> = ({ articles, onAddArticle }) => {
  const [selectedId, setSelectedId] = useState<string>(articles[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'essay' | 'canon' | 'inferred' | 'questions'>('essay');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Article Form State
  const [newTitle, setNewTitle] = useState('');
  const [newKicker, setNewKicker] = useState('');
  const [newCategory, setNewCategory] = useState<LoreArticle['category']>('Cosmology');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newCanonFact, setNewCanonFact] = useState('');
  const [newInferred, setNewInferred] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const categories = ['All', 'Cosmology', 'Magic & MWI', 'Ki & Somatics', 'Cacodictyology', 'Realms & Sectors', 'Creative Philosophy'];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = activeCategory === 'All' || art.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q)) ||
      art.content.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  const selectedArticle = articles.find((a) => a.id === selectedId) || filteredArticles[0] || articles[0];

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: LoreArticle = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      kicker: newKicker.trim() || 'Working Discovery',
      category: newCategory,
      summary: newSummary.trim() || newContent.slice(0, 140) + '...',
      content: newContent.trim(),
      sourceSection: 'Lorekeeper Working Session',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      establishedFacts: newCanonFact.trim() ? [newCanonFact.trim()] : ['Documented during studio working session.'],
      inferredPrinciples: newInferred.trim() ? [newInferred.trim()] : [],
      unresolvedQuestions: newQuestion.trim() ? [newQuestion.trim()] : []
    };

    onAddArticle(created);
    setSelectedId(created.id);
    setIsModalOpen(false);

    // Reset
    setNewTitle('');
    setNewKicker('');
    setNewSummary('');
    setNewContent('');
    setNewTags('');
    setNewCanonFact('');
    setNewInferred('');
    setNewQuestion('');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden bg-stone-950 text-stone-200">
      {/* Left Column: Index & Search */}
      <div className="w-full lg:w-96 flex flex-col border-r border-stone-800 bg-stone-950 shrink-0">
        <div className="p-4 border-b border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Living Ontological Codex
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded hover:bg-amber-500/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Lore</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, axioms, tags..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-900 border border-stone-800 rounded-md text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                  activeCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article List */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-900">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No matching lore records found.
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isSelected = selectedArticle?.id === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => setSelectedId(article.id)}
                  className={`w-full text-left p-4 transition-colors ${
                    isSelected
                      ? 'bg-stone-900/90 border-l-2 border-amber-500'
                      : 'hover:bg-stone-900/40'
                  }`}
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-500/90 mb-1">
                    {article.kicker}
                  </div>
                  <h3 className="text-sm font-serif font-semibold text-stone-100 line-clamp-1 mb-1">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-stone-500 font-mono">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.tags.slice(0, 2).join(', ')}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Editorial Reading Room */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-stone-950">
        {selectedArticle ? (
          <article className="max-w-3xl mx-auto space-y-6">
            {/* Header Lockup */}
            <header className="border-b border-stone-800 pb-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
                <span>{selectedArticle.category}</span>
                <span aria-hidden="true">/</span>
                <span>{selectedArticle.kicker}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-stone-100 tracking-tight leading-snug">
                {selectedArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400">
                <span className="font-mono text-stone-500">Source:</span>
                <span className="text-stone-300 font-serif italic">{selectedArticle.sourceSection}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.tags.map((t) => `#${t}`).join(' ')}</span>
              </div>
            </header>

            {/* Analysis Discipline Switcher */}
            <div className="flex items-center gap-1 border-b border-stone-800/80 pb-2">
              <button
                onClick={() => setActiveTab('essay')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'essay'
                    ? 'bg-stone-900 text-stone-100 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Comprehensive Text
              </button>
              <button
                onClick={() => setActiveTab('canon')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'canon'
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Established Canon ({selectedArticle.establishedFacts.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('inferred')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'inferred'
                    ? 'bg-amber-950/40 text-amber-300 border border-amber-800/50'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Inferred Principles ({selectedArticle.inferredPrinciples.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  activeTab === 'questions'
                    ? 'bg-sky-950/40 text-sky-300 border border-sky-800/50'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>Unresolved Tensions ({selectedArticle.unresolvedQuestions.length})</span>
              </button>
            </div>

            {/* Content Display based on Tab */}
            {activeTab === 'essay' && (
              <div className="prose prose-invert prose-stone max-w-none text-stone-300 leading-relaxed text-sm lg:text-base space-y-4 whitespace-pre-line">
                {selectedArticle.content}
              </div>
            )}

            {activeTab === 'canon' && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Established Canon: Primary Source Direct Evidence
                </div>
                <div className="divide-y divide-stone-900 border border-stone-800 rounded-lg bg-stone-900/20">
                  {selectedArticle.establishedFacts.map((fact, i) => (
                    <div key={i} className="p-3.5 flex items-start gap-3">
                      <span className="text-emerald-500 font-mono text-xs mt-0.5">0{i + 1}.</span>
                      <p className="text-xs lg:text-sm text-stone-200 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'inferred' && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                  Inferred Principles: Creative Logic & Mechanics
                </div>
                <div className="divide-y divide-stone-900 border border-stone-800 rounded-lg bg-stone-900/20">
                  {selectedArticle.inferredPrinciples.map((principle, i) => (
                    <div key={i} className="p-3.5 flex items-start gap-3">
                      <span className="text-amber-500 font-mono text-xs mt-0.5">0{i + 1}.</span>
                      <p className="text-xs lg:text-sm text-stone-200 leading-relaxed">{principle}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Unresolved Questions: Open Creative Frontiers
                </div>
                <div className="divide-y divide-stone-900 border border-stone-800 rounded-lg bg-stone-900/20">
                  {selectedArticle.unresolvedQuestions.map((q, i) => (
                    <div key={i} className="p-3.5 flex items-start gap-3">
                      <span className="text-sky-500 font-mono text-xs mt-0.5">0{i + 1}.</span>
                      <p className="text-xs lg:text-sm text-stone-200 leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-stone-500 space-y-2">
            <BookOpen className="w-8 h-8 stroke-[1.5]" />
            <p className="text-sm">Select an article from the index to begin reading.</p>
          </div>
        )}
      </div>

      {/* New Lore Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-stone-900 border border-stone-700 rounded-lg shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-serif font-bold text-stone-100">Record Lore Discovery</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-medium mb-1">Concept Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Decanic Vector Resonance"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 font-medium mb-1">Subheading / Kicker</label>
                  <input
                    type="text"
                    value={newKicker}
                    onChange={(e) => setNewKicker(e.target.value)}
                    placeholder="e.g. Astro-Thaumaturgical Mechanics"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-medium mb-1">Ontological Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 font-medium mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="e.g. Decans, Horoscopic, Sabian"
                    className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-medium mb-1">Executive Summary</label>
                <input
                  type="text"
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="One sentence core summary..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-stone-400 font-medium mb-1">Full Text & Mechanics</label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Document the deep mechanics, equations, mythic roots, and interactions..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600 font-mono text-[11px]"
                />
              </div>

              <div className="space-y-2 border-t border-stone-800 pt-3">
                <div className="text-[11px] font-mono text-stone-400">Analysis Categorization</div>
                <input
                  type="text"
                  value={newCanonFact}
                  onChange={(e) => setNewCanonFact(e.target.value)}
                  placeholder="Established Canon Fact: What is directly proven..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
                <input
                  type="text"
                  value={newInferred}
                  onChange={(e) => setNewInferred(e.target.value)}
                  placeholder="Inferred Principle: Underlying design logic..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Unresolved Question: What remains to be investigated..."
                  className="w-full p-2 bg-stone-950 border border-stone-800 rounded text-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 bg-stone-800 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-stone-950 bg-amber-500 rounded hover:bg-amber-400 transition-colors"
                >
                  Save to Living Codex
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
