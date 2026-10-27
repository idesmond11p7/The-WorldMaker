'use client';

import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenContinuity: () => void;
  recordCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenContinuity,
  recordCount
}) => {
  const navItems = [
    { id: 'codex', label: 'Living Codex' },
    { id: 'powers', label: 'Power Systems' },
    { id: 'cacodictyology', label: 'Cacodictyology' },
    { id: 'realms', label: 'Realms Atlas' },
    { id: 'dossiers', label: 'Dossiers' },
    { id: 'visuals', label: 'Visual Boards' },
  ];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 px-6 py-4 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 text-stone-200">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('codex');
          }}
          className="text-lg font-serif font-bold tracking-wide text-stone-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          Lorekeeper Studio
        </a>
        <span className="hidden sm:inline-block text-xs font-mono text-stone-500 uppercase tracking-widest">
          Ur-Worlds
        </span>
      </div>

      {/* Zone 2: 4–6 concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-400">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`hover:text-stone-100 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                isActive
                  ? 'text-amber-400 font-semibold border-b-2 border-amber-500'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenContinuity}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-stone-200 bg-stone-900 border border-stone-700 rounded-md hover:bg-stone-800 hover:text-amber-300 hover:border-amber-700 transition-colors whitespace-nowrap shrink-0"
          title="Project Continuity & Persistence Hub"
        >
          <Database className="w-3.5 h-3.5 text-amber-500" />
          <span>Continuity Hub</span>
          <span className="text-[10px] font-mono bg-stone-800 text-stone-400 px-1.5 py-0.2 rounded">
            {recordCount}
          </span>
        </button>
      </div>
    </header>
  );
};
