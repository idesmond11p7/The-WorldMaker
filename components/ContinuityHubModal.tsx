'use client';

import React, { useState } from 'react';
import { exportProjectBundle, importProjectBundle, SessionLog, getStoredSessionLogs, saveSessionLogs } from '@/lib/storage';
import { X, Download, Upload, ShieldCheck, History, Info, Check, Plus } from 'lucide-react';

interface ContinuityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  articlesCount: number;
  dossiersCount: number;
  onDataImported: () => void;
}

export const ContinuityHubModal: React.FC<ContinuityHubModalProps> = ({
  isOpen,
  onClose,
  articlesCount,
  dossiersCount,
  onDataImported
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'exportImport' | 'sessions'>('architecture');
  const [logs, setLogs] = useState<SessionLog[]>(getStoredSessionLogs());
  const [importText, setImportText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // New Log State
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogCategory, setNewLogCategory] = useState('Worldbuilding');
  const [newLogSummary, setNewLogSummary] = useState('');
  const [newLogNotes, setNewLogNotes] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    const jsonStr = exportProjectBundle();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `urworlds-lorekeeper-archive-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage('Project bundle successfully exported.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importProjectBundle(importText);
    if (success) {
      setLogs(getStoredSessionLogs());
      onDataImported();
      setStatusMessage('Project records successfully restored.');
      setImportText('');
    } else {
      setStatusMessage('Import failed: invalid JSON bundle structure.');
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleAddSessionLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle.trim()) return;

    const newLog: SessionLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: newLogTitle.trim(),
      category: newLogCategory,
      summary: newLogSummary.trim() || 'Creative working session recorded.',
      notes: newLogNotes.trim() || 'Session notes archived.'
    };

    const nextLogs = [newLog, ...logs];
    setLogs(nextLogs);
    saveSessionLogs(nextLogs);
    setIsLogging(false);
    setNewLogTitle('');
    setNewLogSummary('');
    setNewLogNotes('');
    setStatusMessage('New creative session recorded.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-stone-900 border border-stone-700 rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800 bg-stone-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-serif font-bold text-stone-100">
              Continuity & Architecture Hub
            </h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-2 text-xs text-amber-300 flex items-center gap-2 font-mono">
            <Info className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 px-4 pt-3 border-b border-stone-800 bg-stone-950 text-xs">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'architecture'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveTab('exportImport')}
            className={`px-3 py-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'exportImport'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Persistence & Export/Import
          </button>
          <button
            onClick={() => setActiveTab('sessions')}
            className={`px-3 py-1.5 font-medium border-b-2 transition-colors ${
              activeTab === 'sessions'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Session History ({logs.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-2">
                <div className="font-serif font-bold text-sm text-stone-100">
                  Fundamental Architectural Principle
                </div>
                <p className="text-stone-300 leading-relaxed font-serif text-xs">
                  This application is the <span className="text-amber-400 font-semibold">working environment</span> for the Lorekeeper. It is not an independent AI designed to replace the AI currently operating in this Google AI Studio Build session.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-2">
                  <div className="font-mono text-amber-400 uppercase text-[10px]">
                    The Build-Session AI (Creative Intelligence)
                  </div>
                  <ul className="space-y-1.5 text-stone-400 text-[11px] list-disc list-inside">
                    <li>Deep ontological and cosmological synthesis.</li>
                    <li>Brainstorming characters, creatures, and relics.</li>
                    <li>Analyzing images and guiding 3D/VFX production.</li>
                    <li>Formulating powerscaling and mechanics logic.</li>
                  </ul>
                </div>

                <div className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-2">
                  <div className="font-mono text-sky-400 uppercase text-[10px]">
                    The Application Workbench (Living Library)
                  </div>
                  <ul className="space-y-1.5 text-stone-400 text-[11px] list-disc list-inside">
                    <li>Durable multi-session storage for all lore and dossiers.</li>
                    <li>Interactive Possibility Resistance & Ki calculators.</li>
                    <li>Visual reference boards with prompt blueprints.</li>
                    <li>Export and backup infrastructure for the creator.</li>
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-stone-950 rounded border border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Active Canonical Lore Articles: <strong className="text-stone-200">{articlesCount}</strong></span>
                <span>Production Dossiers: <strong className="text-stone-200">{dossiersCount}</strong></span>
                <span>Hierarchies Indexed: <strong className="text-stone-200">144</strong></span>
              </div>
            </div>
          )}

          {activeTab === 'exportImport' && (
            <div className="space-y-5">
              <div className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-stone-100 text-sm">
                      Durable Project Archive Export
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Download the complete JSON archive of all lore, dossiers, and session notes.
                    </p>
                  </div>
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-stone-950 font-medium rounded hover:bg-amber-400 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-3">
                <div>
                  <h3 className="font-serif font-bold text-stone-100 text-sm">
                    Restore Archive from JSON
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Paste previously exported project bundle JSON to restore custom records.
                  </p>
                </div>
                <textarea
                  rows={4}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON archive bundle here..."
                  className="w-full p-2.5 bg-stone-900 border border-stone-800 rounded text-[11px] font-mono text-stone-200 focus:outline-none focus:border-amber-600"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleImport}
                    disabled={!importText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium rounded disabled:opacity-40 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Restore Records</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Chronological Working Session Log
                </span>
                <button
                  onClick={() => setIsLogging(!isLogging)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded hover:bg-amber-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Working Turn</span>
                </button>
              </div>

              {isLogging && (
                <form onSubmit={handleAddSessionLog} className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={newLogTitle}
                      onChange={(e) => setNewLogTitle(e.target.value)}
                      placeholder="Session Title..."
                      className="p-2 bg-stone-900 border border-stone-800 rounded text-stone-200 text-xs"
                    />
                    <input
                      type="text"
                      value={newLogCategory}
                      onChange={(e) => setNewLogCategory(e.target.value)}
                      placeholder="Category..."
                      className="p-2 bg-stone-900 border border-stone-800 rounded text-stone-200 text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    value={newLogSummary}
                    onChange={(e) => setNewLogSummary(e.target.value)}
                    placeholder="Short summary..."
                    className="w-full p-2 bg-stone-900 border border-stone-800 rounded text-stone-200 text-xs"
                  />
                  <textarea
                    rows={2}
                    value={newLogNotes}
                    onChange={(e) => setNewLogNotes(e.target.value)}
                    placeholder="Key discoveries and notes..."
                    className="w-full p-2 bg-stone-900 border border-stone-800 rounded text-stone-200 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsLogging(false)}
                      className="px-3 py-1 bg-stone-800 text-stone-400 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-amber-500 text-stone-950 font-medium rounded"
                    >
                      Save Log
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 bg-stone-950 border border-stone-800 rounded-lg space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-500">{log.category}</span>
                      <span className="text-stone-500">{new Date(log.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-stone-100">{log.title}</div>
                    <p className="text-xs text-stone-300 font-serif">{log.summary}</p>
                    <p className="text-[11px] text-stone-400 font-mono bg-stone-900 p-2 rounded mt-1">
                      {log.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
