export type CanonStatus = 'Established' | 'Proposed' | 'Inferred' | 'Unresolved' | 'Retired';

export type WorkspaceId =
  | 'observatory'
  | 'world-atlas'
  | 'entities'
  | 'power-forge'
  | 'visual-studio'
  | 'idea-constellation'
  | 'research-desk'
  | 'lore-library';

export type RecordCollectionType =
  | 'project'
  | 'lore'
  | 'entity'
  | 'location'
  | 'faction'
  | 'ability'
  | 'powerSystem'
  | 'powerInteraction'
  | 'visualReference'
  | 'designBoard'
  | 'effectsSequence'
  | 'idea'
  | 'research';

export type RelationType =
  | 'Contains'
  | 'Located within'
  | 'Connected to'
  | 'Governed by'
  | 'Originates from'
  | 'Associated with'
  | 'Opposed to'
  | 'Depends upon'
  | 'Transcends';

export interface BaseRecord {
  id: string;
  title: string;
  summary: string;
  canonStatus: CanonStatus;
  tags: string[];
  sourceCitation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project extends BaseRecord {
  universeName: string;
  focusDomain: string;
  activeObjectives: string[];
  linkedRecordIds: string[];
}

export interface LoreDocument extends BaseRecord {
  kicker: string;
  category:
    | 'Cosmology'
    | 'Magic & MWI'
    | 'Ki & Somatics'
    | 'Cacodictyology'
    | 'Realms & Sectors'
    | 'Creative Philosophy'
    | 'Cognition & Astral';
  content: string;
  establishedFacts: string[];
  inferredPrinciples: string[];
  unresolvedQuestions: string[];
  provenanceNote: string;
}

export type EntityKind =
  | 'Character'
  | 'Creature'
  | 'Demon Breed'
  | 'Demon Bloodline'
  | 'Astral Entity'
  | 'Category Race'
  | 'Goetarch / Sovereign'
  | 'Artifact';

export interface CharacterProportionsSpec {
  headHeightRatio: string; // e.g., "8.5 heads tall (heroic/elongated)" or "6.5 heads (compact brute)"
  statureAndMass: string;
  somatotypeAndLimbRatio: string;
  craniofacialStructure: string; // Jawline, zygomatic arch, brow ridge, nasal bridge
  ocularAndFacialFeatures: string; // Sclera, iris geometry, skin texture, teeth/horns/scars
  postureAndCenterOfGravity: string;
}

export interface Entity extends BaseRecord {
  kind: EntityKind;
  categoryTier: string;
  cognitionTier?: string;
  factionOrCaste: string;
  originOrRealm: string;
  metaphysicalNature: string;
  appearanceAndSilhouette: string;
  proportionsAndFacialFeatures?: CharacterProportionsSpec;
  abilitiesAndPowers: string;
  restrictorPlatesAndLimits: string;
  associatedFuelOrKi: string;
  possibilityResistanceDelta?: string;
  soundAndVfxDirection?: string;
  production3DBrief?: string;
}

export interface LocationOrRealm extends BaseRecord {
  realmType: 'Underworld Sector' | 'Inverted Beast Manifold' | 'Astral Plane' | 'Terra-Realm' | 'Primordial Void';
  sector: string;
  visualAtmosphere: string;
  dominantEntities: string;
  environmentalLawsAndPhysics: string;
  geopoliticalContext: string;
  worldDetailNotes?: {
    horizonAndSkyMechanics: string;
    architecturalScaleAndMaterials: string;
    ambientTurnFieldBehavior: string;
    realmImagePromptSpec: string;
  };
  mapX: number; // 0-1000 canvas coordinate
  mapY: number; // 0-600 canvas coordinate
}

export interface Faction extends BaseRecord {
  factionType: 'Cacodictyology Root' | 'Infernal Hegemony' | 'Underworld Bureaucracy' | 'Ascetic Order' | 'Astral Enforcement';
  emblemCode: string;
  governingPrinciple: string;
  territoryOrRoot: string;
  notableSubHierarchies: {
    code: string;
    name: string;
    domain: string;
    tier: string;
    description: string;
  }[];
  mapX: number;
  mapY: number;
}

export interface AbilityMechanicsSequence {
  source: string;
  activation: string;
  operation: string;
  target: string;
  effect: string;
  costAndLimitation: string;
  consequence: string;
  failureOrKickbackPath: string;
}

export interface TurnFieldBehavior {
  fieldClassification:
    | '1. Active Turn Field (Localized Space Conversion)'
    | '2. Internal Reserve Locus'
    | '3. Connected Ley/Psychic Network'
    | '4. Pure Essence Projection'
    | '5. Micro-Realm of Energy'
    | '6. En-Grafted Hardware Field';
  matterPhaseState: string; // e.g., Superionic Ice, Time Crystal, Quark-Gluon Plasma, Bose-Einstein Condensate
  powerVibeAndSensoryTexture: string;
  turnConditionAndTrigger: string; // How local space/turns shift when the field deploys
  fieldBoundaryAndDominance: string; // How it interacts with or overwrites rival fields
}

export interface Ability extends BaseRecord {
  powerSystemId: string;
  powerSystemName: string;
  possibilityDelta: string;
  fuelOrSomaticVector: string;
  powerVibe?: string;
  turnField?: TurnFieldBehavior;
  sequence: AbilityMechanicsSequence;
}

export interface PowerSystem extends BaseRecord {
  systemCategory: 'MWI Reality Warping' | 'Somatic Ki Engine' | 'Occult Framework' | 'Cosmic Fuel Reservoir' | 'Netherfire Reserve' | 'Turn Field Architecture';
  epithet: string;
  coreAxiom: string;
  powerVibeSignature?: string;
  turnFieldMechanics?: string;
  operationalMechanics: string;
  hardwareOrMediumRequired: string;
  restrictorPlateAndKickback: string;
  subComponents: {
    name: string;
    designation: string;
    description: string;
    stateOrGrade?: string;
  }[];
}

export interface PowerInteraction extends BaseRecord {
  interactionType: 'Ability Clash' | 'System vs System' | 'Powerscaling Comparison' | 'Turn Field Clash';
  subjectA: string;
  subjectB: string;
  premiseAndConditions: string;
  supportingEvidence: string[];
  counterargumentsAndVulnerabilities: string[];
  mechanicalResolution: string;
  uncertaintyAndEdgeCases: string;
}

export interface ImageAnalysisCategory {
  categoryName: string;
  visibleEvidence: string;
  creativeInterpretation: string;
}

export interface VisualReference extends BaseRecord {
  category: 'Environment' | 'Character / Somatics' | 'Artifact / Seal' | 'Inverted Realm' | 'Uploaded Concept';
  src: string; // Local path or IndexedDB dataURL
  aspectRatio: '16:9' | '3:4' | '1:1';
  colorPalette: { name: string; hex: string }[];
  inWorldGrounding: string;
  concept2DNotes: string;
  production3DBrief: {
    polybudgetAndTopology: string;
    materialsAndShaders: string;
    riggingAndDeformation: string;
    lightingAndVolumetrics: string;
  };
  tenCategoryAnalysis: ImageAnalysisCategory[];
}

export interface DesignBoardItem {
  id: string;
  boardId: string;
  itemType: 'image' | 'note' | 'palette' | 'spec3d' | 'loreLink';
  title: string;
  content: string;
  imageSrc?: string;
  swatches?: { name: string; hex: string }[];
  linkedRecordId?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DesignBoard extends BaseRecord {
  boardDomain: 'Character Design' | 'Realm & Architecture' | 'Artifact & Sigil' | '3D Asset Brief';
  mode: '2D Concept' | '3D Production';
  items: DesignBoardItem[];
}

export interface EffectsStage {
  stageName: 'Anticipation' | 'Activation' | 'Expansion' | 'Impact' | 'Aftermath';
  timingMs: string;
  visualGeometryAndParticles: string;
  colorAndShaderBehavior: string;
  soundAndAcousticProfile: string;
  environmentalReaction: string;
}

export interface EffectsSequence extends BaseRecord {
  linkedAbilityOrFuel: string;
  dominantColors: string[];
  stages: EffectsStage[];
}

export interface Idea extends BaseRecord {
  domain: 'Missing Category Races' | 'Unfleshed Demon Bloodlines' | 'Classified Frameworks' | 'Netherfire Fuels' | 'Ki & Magic Collisions' | 'Cosmology & Realms';
  promptQuestion: string;
  contextFromDraft: string;
  etymology: string;
  coreConcept: string;
  restrictorPlate: string;
  parentIdeaId?: string;
  mergedFromIds?: string[];
  canvasX: number;
  canvasY: number;
}

export interface ResearchRecord extends BaseRecord {
  researchQuestion: string;
  claimInvestigated: string;
  sourceTitle: string;
  sourceAuthorOrTradition: string;
  sourceDateOrEra: string;
  sourceUrlOrReference: string;
  verbatimExcerptOrPrinciple: string;
  analyticalFindings: string;
  confidenceAndLimitations: string;
  supportingSources: string[];
  contradictingOrAlternativeViews: string[];
  inVerseTranslation: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  sourceType: RecordCollectionType;
  sourceTitle: string;
  targetId: string;
  targetType: RecordCollectionType;
  targetTitle: string;
  relationType: RelationType;
  notes: string;
  canonStatus: CanonStatus;
  createdAt: string;
}

export interface Tag {
  id: string;
  label: string;
  category: 'Cosmology' | 'Power' | 'Entity' | 'Realm' | 'Visual' | 'Status';
  colorHex: string;
}

export interface RevisionRecord {
  id: string;
  recordId: string;
  recordType: RecordCollectionType;
  recordTitle: string;
  previousStatus?: CanonStatus;
  newStatus: CanonStatus;
  changeSummary: string;
  timestamp: string;
}

export interface ObservatoryWorkspaceState {
  version: string;
  lastSavedAt: string;
  projects: Project[];
  loreDocuments: LoreDocument[];
  entities: Entity[];
  locations: LocationOrRealm[];
  factions: Faction[];
  abilities: Ability[];
  powerSystems: PowerSystem[];
  powerInteractions: PowerInteraction[];
  visualReferences: VisualReference[];
  designBoards: DesignBoard[];
  effectsSequences: EffectsSequence[];
  ideas: Idea[];
  researchRecords: ResearchRecord[];
  relationships: Relationship[];
  tags: Tag[];
  revisions: RevisionRecord[];
  recentRecordIds: { id: string; type: RecordCollectionType; title: string; timestamp: string }[];
}
