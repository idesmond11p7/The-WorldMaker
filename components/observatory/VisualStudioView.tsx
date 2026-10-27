'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  ObservatoryWorkspaceState,
  VisualReference,
  DesignBoardItem,
  EffectsSequence,
} from '@/lib/observatoryTypes';
import { CanonBadge } from './CanonBadge';
import {
  Image as ImageIcon,
  LayoutGrid,
  Sparkles,
  Upload,
  Plus,
  Box,
  Layers,
  Eye,
  Volume2,
  Move,
} from 'lucide-react';

interface VisualStudioViewProps {
  state: ObservatoryWorkspaceState;
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
  onUploadVisualReference: (ref: VisualReference) => void;
  onUpdateDesignBoardItemPos: (boardId: string, itemId: string, x: number, y: number) => void;
  onAddDesignBoardItem: (boardId: string, item: DesignBoardItem) => void;
  onToggleBoardMode: (boardId: string, mode: '2D Concept' | '3D Production') => void;
  onAddEffectsSequence: (seq: EffectsSequence) => void;
}

export const VisualStudioView: React.FC<VisualStudioViewProps> = ({
  state,
  selectedRecordId,
  onSelectRecord,
  onUploadVisualReference,
  onUpdateDesignBoardItemPos,
  onAddDesignBoardItem,
  onToggleBoardMode,
  onAddEffectsSequence,
}) => {
  const [subTab, setSubTab] = useState<'gallery' | 'boards' | 'vfx'>('gallery');
  const [specMode, setSpecMode] = useState<'2D' | '3D' | '10Cat'>('10Cat');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Board state
  const [activeBoardId, setActiveBoardId] = useState(
    state.designBoards[0]?.id || 'board-underworld-architecture'
  );
  const [draggingItem, setDraggingItem] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddBoardNote, setShowAddBoardNote] = useState(false);

  // VFX Sequence state
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [showNewVfxModal, setShowNewVfxModal] = useState(false);
  const [vfxTitle, setVfxTitle] = useState('');
  const [vfxSummary, setVfxSummary] = useState('');
  const [vfxAbility, setVfxAbility] = useState('');

  const selectedRef =
    state.visualReferences.find((r) => r.id === selectedRecordId) || state.visualReferences[0];
  const activeBoard =
    state.designBoards.find((b) => b.id === activeBoardId) || state.designBoards[0];
  const selectedVfx =
    state.effectsSequences.find((f) => f.id === selectedRecordId) || state.effectsSequences[0];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const now = new Date().toISOString();
      const newRef: VisualReference = {
        id: `vis-upload-${Date.now()}`,
        title: file.name.replace(/\.[^/.]+$/, ''),
        summary: 'Uploaded visual reference stored in IndexedDB for 10-category analysis and board pinning.',
        category: 'Uploaded Concept',
        src: dataUrl,
        aspectRatio: '16:9',
        colorPalette: [
          { name: 'Obsidian Void', hex: '#101117' },
          { name: 'Arcane Violet', hex: '#9A82E8' },
          { name: 'Antique Gold', hex: '#D3B477' },
          { name: 'Astral Cyan', hex: '#76D5E0' },
        ],
        inWorldGrounding: 'Uploaded reference asset awaiting specific realm or caste grounding.',
        concept2DNotes: 'Uploaded concept reference.',
        production3DBrief: {
          polybudgetAndTopology: 'Target topology to be assigned.',
          materialsAndShaders: 'PBR surface shader breakdown pending.',
          riggingAndDeformation: 'Standard skeletal or prop hierarchy.',
          lightingAndVolumetrics: 'Key + rim lighting setup.',
        },
        tenCategoryAnalysis: [
          {
            categoryName: '1. Subject & Focal Hierarchy',
            visibleEvidence: `Uploaded image file (${file.name}, ${Math.round(file.size / 1024)} KB).`,
            creativeInterpretation: 'Ready for Lorekeeper focal & silhouette extraction.',
          },
          {
            categoryName: '2. Composition & Silhouette Architecture',
            visibleEvidence: 'Primary silhouette contours visible in uploaded frame.',
            creativeInterpretation: 'Can be mapped to Ur-Worlds structural design lanes.',
          },
          {
            categoryName: '3. Color Palette & Value Contrast',
            visibleEvidence: 'Extracted base value distribution.',
            creativeInterpretation: 'Contrast against Obsidian Void (#101117) background.',
          },
          {
            categoryName: '4. Lighting & Atmospheric Behavior',
            visibleEvidence: 'Direct and ambient illumination cues.',
            creativeInterpretation: 'Map to thermal, bio-electric, or photonic absorption shaders.',
          },
          {
            categoryName: '5. Materiality & Surface Texture',
            visibleEvidence: 'Surface roughness and specular cues.',
            creativeInterpretation: 'Translate into 4K PBR metallic/roughness maps.',
          },
          {
            categoryName: '6. Scale & Spatial Depth',
            visibleEvidence: 'Foreground-to-background perspective.',
            creativeInterpretation: 'Establish human vs. cyclopean underworld scale.',
          },
          {
            categoryName: '7. Symbolic & Occult Motifs',
            visibleEvidence: 'Geometric or organic motifs.',
            creativeInterpretation: 'Connect to Solomonic, Vedic, Kemetic, or Somatic traditions.',
          },
          {
            categoryName: '8. Motion & Energy Readability',
            visibleEvidence: 'Directional flow lines.',
            creativeInterpretation: 'Use as Anticipation/Activation telegraph in VFX Designer.',
          },
          {
            categoryName: '9. 2D Concept Art Translation',
            visibleEvidence: 'Uploaded 2D keyframe.',
            creativeInterpretation: 'Ready for orthographic callout sheet.',
          },
          {
            categoryName: '10. 3D Production & Shader Pipeline',
            visibleEvidence: 'Reference geometry and surface response.',
            creativeInterpretation: 'Ready for ZBrush/Blender/Unreal shader specification.',
          },
        ],
        canonStatus: 'Proposed',
        tags: ['Uploaded', 'Visual Reference'],
        createdAt: now,
        updatedAt: now,
      };
      onUploadVisualReference(newRef);
      onSelectRecord(newRef.id);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleBoardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingItem || !activeBoard) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = Math.max(12, Math.round(e.clientX - rect.left - draggingItem.offsetX));
    const newY = Math.max(12, Math.round(e.clientY - rect.top - draggingItem.offsetY));
    onUpdateDesignBoardItemPos(activeBoard.id, draggingItem.id, newX, newY);
  };

  const handleCreateVfx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vfxTitle.trim()) return;
    const now = new Date().toISOString();
    const newSeq: EffectsSequence = {
      id: `fx-${Date.now()}`,
      title: vfxTitle.trim(),
      summary: vfxSummary.trim() || '5-stage audiovisual combat VFX sequence.',
      linkedAbilityOrFuel: vfxAbility.trim() || 'Custom Ability',
      dominantColors: ['#9A82E8', '#76D5E0', '#D3B477', '#F18A82'],
      canonStatus: 'Proposed',
      tags: ['VFX Sequence', 'Audiovisual'],
      createdAt: now,
      updatedAt: now,
      stages: (['Anticipation', 'Activation', 'Expansion', 'Impact', 'Aftermath'] as const).map(
        (st, idx) => ({
          stageName: st,
          timingMs: `${idx * 250}ms – ${(idx + 1) * 250}ms`,
          visualGeometryAndParticles: `${st} stage particle and geometric mesh deformation.`,
          colorAndShaderBehavior: `${st} stage emissive and Fresnel shader response.`,
          soundAndAcousticProfile: `${st} stage transient and frequency profile.`,
          environmentalReaction: `${st} stage ground, air, and lighting reaction.`,
        })
      ),
    };
    onAddEffectsSequence(newSeq);
    onSelectRecord(newSeq.id);
    setVfxTitle('');
    setVfxSummary('');
    setShowNewVfxModal(false);
  };

  return (
    <div className="h-full flex flex-col bg-[#101117] overflow-hidden">
      {/* Top Sub-Navigation */}
      <div className="p-4 lg:px-6 bg-[#191B25] border-b border-[#353744] flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('gallery')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'gallery'
                ? 'bg-[#242633] border-[#76D5E0] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#76D5E0]" />
            <span>Reference Gallery &amp; 10-Category Analysis ({state.visualReferences.length})</span>
          </button>

          <button
            onClick={() => setSubTab('boards')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'boards'
                ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-[#D3B477]" />
            <span>2D/3D Design Boards ({state.designBoards.length})</span>
          </button>

          <button
            onClick={() => setSubTab('vfx')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border transition-all ${
              subTab === 'vfx'
                ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2]'
                : 'border-transparent text-[#A4A6B5] hover:text-[#E9E1D2]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9A82E8]" />
            <span>Ability &amp; Effects Sequence Designer ({state.effectsSequences.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#76D5E0] text-[#101117] font-semibold text-xs hover:opacity-90"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Image Reference</span>
          </button>

          {subTab === 'vfx' && (
            <button
              onClick={() => setShowNewVfxModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Effects Sequence</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab 1: Reference Gallery & 10-Category Image Analysis */}
      {subTab === 'gallery' && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Thumbnail List */}
          <div className="w-full lg:w-88 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto p-3 space-y-3 shrink-0">
            {state.visualReferences.map((ref) => {
              const isSelected = selectedRef?.id === ref.id;
              return (
                <div
                  key={ref.id}
                  onClick={() => onSelectRecord(ref.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-[#242633] border-[#76D5E0]'
                      : 'bg-[#191B25] border-[#353744] hover:border-[#A4A6B5]'
                  }`}
                >
                  <div className="relative w-full h-36 rounded overflow-hidden bg-[#101117] border border-[#353744]">
                    {ref.src.startsWith('data:') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ref.src}
                        alt={ref.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={ref.src}
                        alt={ref.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#76D5E0]">
                      {ref.category}
                    </span>
                    <CanonBadge status={ref.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">
                    {ref.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Image Analysis & 2D/3D Spec Workspace */}
          {selectedRef && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Image Viewport (5 cols) */}
                <div className="xl:col-span-5 space-y-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#191B25] border border-[#353744]">
                    {selectedRef.src.startsWith('data:') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedRef.src}
                        alt={selectedRef.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={selectedRef.src}
                        alt={selectedRef.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>

                  {/* Extracted Palette Swatches */}
                  <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#A4A6B5]">
                      Chromatic Swatches
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedRef.colorPalette.map((sw) => (
                        <div
                          key={sw.hex}
                          className="flex items-center gap-2 p-1.5 rounded bg-[#101117] border border-[#353744]"
                        >
                          <span
                            className="w-5 h-5 rounded border border-white/10 shrink-0"
                            style={{ backgroundColor: sw.hex }}
                          />
                          <div className="min-w-0">
                            <div className="text-[11px] text-[#E9E1D2] truncate">{sw.name}</div>
                            <div className="text-[10px] font-mono text-[#A4A6B5]">{sw.hex}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analysis & Mode Switcher (7 cols) */}
                <div className="xl:col-span-7 space-y-5">
                  <div className="space-y-2 border-b border-[#353744] pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase text-[#76D5E0]">
                        {selectedRef.category} · Aspect {selectedRef.aspectRatio}
                      </span>
                      <CanonBadge status={selectedRef.canonStatus} size="sm" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#E9E1D2]">
                      {selectedRef.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A4A6B5]">
                      {selectedRef.inWorldGrounding}
                    </p>
                  </div>

                  {/* Mode Switcher: 10-Category Analysis vs 2D Concept vs 3D Production Brief */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSpecMode('10Cat')}
                      className={`px-3 py-1.5 rounded text-xs font-mono border ${
                        specMode === '10Cat'
                          ? 'bg-[#242633] border-[#76D5E0] text-[#E9E1D2]'
                          : 'border-[#353744] text-[#A4A6B5]'
                      }`}
                    >
                      10-Category Image Analysis
                    </button>
                    <button
                      onClick={() => setSpecMode('2D')}
                      className={`px-3 py-1.5 rounded text-xs font-mono border ${
                        specMode === '2D'
                          ? 'bg-[#242633] border-[#9A82E8] text-[#E9E1D2]'
                          : 'border-[#353744] text-[#A4A6B5]'
                      }`}
                    >
                      2D Concept Direction
                    </button>
                    <button
                      onClick={() => setSpecMode('3D')}
                      className={`px-3 py-1.5 rounded text-xs font-mono border ${
                        specMode === '3D'
                          ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                          : 'border-[#353744] text-[#A4A6B5]'
                      }`}
                    >
                      3D Production &amp; Shader Brief
                    </button>
                  </div>

                  {specMode === '10Cat' && (
                    <div className="space-y-3">
                      <div className="text-[11px] font-mono text-[#A4A6B5]">
                        Separating <strong className="text-[#76D5E0]">Visible Evidence</strong> from{' '}
                        <strong className="text-[#9A82E8]">Creative Interpretation</strong> across
                        all 10 analytical dimensions:
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedRef.tenCategoryAnalysis.map((cat, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2"
                          >
                            <div className="text-xs font-serif font-semibold text-[#D3B477]">
                              {cat.categoryName}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-2.5 rounded bg-[#101117] border border-[#353744]">
                                <span className="block text-[10px] font-mono uppercase text-[#76D5E0] mb-1">
                                  Visible Evidence
                                </span>
                                <span className="text-[#E9E1D2]">{cat.visibleEvidence}</span>
                              </div>
                              <div className="p-2.5 rounded bg-[#101117] border border-[#353744]">
                                <span className="block text-[10px] font-mono uppercase text-[#9A82E8] mb-1">
                                  Creative Interpretation
                                </span>
                                <span className="text-[#E9E1D2]">{cat.creativeInterpretation}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {specMode === '2D' && (
                    <div className="p-5 rounded-lg bg-[#191B25] border border-[#9A82E8]/50 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9A82E8]">
                        <Layers className="w-4 h-4" />
                        <span>2D Concept Art &amp; Orthographic Callout Sheet Direction</span>
                      </div>
                      <p className="text-sm text-[#E9E1D2] leading-relaxed">
                        {selectedRef.concept2DNotes}
                      </p>
                    </div>
                  )}

                  {specMode === '3D' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-1">
                        <div className="text-[11px] font-mono uppercase text-[#D3B477]">
                          Polybudget &amp; Topology
                        </div>
                        <p className="text-xs text-[#E9E1D2]">
                          {selectedRef.production3DBrief.polybudgetAndTopology}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-1">
                        <div className="text-[11px] font-mono uppercase text-[#76D5E0]">
                          Materials &amp; PBR Shaders
                        </div>
                        <p className="text-xs text-[#E9E1D2]">
                          {selectedRef.production3DBrief.materialsAndShaders}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-1">
                        <div className="text-[11px] font-mono uppercase text-[#9A82E8]">
                          Rigging &amp; Deformation
                        </div>
                        <p className="text-xs text-[#E9E1D2]">
                          {selectedRef.production3DBrief.riggingAndDeformation}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-[#191B25] border border-[#353744] space-y-1">
                        <div className="text-[11px] font-mono uppercase text-[#D3B477]">
                          Lighting &amp; Volumetrics
                        </div>
                        <p className="text-xs text-[#E9E1D2]">
                          {selectedRef.production3DBrief.lightingAndVolumetrics}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sub-Tab 2: Interactive 2D/3D Design Boards */}
      {subTab === 'boards' && activeBoard && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-3 bg-[#191B25]/80 border-b border-[#353744] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {state.designBoards.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    setActiveBoardId(b.id);
                    onSelectRecord(b.id);
                  }}
                  className={`px-3 py-1 rounded text-xs font-serif font-semibold border ${
                    activeBoard.id === b.id
                      ? 'bg-[#242633] border-[#D3B477] text-[#E9E1D2]'
                      : 'border-[#353744] text-[#A4A6B5]'
                  }`}
                >
                  {b.title}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onToggleBoardMode(
                    activeBoard.id,
                    activeBoard.mode === '2D Concept' ? '3D Production' : '2D Concept'
                  )
                }
                className="px-2.5 py-1 rounded bg-[#242633] border border-[#76D5E0]/50 text-xs font-mono text-[#76D5E0]"
              >
                Mode: {activeBoard.mode} (Click to Toggle)
              </button>
              <button
                onClick={() => setShowAddBoardNote(!showAddBoardNote)}
                className="px-2.5 py-1 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                + Pin Callout Card
              </button>
            </div>
          </div>

          {showAddBoardNote && (
            <div className="px-6 py-3 bg-[#191B25] border-b border-[#353744] flex items-center gap-3">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Callout title (e.g., Roughness Clamp Shader Note)..."
                className="px-2.5 py-1 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2] w-64"
              />
              <input
                type="text"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Callout specification..."
                className="px-2.5 py-1 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2] flex-1"
              />
              <button
                onClick={() => {
                  if (!newNoteTitle.trim()) return;
                  onAddDesignBoardItem(activeBoard.id, {
                    id: `bi-${Date.now()}`,
                    boardId: activeBoard.id,
                    itemType: activeBoard.mode === '3D Production' ? 'spec3d' : 'note',
                    title: newNoteTitle.trim(),
                    content: newNoteContent.trim(),
                    x: 80,
                    y: 80,
                    width: 300,
                    height: 160,
                  });
                  setNewNoteTitle('');
                  setNewNoteContent('');
                  setShowAddBoardNote(false);
                }}
                className="px-3 py-1 rounded bg-[#D3B477] text-[#101117] font-semibold text-xs"
              >
                Pin to Board
              </button>
            </div>
          )}

          {/* Free-form Arrangeable Canvas */}
          <div
            onMouseMove={handleBoardMouseMove}
            onMouseUp={() => setDraggingItem(null)}
            onMouseLeave={() => setDraggingItem(null)}
            className="flex-1 relative overflow-auto bg-[#101117] select-none"
            style={{
              backgroundImage:
                'radial-gradient(circle, #353744 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {activeBoard.items.map((item) => (
              <div
                key={item.id}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.width,
                }}
                className="absolute rounded-lg bg-[#191B25] border border-[#353744] hover:border-[#9A82E8] shadow-xl overflow-hidden flex flex-col"
              >
                <div
                  onMouseDown={(e) => {
                    const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                    if (!rect) return;
                    setDraggingItem({
                      id: item.id,
                      offsetX: e.clientX - rect.left,
                      offsetY: e.clientY - rect.top,
                    });
                  }}
                  className="px-3 py-2 bg-[#242633] border-b border-[#353744] flex items-center justify-between cursor-move"
                >
                  <span className="text-xs font-serif font-semibold text-[#E9E1D2] truncate">
                    {item.title}
                  </span>
                  <Move className="w-3.5 h-3.5 text-[#A4A6B5] shrink-0" />
                </div>

                <div className="p-3 space-y-2 text-xs">
                  {item.imageSrc && (
                    <div className="relative w-full h-36 rounded overflow-hidden bg-[#101117]">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {item.swatches && (
                    <div className="grid grid-cols-2 gap-1.5">
                      {item.swatches.map((sw) => (
                        <div
                          key={sw.hex}
                          className="flex items-center gap-1.5 p-1 rounded bg-[#101117] border border-[#353744]"
                        >
                          <span
                            className="w-4 h-4 rounded shrink-0"
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span className="text-[10px] font-mono text-[#E9E1D2] truncate">
                            {sw.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-[#A4A6B5] whitespace-pre-line leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-Tab 3: 5-Stage Ability & Effects Sequence Designer */}
      {subTab === 'vfx' && selectedVfx && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-88 border-r border-[#353744] bg-[#191B25]/50 overflow-y-auto divide-y divide-[#353744] shrink-0">
            {state.effectsSequences.map((fx) => {
              const isSelected = selectedVfx.id === fx.id;
              return (
                <button
                  key={fx.id}
                  onClick={() => {
                    onSelectRecord(fx.id);
                    setActiveStageIdx(0);
                  }}
                  className={`w-full p-4 text-left transition-colors space-y-1.5 ${
                    isSelected ? 'bg-[#242633] border-l-2 border-l-[#9A82E8]' : 'hover:bg-[#191B25]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#9A82E8]">
                      5-Stage VFX Sequence
                    </span>
                    <CanonBadge status={fx.canonStatus} size="xs" />
                  </div>
                  <div className="text-sm font-serif font-semibold text-[#E9E1D2]">{fx.title}</div>
                  <p className="text-xs text-[#A4A6B5] line-clamp-2">{fx.summary}</p>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
            <div className="space-y-2 border-b border-[#353744] pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#9A82E8]">
                  Audiovisual Combat VFX &amp; Shader Timeline
                </span>
                <CanonBadge status={selectedVfx.canonStatus} size="sm" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#E9E1D2]">
                {selectedVfx.title}
              </h2>
              <p className="text-sm text-[#A4A6B5]">{selectedVfx.summary}</p>
            </div>

            {/* 5-Stage Timeline Scrubber */}
            <div className="grid grid-cols-5 gap-2">
              {selectedVfx.stages.map((st, idx) => {
                const active = activeStageIdx === idx;
                return (
                  <button
                    key={st.stageName}
                    onClick={() => setActiveStageIdx(idx)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      active
                        ? 'bg-[#242633] border-[#9A82E8] shadow-md'
                        : 'bg-[#191B25] border-[#353744] hover:border-[#A4A6B5]'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#76D5E0]">
                      Stage {idx + 1} · {st.timingMs}
                    </div>
                    <div className="text-sm font-serif font-semibold text-[#E9E1D2] mt-0.5">
                      {st.stageName}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Breakdown */}
            {selectedVfx.stages[activeStageIdx] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9A82E8]">
                    <Box className="w-4 h-4" />
                    <span>Visual Geometry, Mesh &amp; Particle Emitters</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedVfx.stages[activeStageIdx].visualGeometryAndParticles}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#76D5E0]">
                    <Eye className="w-4 h-4" />
                    <span>Color, Chromatic Aberration &amp; Shader Response</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedVfx.stages[activeStageIdx].colorAndShaderBehavior}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#D3B477]">
                    <Volume2 className="w-4 h-4" />
                    <span>Sound Design &amp; Acoustic Transient Profile</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedVfx.stages[activeStageIdx].soundAndAcousticProfile}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#191B25] border border-[#353744] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#F18A82]">
                    <Sparkles className="w-4 h-4" />
                    <span>Environmental &amp; Physics Reaction</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#E9E1D2] leading-relaxed">
                    {selectedVfx.stages[activeStageIdx].environmentalReaction}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Effects Sequence Modal */}
      {showNewVfxModal && (
        <div className="fixed inset-0 z-50 bg-[#101117]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateVfx}
            className="w-full max-w-md bg-[#191B25] border border-[#353744] rounded-lg p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-serif font-semibold text-[#E9E1D2]">
              Create 5-Stage Effects Sequence
            </h3>
            <input
              type="text"
              required
              value={vfxTitle}
              onChange={(e) => setVfxTitle(e.target.value)}
              placeholder="Sequence title (e.g., Kalakuta Superfluid Dissolution)..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <input
              type="text"
              value={vfxAbility}
              onChange={(e) => setVfxAbility(e.target.value)}
              placeholder="Linked Ability or Fuel..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <textarea
              rows={2}
              value={vfxSummary}
              onChange={(e) => setVfxSummary(e.target.value)}
              placeholder="Audiovisual direction summary..."
              className="w-full px-3 py-1.5 rounded bg-[#101117] border border-[#353744] text-xs text-[#E9E1D2]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewVfxModal(false)}
                className="px-3 py-1.5 text-xs text-[#A4A6B5]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#9A82E8] text-[#101117] font-semibold text-xs"
              >
                Create Sequence
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
