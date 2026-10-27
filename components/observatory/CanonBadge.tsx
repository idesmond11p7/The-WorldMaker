'use client';

import React from 'react';
import { CanonStatus } from '@/lib/observatoryTypes';

interface CanonBadgeProps {
  status: CanonStatus;
  size?: 'xs' | 'sm';
}

export const CANON_STATUS_CONFIG: Record<
  CanonStatus,
  { label: string; textHex: string; borderHex: string; bgClass: string; dotHex: string }
> = {
  Established: {
    label: 'Established',
    textHex: '#D3B477',
    borderHex: '#D3B477',
    bgClass: 'bg-[#D3B477]/12 text-[#D3B477] border-[#D3B477]/40',
    dotHex: '#D3B477',
  },
  Proposed: {
    label: 'Proposed',
    textHex: '#9A82E8',
    borderHex: '#9A82E8',
    bgClass: 'bg-[#9A82E8]/12 text-[#9A82E8] border-[#9A82E8]/40',
    dotHex: '#9A82E8',
  },
  Inferred: {
    label: 'Inferred',
    textHex: '#76D5E0',
    borderHex: '#76D5E0',
    bgClass: 'bg-[#76D5E0]/12 text-[#76D5E0] border-[#76D5E0]/40',
    dotHex: '#76D5E0',
  },
  Unresolved: {
    label: 'Unresolved',
    textHex: '#F18A82',
    borderHex: '#F18A82',
    bgClass: 'bg-[#F18A82]/12 text-[#F18A82] border-[#F18A82]/40',
    dotHex: '#F18A82',
  },
  Retired: {
    label: 'Retired',
    textHex: '#A4A6B5',
    borderHex: '#A4A6B5',
    bgClass: 'bg-[#A4A6B5]/12 text-[#A4A6B5] border-[#A4A6B5]/40',
    dotHex: '#A4A6B5',
  },
};

export const CanonBadge: React.FC<CanonBadgeProps> = ({ status, size = 'xs' }) => {
  const cfg = CANON_STATUS_CONFIG[status] || CANON_STATUS_CONFIG.Proposed;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider border rounded ${cfg.bgClass} ${
        size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dotHex }} />
      {cfg.label}
    </span>
  );
};
