'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  ResearchRecord,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  BookOpen,
  Plus,
  Quote,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface ResearchDeskViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onAddResearchRecord: (rec: ResearchRecord) => void;
}

export const ResearchDeskView: React.FC<ResearchDeskViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onAddResearchRecord,
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [claim, setClaim] = useState('');
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceAuthor, setSourceAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [findings, setFindings] = useState('');
  const [inVerseTranslation, setInVerseTranslation] = useState('');

  const selectedResearch =
    state.researchRecords.find((r) => r.id === selectedRecordId) ||
    state.researchRecords[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const now = new Date().toISOString();
    const rec: ResearchRecord = {
      id: `res-${Date.now()}`,
      title: title.trim(),
      summary: inVerseTranslation.trim() || findings.trim().slice(0, 140),
      researchQuestion: question.trim(),
      claimInvestigated: claim.trim(),
      sourceTitle: sourceTitle.trim() || 'Primary Historical / Scientific Source',
      sourceAuthorOrTradition: sourceAuthor.trim() || 'Academic / Esoteric Tradition',
      sourceDateOrEra: 'Historical / Modern',
      sourceUrlOrReference: 'Observatory Research Desk Archive',
      verbatimExcerptOrPrinciple: excerpt.trim(),
      analyticalFindings: findings.trim(),
      confidenceAndLimitations: 'Verified primary source correlation.',
      supportingSources: [],
      contradictingOrAlternativeViews: [],
      inVerseTranslation: inVerseTranslation.trim(),
      canonStatus: 'Inferred',
      tags: ['Research', sourceAuthor.trim()].filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    onAddResearchRecord(rec);
    onSelectRecord(rec.id);
    setTitle('');
    setQuestion('');
    setFindings('');
    setInVerseTranslation('');
    setShowNewModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#76D5E0]" />
          <h1 className="text-sm font-serif font-semibold text-[#E9E1D2]">
            Research Desk — Real-World Physics, Evolutionary Biology &amp; Occult Grimoire Grounding (
            {state.researchRecords.length})
          </h1>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#76D5E0] text-[#101117] font-semibold text-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Research Dossier</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-96 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
          {state.researchRecords.map((res) => {
            const isSelected = selectedResearch?.id === res.id;
            return (
              <button
                key={res.id}
                onClick={() => onSelectRecord(res.id)}
                className={`w-full p-4 text-left transition-colors space-y-1.5 ${
                  isSelected ? 'bg-[#242633] border-l-2 border-l-[#76D5E0]' : 'hover:bg-[#191B25]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#76D5E0] truncate">
                    {res.sourceAuthorOrTradition}
                  </span>
                  <CanonBadge status={res.canonStatus} size="xs" />
                </div>
                <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{res.title}</div>
                <p className="text-xs text-[#A4A6B5] line-clamp-2">{res.summary}</p>
              </button>
            );
          })}
        </div>

        {selectedResearch && (
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <div className="space-y-2 border-b border-[#353744] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                  {selectedResearch.sourceAuthorOrTradition} · {selectedResearch.sourceDateOrEra}
                </span>
                <CanonBadge status={selectedResearch.canonStatus} size="sm" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                {selectedResearch.title}
              </h2>
              <div className="text-xs font-mono text-[#D3B477]">
                Primary Source: {selectedResearch.sourceTitle} ({selectedResearch.sourceUrlOrReference})
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                  Research Question
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedResearch.researchQuestion}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                  Claim / Hypothesis Investigated
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedResearch.claimInvestigated}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#D3B477]/40 space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D3B477]">
                  <Quote className="w-4 h-4" />
                  <span>Verbatim Principle / Historical Excerpt</span>
                </div>
                <blockquote className="text-sm font-serif italic text-[#E9E1D2] border-l-2 border-[#D3B477] pl-4">
                  &ldquo;{selectedResearch.verbatimExcerptOrPrinciple}&rdquo;
                </blockquote>
              </div>

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#76D5E0]">
                  <Scale className="w-4 h-4" />
                  <span>Analytical Findings &amp; Confidence</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedResearch.analyticalFindings}
                </p>
                <div className="text-xs font-mono text-[#A4A6B5] pt-2">
                  Confidence &amp; Limitations: {selectedResearch.confidenceAndLimitations}
                </div>
              </div>

              {selectedResearch.supportingSources.length > 0 && (
                <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#76D5E0]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Supporting Sources</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[#E9E1D2]">
                    {selectedResearch.supportingSources.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedResearch.contradictingOrAlternativeViews.length > 0 && (
                <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#F18A82]">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Contradicting / Alternative Models</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[#E9E1D2]">
                    {selectedResearch.contradictingOrAlternativeViews.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/60 space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  <Sparkles className="w-4 h-4" />
                  <span>Direct Ur-Worlds / ForeverWorlds In-Verse Translation</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                  {selectedResearch.inVerseTranslation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-xl bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-3 shadow-2xl"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Create Structured Research Record
            </h3>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Research Title..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                placeholder="Source Title / Grimoire / Paper..."
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
              <input
                type="text"
                value={sourceAuthor}
                onChange={(e) => setSourceAuthor(e.target.value)}
                placeholder="Author or Tradition..."
                className="px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
              />
            </div>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Research Question..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Key Principle or Excerpt..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              required
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              placeholder="Analytical Findings..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              required
              value={inVerseTranslation}
              onChange={(e) => setInVerseTranslation(e.target.value)}
              placeholder="How this translates into Ur-Worlds mechanics..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
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
                className="px-4 py-1.5 rounded bg-[#76D5E0] text-[#101117] font-semibold text-xs"
              >
                Save Research Record
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
