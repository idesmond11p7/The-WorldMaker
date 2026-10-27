'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  LoreDocument,
  CanonStatus,
} from '@/lib/observatoryTypes';
import {
  exportLoreDocumentToMarkdown,
  triggerFileDownload,
} from '@/lib/observatoryStore';
import { CanonBadge } from './CanonBadge';
import {
  Library,
  Search,
  Download,
  Plus,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
} from 'lucide-react';

interface LoreLibraryViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onSaveLoreDocument: (doc: LoreDocument) => void;
}

export const LoreLibraryView: React.FC<LoreLibraryViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onSaveLoreDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [catFilter, setCatFilter] = useState<string>('ALL');
  const [showNewModal, setShowNewModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [kicker, setKicker] = useState('Cosmology & Mechanics');
  const [category, setCategory] = useState<LoreDocument['category']>('Cosmology');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [establishedText, setEstablishedText] = useState('');
  const [inferredText, setInferredText] = useState('');
  const [unresolvedText, setUnresolvedText] = useState('');
  const [canonStatus, setCanonStatus] = useState<CanonStatus>('Proposed');

  const categories = Array.from(new Set(state.loreDocuments.map((d) => d.category)));

  const filteredDocs = state.loreDocuments.filter((doc) => {
    const matchesCat = catFilter === 'ALL' || doc.category === catFilter;
    const matchesQuery =
      !searchQuery.trim() ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const selectedDoc =
    state.loreDocuments.find((d) => d.id === selectedRecordId) || filteredDocs[0];

  const handleExportMd = (doc: LoreDocument) => {
    const md = exportLoreDocumentToMarkdown(doc);
    triggerFileDownload(`${doc.id}.md`, md, 'text/markdown');
  };

  const handleCreateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const newDoc: LoreDocument = {
      id: `lore-${Date.now()}`,
      title: title.trim(),
      kicker: kicker.trim() || category,
      category,
      summary: summary.trim(),
      content: content.trim(),
      establishedFacts: establishedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      inferredPrinciples: inferredText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      unresolvedQuestions: unresolvedText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      canonStatus,
      sourceCitation: 'Observatory Lore Library Entry',
      provenanceNote: 'Authored in Lorekeeper’s Observatory with explicit epistemic separation.',
      tags: [category, canonStatus],
      createdAt: now,
      updatedAt: now,
    };
    onSaveLoreDocument(newDoc);
    onSelectRecord(newDoc.id);
    setTitle('');
    setSummary('');
    setContent('');
    setEstablishedText('');
    setInferredText('');
    setUnresolvedText('');
    setShowNewModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Top Filter & Action Bar */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Library className="w-4 h-4 text-[#D3B477]" />
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
          >
            <option value="ALL">All Lore Categories ({state.loreDocuments.length})</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#A4A6B5] absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search full lore codex..."
              className="pl-8 pr-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2] placeholder-[#A4A6B5] focus:outline-none focus:border-[#9A82E8]"
            />
          </div>

          {selectedDoc && (
            <button
              onClick={() => handleExportMd(selectedDoc)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#242633] hover:bg-[#353744] border border-[#353744] text-xs text-[#E9E1D2]"
            >
              <Download className="w-3.5 h-3.5 text-[#D3B477]" />
              <span>Export .MD</span>
            </button>
          )}

          <button
            onClick={() => setShowNewModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lore Document</span>
          </button>
        </div>
      </div>

      {/* Split Reader */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
          {filteredDocs.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => onSelectRecord(doc.id)}
                className={`w-full p-4 text-left transition-colors space-y-1.5 ${
                  isSelected ? 'bg-[#242633] border-l-2 border-l-[#D3B477]' : 'hover:bg-[#191B25]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#D3B477]">
                    {doc.category}
                  </span>
                  <CanonBadge status={doc.canonStatus} size="xs" />
                </div>
                <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{doc.title}</div>
                <p className="text-xs text-[#A4A6B5] line-clamp-2">{doc.summary}</p>
              </button>
            );
          })}
        </div>

        {selectedDoc && (
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="space-y-3 border-b border-[#353744] pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D3B477]">
                    {selectedDoc.category} · {selectedDoc.kicker}
                  </span>
                  <CanonBadge status={selectedDoc.canonStatus} size="sm" />
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#E9E1D2] leading-tight">
                  {selectedDoc.title}
                </h1>
                <p className="text-sm sm:text-base text-[#A4A6B5] leading-relaxed">
                  {selectedDoc.summary}
                </p>
                <div className="text-xs font-mono text-[#76D5E0]">
                  Provenance: {selectedDoc.sourceCitation}
                </div>
              </div>

              {/* Main Lore Body */}
              <div className="p-6 rounded-lg bg-[#191B25] border border-[#353744] text-sm text-[#E9E1D2] whitespace-pre-line leading-relaxed font-sans">
                {selectedDoc.content}
              </div>

              {/* Three-Column Epistemic Separation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Established */}
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#D3B477]/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Established Content</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#E9E1D2] leading-relaxed">
                    {selectedDoc.establishedFacts.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#D3B477] font-mono">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Inferred */}
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#76D5E0]/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                    <Lightbulb className="w-4 h-4 shrink-0" />
                    <span>Inferred Principles</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#E9E1D2] leading-relaxed">
                    {selectedDoc.inferredPrinciples.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#76D5E0] font-mono">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unresolved */}
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#F18A82]/50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F18A82]">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>Unresolved Questions</span>
                  </div>
                  <ul className="space-y-2 text-xs text-[#E9E1D2] leading-relaxed">
                    {selectedDoc.unresolvedQuestions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F18A82] font-mono">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Lore Document Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateDoc}
            className="w-full max-w-2xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-3 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Author New Canonical or Proposed Lore Document
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Document Title..."
                  className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
                />
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as LoreDocument['category'])}
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              >
                <option value="Cosmology">Cosmology</option>
                <option value="Magic & MWI">Magic &amp; MWI</option>
                <option value="Ki & Somatics">Ki &amp; Somatics</option>
                <option value="Cacodictyology">Cacodictyology</option>
                <option value="Realms & Sectors">Realms &amp; Sectors</option>
                <option value="Creative Philosophy">Creative Philosophy</option>
                <option value="Cognition & Astral">Cognition &amp; Astral</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={kicker}
                onChange={(e) => setKicker(e.target.value)}
                placeholder="Subtitle / Kicker..."
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <select
                value={canonStatus}
                onChange={(e) => setCanonStatus(e.target.value as CanonStatus)}
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              >
                <option value="Proposed">Proposed</option>
                <option value="Inferred">Inferred</option>
                <option value="Unresolved">Unresolved</option>
                <option value="Established">Established</option>
              </select>
            </div>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Executive Summary..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full Lore Documentation & Analysis..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <textarea
                rows={3}
                value={establishedText}
                onChange={(e) => setEstablishedText(e.target.value)}
                placeholder="Established Facts (one per line)..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#D3B477]/40 text-xs text-[#E9E1D2]"
              />
              <textarea
                rows={3}
                value={inferredText}
                onChange={(e) => setInferredText(e.target.value)}
                placeholder="Inferred Principles (one per line)..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#76D5E0]/40 text-xs text-[#E9E1D2]"
              />
              <textarea
                rows={3}
                value={unresolvedText}
                onChange={(e) => setUnresolvedText(e.target.value)}
                placeholder="Unresolved Questions (one per line)..."
                className="px-2.5 py-1.5 rounded bg-[#101117] border border-[#F18A82]/40 text-xs text-[#E9E1D2]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Save to Lore Library
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
