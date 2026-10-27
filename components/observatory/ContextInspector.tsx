'use client';

import React, { useState } from 'react';
import {
  ObservatoryWorkspaceState,
  CanonStatus,
  RelationType,
  RecordCollectionType,
  WorkspaceId,
} from '@/lib/observatoryTypes';
import { findRecordAcrossState, listAllRecordsWithTypes } from '@/lib/observatoryStore';
import { CanonBadge } from './CanonBadge';
import {
  PanelRightClose,
  Link2,
  Plus,
  History,
  Tag as TagIcon,
  ShieldCheck,
  Trash2,
  ExternalLink,
  AlertTriangle,
  FileText,
} from 'lucide-react';

interface ContextInspectorProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onClose: () => void;
  onSelectRecord: (id: string, targetWorkspace?: WorkspaceId) => void;
  onUpdateStatus: (recordId: string, newStatus: CanonStatus, reason: string) => void;
  onAddRelationship: (
    sourceId: string,
    targetId: string,
    relationType: RelationType,
    notes: string
  ) => void;
  onDeleteRelationship: (relId: string) => void;
  onAddTagToRecord: (recordId: string, tag: string) => void;
}

const RELATION_TYPES: RelationType[] = [
  'Contains',
  'Located within',
  'Connected to',
  'Governed by',
  'Originates from',
  'Associated with',
  'Opposed to',
  'Depends upon',
  'Transcends',
];

const TYPE_TO_WORKSPACE: Record<RecordCollectionType, WorkspaceId> = {
  project: 'observatory',
  lore: 'lore-library',
  location: 'world-atlas',
  faction: 'world-atlas',
  entity: 'entities',
  powerSystem: 'power-forge',
  ability: 'power-forge',
  powerInteraction: 'power-forge',
  visualReference: 'visual-studio',
  designBoard: 'visual-studio',
  effectsSequence: 'visual-studio',
  idea: 'idea-constellation',
  research: 'research-desk',
};

export const ContextInspector: React.FC<ContextInspectorProps> = ({
  state,
  selectedRecordId,
  onClose,
  onSelectRecord,
  onUpdateStatus,
  onAddRelationship,
  onDeleteRelationship,
  onAddTagToRecord,
}) => {
  const [statusReason, setStatusReason] = useState('');
  const [pendingStatus, setPendingStatus] = useState<CanonStatus | null>(null);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [targetId, setTargetId] = useState('');
  const [relationType, setRelationType] = useState<RelationType>('Connected to');
  const [relNotes, setRelNotes] = useState('');
  const [newTagInput, setNewTagInput] = useState('');

  const found = selectedRecordId ? findRecordAcrossState(state, selectedRecordId) : null;
  const allRecords = listAllRecordsWithTypes(state);

  if (!found) {
    return (
      <aside className="w-80 bg-[#191B25] border-l border-[#353744] flex flex-col h-full shrink-0 select-none">
        <div className="h-12 px-4 border-b border-[#353744] flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A4A6B5]">
            Context Inspector
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#242633] text-[#A4A6B5] hover:text-[#E9E1D2] transition-colors"
            title="Collapse Inspector"
          >
            <PanelRightClose className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
          <FileText className="w-8 h-8 text-[#353744] mb-3" />
          <p className="text-sm font-serif text-[#E9E1D2] mb-1">No Active Record Selected</p>
          <p className="text-xs text-[#A4A6B5] leading-relaxed">
            Select any realm, entity, power system, ability, visual reference, idea, or lore document to inspect its canon authority, relationships, provenance, and revision history.
          </p>
        </div>
      </aside>
    );
  }

  const { record, type } = found;
  const linkedRelationships = state.relationships.filter(
    (r) => r.sourceId === record.id || r.targetId === record.id
  );
  const recordRevisions = state.revisions.filter((r) => r.recordId === record.id);

  // Check if promoting to Established has any conflicting titles
  const potentialConflicts =
    pendingStatus === 'Established'
      ? allRecords.filter(
          (r) =>
            r.record.id !== record.id &&
            r.record.canonStatus === 'Established' &&
            r.record.title.toLowerCase() === record.title.toLowerCase()
        )
      : [];

  return (
    <aside className="w-84 bg-[#191B25] border-l border-[#353744] flex flex-col h-full shrink-0 overflow-hidden">
      {/* Header */}
      <div className="h-12 px-4 border-b border-[#353744] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#76D5E0] truncate">
            Inspector · {type}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded hover:bg-[#242633] text-[#A4A6B5] hover:text-[#E9E1D2] transition-colors"
          title="Collapse Inspector"
        >
          <PanelRightClose className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Inspector Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Title & ID */}
        <div className="space-y-2 pb-4 border-b border-[#353744]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] text-[#A4A6B5] bg-[#101117] px-2 py-0.5 rounded border border-[#353744]">
              ID: {record.id}
            </span>
            <CanonBadge status={record.canonStatus} size="xs" />
          </div>
          <h3 className="text-base font-serif font-semibold text-[#E9E1D2] leading-snug">
            {record.title}
          </h3>
          <p className="text-[#A4A6B5] leading-relaxed">{record.summary}</p>
          {record.sourceCitation && (
            <div className="pt-1 text-[11px] font-mono text-[#D3B477]/90">
              Source: {record.sourceCitation}
            </div>
          )}
        </div>

        {/* Canon Authority Governance */}
        <div className="space-y-2.5 pb-4 border-b border-[#353744]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#D3B477]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Canon Authority State</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(['Established', 'Proposed', 'Inferred', 'Unresolved', 'Retired'] as CanonStatus[]).map(
              (st) => {
                const isCurrent = record.canonStatus === st;
                const isSelected = pendingStatus === st;
                return (
                  <button
                    key={st}
                    onClick={() => setPendingStatus(st === record.canonStatus ? null : st)}
                    className={`px-2 py-1.5 rounded text-[11px] font-mono border text-center transition-all ${
                      isCurrent
                        ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2] font-semibold'
                        : isSelected
                        ? 'bg-[#9A82E8]/20 border-[#9A82E8] text-[#E9E1D2]'
                        : 'bg-[#101117] border-[#353744] text-[#A4A6B5] hover:text-[#E9E1D2] hover:border-[#A4A6B5]'
                    }`}
                  >
                    {st}
                  </button>
                );
              }
            )}
          </div>

          {pendingStatus && pendingStatus !== record.canonStatus && (
            <div className="p-3 rounded bg-[#101117] border border-[#9A82E8]/50 space-y-2 mt-2">
              <div className="text-[11px] text-[#E9E1D2]">
                Transition <span className="font-mono text-[#A4A6B5]">{record.canonStatus}</span> →{' '}
                <span className="font-mono text-[#9A82E8]">{pendingStatus}</span>
              </div>
              {potentialConflicts.length > 0 && (
                <div className="p-2 rounded bg-[#F18A82]/10 border border-[#F18A82]/40 text-[#F18A82] flex items-start gap-1.5 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    Conflict check: Another Established record shares this title. Verify before promoting.
                  </span>
                </div>
              )}
              <input
                type="text"
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="Revision note / justification..."
                className="w-full px-2.5 py-1.5 rounded bg-[#191B25] border border-[#353744] text-[#E9E1D2] placeholder-[#A4A6B5]/50 text-xs focus:outline-none focus:border-[#9A82E8]"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setPendingStatus(null);
                    setStatusReason('');
                  }}
                  className="px-2 py-1 text-[11px] text-[#A4A6B5] hover:text-[#E9E1D2]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(
                      record.id,
                      pendingStatus,
                      statusReason.trim() || `Changed status to ${pendingStatus}`
                    );
                    setPendingStatus(null);
                    setStatusReason('');
                  }}
                  className="px-2.5 py-1 rounded bg-[#9A82E8] text-[#101117] font-semibold text-[11px] hover:opacity-90"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Connected Relationships */}
        <div className="space-y-2.5 pb-4 border-b border-[#353744]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#76D5E0]">
              <Link2 className="w-3.5 h-3.5" />
              <span>Connected Records ({linkedRelationships.length})</span>
            </div>
            <button
              onClick={() => setShowLinkForm(!showLinkForm)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#242633] hover:bg-[#9A82E8]/20 text-[#E9E1D2] border border-[#353744] text-[11px]"
            >
              <Plus className="w-3 h-3" />
              <span>Link</span>
            </button>
          </div>

          {showLinkForm && (
            <div className="p-3 rounded bg-[#101117] border border-[#353744] space-y-2">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Relationship Type
                </label>
                <select
                  value={relationType}
                  onChange={(e) => setRelationType(e.target.value as RelationType)}
                  className="w-full px-2 py-1.5 rounded bg-[#191B25] border border-[#353744] text-[#E9E1D2] text-xs"
                >
                  {RELATION_TYPES.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#A4A6B5] mb-1">
                  Target Record
                </label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="w-full px-2 py-1.5 rounded bg-[#191B25] border border-[#353744] text-[#E9E1D2] text-xs"
                >
                  <option value="">Select a record...</option>
                  {allRecords
                    .filter((item) => item.record.id !== record.id)
                    .map((item) => (
                      <option key={item.record.id} value={item.record.id}>
                        [{item.typeLabel}] {item.record.title}
                      </option>
                    ))}
                </select>
              </div>
              <input
                type="text"
                value={relNotes}
                onChange={(e) => setRelNotes(e.target.value)}
                placeholder="Context note for this link..."
                className="w-full px-2 py-1.5 rounded bg-[#191B25] border border-[#353744] text-[#E9E1D2] text-xs"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setShowLinkForm(false)}
                  className="px-2 py-1 text-[11px] text-[#A4A6B5]"
                >
                  Cancel
                </button>
                <button
                  disabled={!targetId}
                  onClick={() => {
                    if (!targetId) return;
                    onAddRelationship(record.id, targetId, relationType, relNotes.trim());
                    setTargetId('');
                    setRelNotes('');
                    setShowLinkForm(false);
                  }}
                  className="px-2.5 py-1 rounded bg-[#76D5E0] text-[#101117] font-semibold text-[11px] disabled:opacity-40"
                >
                  Create Link
                </button>
              </div>
            </div>
          )}

          {linkedRelationships.length === 0 ? (
            <p className="text-[11px] text-[#A4A6B5] italic">
              No semantic links yet. Click + Link to connect this record across the Observatory.
            </p>
          ) : (
            <div className="space-y-2">
              {linkedRelationships.map((rel) => {
                const isOutgoing = rel.sourceId === record.id;
                const otherId = isOutgoing ? rel.targetId : rel.sourceId;
                const otherTitle = isOutgoing ? rel.targetTitle : rel.sourceTitle;
                const otherType = isOutgoing ? rel.targetType : rel.sourceType;
                return (
                  <div
                    key={rel.id}
                    className="p-2.5 rounded bg-[#101117] border border-[#353744] hover:border-[#76D5E0]/50 transition-colors group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                        {isOutgoing ? `→ ${rel.relationType}` : `← ${rel.relationType} (by)`}
                      </span>
                      <button
                        onClick={() => onDeleteRelationship(rel.id)}
                        className="opacity-0 group-hover:opacity-100 text-[#A4A6B5] hover:text-[#F18A82] transition-opacity"
                        title="Remove Relationship"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => onSelectRecord(otherId, TYPE_TO_WORKSPACE[otherType])}
                      className="text-left w-full flex items-center justify-between gap-1 text-xs font-medium text-[#E9E1D2] hover:text-[#76D5E0]"
                    >
                      <span className="truncate">{otherTitle}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 text-[#A4A6B5]" />
                    </button>
                    {rel.notes && (
                      <p className="text-[11px] text-[#A4A6B5] mt-1 leading-snug">{rel.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="space-y-2 pb-4 border-b border-[#353744]">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#A4A6B5]">
            <TagIcon className="w-3.5 h-3.5" />
            <span>Ontological Tags</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {record.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded bg-[#242633] border border-[#353744] text-[11px] text-[#E9E1D2] font-mono"
              >
                #{t}
              </span>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newTagInput.trim()) return;
              onAddTagToRecord(record.id, newTagInput.trim());
              setNewTagInput('');
            }}
            className="flex gap-1.5 pt-1"
          >
            <input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="Add tag..."
              className="flex-1 px-2 py-1 rounded bg-[#101117] border border-[#353744] text-[#E9E1D2] text-[11px]"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded bg-[#242633] hover:bg-[#353744] text-[#E9E1D2] text-[11px] font-mono"
            >
              + Tag
            </button>
          </form>
        </div>

        {/* Revision History */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#A4A6B5]">
            <History className="w-3.5 h-3.5" />
            <span>Provenance & Revisions ({recordRevisions.length})</span>
          </div>
          <div className="text-[11px] font-mono text-[#A4A6B5] bg-[#101117] p-2 rounded border border-[#353744]">
            <div>Created: {record.createdAt.slice(0, 10)}</div>
            <div>Updated: {record.updatedAt.replace('T', ' ').slice(0, 19)} UTC</div>
          </div>
          {recordRevisions.map((rev) => (
            <div
              key={rev.id}
              className="p-2.5 rounded bg-[#101117] border border-[#353744] space-y-1 text-[11px]"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A4A6B5]">
                <span>
                  {rev.previousStatus ? `${rev.previousStatus} → ` : ''}
                  <strong className="text-[#D3B477]">{rev.newStatus}</strong>
                </span>
                <span>{rev.timestamp.replace('T', ' ').slice(11, 19)} UTC</span>
              </div>
              <p className="text-[#E9E1D2]">{rev.changeSummary}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
