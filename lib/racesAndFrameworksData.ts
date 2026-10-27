// Complete, uncompressed archive of all Races, Demon Breeds, Bloodlines, Astral Species,
// Temporal Anomalies, Goetarchs, Sovereign Factions, Occult Frameworks, and All 29 Realms
// from the primary Ur-Worlds draft, plus Brainstorming & Naming Forge seeds.

export interface DetailedDemonBreed {
  id: string;
  name: string;
  epithet: string;
  caste: string;
  description: string;
  combatRole: string;
  status: 'Fully Detailed in Draft' | 'Expanded in Studio';
}

export interface NamedBloodlineGroup {
  id: string;
  categoryName: string;
  subtitle: string;
  bloodlines: {
    name: string;
    notes?: string;
    status: 'Seed Name Only (Needs Flesh-Out)' | 'Detailed';
  }[];
}

export interface AstralTaxonomyGroup {
  id: string;
  category: string;
  tier: string;
  entities: string[];
}

export interface OccultFrameworkRecord {
  id: string;
  name: string;
  epithet?: string;
  mythos?: string;
  mechanic?: string;
  hardware?: string;
  outputAndKickback?: string;
  status: 'Fully Detailed in Draft' | 'Named Seed (Needs Mechanics)';
}

export interface NetherfireReserve {
  id: string;
  name: string;
  outcomeReality: string;
  status: 'Defined in Draft' | 'Named Seed (Needs Outcome Vector)';
}

export interface BrainstormPromptSeed {
  id: string;
  domain: 'Missing Category Races' | 'Unfleshed Demon Bloodlines' | 'Classified Frameworks' | 'Netherfire Fuels' | 'Ki & Magic Collisions';
  question: string;
  contextFromDraft: string;
  pitchedIdeas: {
    name: string;
    etymology: string;
    concept: string;
    restrictorPlate: string;
  }[];
}

// 1. ALL 6 CATEGORY RACE TIERS + OMNI-LIFE
export const CATEGORY_RACE_TIERS = [
  {
    category: 'Category 1',
    classification: 'Purely Physical & Biological',
    cognition: 'Lacks mental or precognitive capabilities',
    emotions: 'None',
    magicCapability: 'Zero. Bound strictly by classical Newtonian physics.',
    knownExamples: ['Amoeba', 'Baseline microorganisms', 'Non-cognitive flora'],
    missingInDraft: 'No macro-scale Category 1 apex fauna or planetary biomass organisms named yet.'
  },
  {
    category: 'Category 2',
    classification: 'Non-Sentient Thinking Nodes (Category X)',
    cognition: 'Lacks all form and sentience, but CAN think',
    emotions: 'None',
    magicCapability: 'Capable of Netherarchesial Reality Warping (as part of Category X).',
    knownExamples: ['Unnamed in draft — pure form-less cognitive/precognitive processes'],
    missingInDraft: 'CRITICAL GAP: What does a Category 2 race actually look/act like in-world if it has zero form and zero sentience, yet thinks and warps reality?'
  },
  {
    category: 'Category 3',
    classification: 'Emotionless Precognitive Calculators (Category X)',
    cognition: 'Limited sentience, possesses intellectual & precognitive capabilities; lacks permanent pattern recognition and long-term memory of past mistakes ("learns by the way, predicts by the way")',
    emotions: 'None (Lacks precompiled evolutionary algorithms)',
    magicCapability: 'The minimum threshold required to utilize MAGIC steadily, though slower and "less blessed" than Category 4.',
    knownExamples: ['Unnamed in draft — no specific Category 3 species are named yet!'],
    missingInDraft: 'CRITICAL GAP: It takes a Category 3 race to utilize MAGIC, and they are part of Category X—who are the flagship Category 3 races in the Bio-Manifold?'
  },
  {
    category: 'Category 4',
    classification: 'Emotional Evolutionary Civilizations',
    cognition: 'Sentient, intellectual, long-term pattern recognition',
    emotions: 'Full evolutionary hardware overrides (Fear, Anger, Disgust, Lethargy) & social GPS algorithms (Shame, Guilt, Gratitude, Moral Outrage, Love)',
    magicCapability: 'Massive unconscious MWI reality warping via emotionally weighted precognitive simulations ("The Illusion of Myths"), though most are evolutionarily blind to their own capability because they lack Category 5 ontological boundaries.',
    knownExamples: ['Humans (Terra-Realms)', 'Unnamed non-human Category 4 civilizations across the Bio-Manifold'],
    missingInDraft: 'What other Category 4 races populate the Bio-Manifold besides Humans, and how do their different evolutionary biologies create completely different emotions and myths?'
  },
  {
    category: 'Category 5',
    classification: 'Ontologically Bounded Manipulators (Category X)',
    cognition: 'Hyper-advanced precognitive simulation; possesses Category 4 capabilities in most scenarios',
    emotions: 'Variable (Demons are NOT emotional beings, yet are psychologically extreme and tied to the 7/8 Sins)',
    magicCapability: 'Predates on or harvests Category 4 psychology and precognitive simulations. Strictly locked behind Ontological Boundaries (rules they cannot defy without losing existence). Note: "Manipulation doesn\'t always mean malicious—other entities on the opposite end of the spectrum exist."',
    knownExamples: ['Netherbound Entities', 'Luciferian Demons', 'Goetarchs', 'Unnamed Benevolent / Non-Malevolent Category 5 Races'],
    missingInDraft: 'CRITICAL GAP: Who are the non-malevolent Category 5 races on the "other end of the spectrum" that manipulate Category 4s symbiotically or benevolently?'
  },
  {
    category: 'Category 6',
    classification: 'The Unspoken / Unlisted Tier',
    cognition: 'Undocumented in primary draft (Category X jumps from Cat 5 to Cat 7)',
    emotions: 'Unknown',
    magicCapability: 'Unknown — deliberately omitted or classified between Cat 5 MWI manipulation and Cat 7 Metachaos.',
    knownExamples: ['None listed in draft'],
    missingInDraft: 'CRITICAL QUESTION: Why does Category X include Cat 2, 3, 5, and 7, skipping Category 6 entirely? What is Category 6?'
  },
  {
    category: 'Category 7',
    classification: 'Transfinite Metachaos Authorities (Category X)',
    cognition: 'Independent of all lower ecosystems; operates beyond countably infinite Many-Worlds (Aleph-Null)',
    emotions: 'Transcendent',
    magicCapability: 'TRUE Netherarchesial / Axiomarchical Reality Warping. Uses the Metachaos at transfinite cardinal scales (delta δ beyond ZFC, Berkeley Cardinals). Dictates existential authority rather than raw physical brawl strength, though authority is still bounded to the specific Cat 7 entity.',
    knownExamples: ['Unnamed in draft — supreme Metachaos authorities'],
    missingInDraft: 'Who are the named Category 7 individuals or sovereigns, and what are their specific domains of authority?'
  }
];

// 2. ALL 22 DETAILED DEMON BREEDS (ACROSS 6 CASTES)
export const DETAILED_DEMON_BREEDS: DetailedDemonBreed[] = [
  // Caste 1: The Horned Warlords & Iron-Hide Breeds
  {
    id: 'breed-khorvath',
    name: 'The Khorvath',
    epithet: 'Iron-Scaled Sulphur Brutes',
    caste: '1. The Horned Warlords & Iron-Hide Breeds (Brutal Nether-Legions)',
    description: 'Massive, four-horned bipedal brutes with iron-scaled hide that deflects heavy ordnance. Their breath is pure ignited sulphur, and their culture is built purely on brutal conquest and territorial dominance.',
    combatRole: 'Apex frontline shock-infantry & heavy ordnance deflectors',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-brakari',
    name: 'Brakari',
    epithet: 'The Gore-Tusked',
    caste: '1. The Horned Warlords & Iron-Hide Breeds (Brutal Nether-Legions)',
    description: 'Boar-crested, hulking front-liners with curved, jagged bone-tusks growing from their lower jaws and forearms, bred to charge into defensive battle lines and splinter vanguard armor.',
    combatRole: 'Line-breaking kinetic chargers',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-golgoren',
    name: 'Golgoren',
    epithet: 'Obsidian-Ridged Siege Knucklers',
    caste: '1. The Horned Warlords & Iron-Hide Breeds (Brutal Nether-Legions)',
    description: 'Colossal, knuckle-walking siege demons with backs covered in jagged black obsidian ridges. They pound the earth with fist-clubs to summon seismic fissures under enemy trenches.',
    combatRole: 'Tectonic siege artillery & anti-trench disruption',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-zuldrak',
    name: 'Zul’Drak',
    epithet: 'The Spire-Cleavers',
    caste: '1. The Horned Warlords & Iron-Hide Breeds (Brutal Nether-Legions)',
    description: 'Tall, muscular demon aristocrats wielding forged-chasm greatblades. They sport swept-back crowns of solid bone and can run at high velocity despite their massive weight.',
    combatRole: 'High-velocity aristocratic shock-duelists',
    status: 'Fully Detailed in Draft'
  },
  // Caste 2: The Chitinous & Carnal Predatory Castes
  {
    id: 'breed-skorvath',
    name: 'Skorvath',
    epithet: 'The Chasm-Crawlers',
    caste: '2. The Chitinous & Carnal Predatory Castes (Organic Bio-Terrors)',
    description: 'Multi-jointed, blind predators with skin made of clicking, pitch-black chitin. They hunt purely through thermal and kinetic vibration, dropping from ceilings and cave roofs like monstrous mantises.',
    combatRole: 'Vertical ambush predators & thermal-kinetic trackers',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-vrexul',
    name: 'Vrexul',
    epithet: 'The Flay-Hounds',
    caste: '2. The Chitinous & Carnal Predatory Castes (Organic Bio-Terrors)',
    description: 'Fast, skinless quadruped hounds with split jaws lined with triple rows of shark-like teeth. Used by high-caste demons to flush out survivors from ruined cities.',
    combatRole: 'Pursuit packs & urban ruin sweepers',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-kyrakkai',
    name: 'Kyrak-Kai',
    epithet: 'Plasteel-Melting Tunnelers',
    caste: '2. The Chitinous & Carnal Predatory Castes (Organic Bio-Terrors)',
    description: 'Centipede-bodied terrors with armored torsos that tunnel through rock, metal, and planetary crusts, spraying boiling gastric acid that dissolves reinforced plasteel in seconds.',
    combatRole: 'Subterranean crust-breachers & corrosive anti-armor',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-nekroshi',
    name: 'Nekroshi',
    epithet: 'Baked-Flesh Carapace Harvesters',
    caste: '2. The Chitinous & Carnal Predatory Castes (Organic Bio-Terrors)',
    description: 'Carrion-demons with elongated, whip-like arms and scythe-talons, known for hoarding severed flesh to bake into foul protective carapaces over their vital organs.',
    combatRole: 'Mid-range reach slashers & battlefield scavengers',
    status: 'Fully Detailed in Draft'
  },
  // Caste 3: The Primordial Pit-Born
  {
    id: 'breed-makhari',
    name: 'Makhari',
    epithet: 'The Cinder-Gorged',
    caste: '3. The Primordial Pit-Born (Born of Fire, Slag & Nether-Earth)',
    description: 'Broad, stone-skinned demons whose innards are a churning lake of superheated magmatic bile. When mortally wounded, their chests burst open into mini-volcanic eruptions.',
    combatRole: 'Volatile area-denial bruisers & martyrdom detonation',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-tharxian',
    name: 'Tharxian',
    epithet: 'The Slag-Eaters',
    caste: '3. The Primordial Pit-Born (Born of Fire, Slag & Nether-Earth)',
    description: 'Burrowers that swallow bedrock, heavy metals, and enemy artillery shells to excrete molten obsidian, sealing opposing forces inside burning glass tombs.',
    combatRole: 'Ordnance-eating burrowers & molten glass entombment',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-goreshapers',
    name: 'Gore-Shapers (The Karast)',
    epithet: 'Labyrinth Excavators',
    caste: '3. The Primordial Pit-Born (Born of Fire, Slag & Nether-Earth)',
    description: 'Subterranean demons with spade-like claws and magma-cracked hide, responsible for digging and carving the labyrinthine fortress-cities of the lower Nether.',
    combatRole: 'Combat engineers & subterranean fortress carvers',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-phaegor',
    name: 'Phaegor',
    epithet: 'The Ash-Stalkers',
    caste: '3. The Primordial Pit-Born (Born of Fire, Slag & Nether-Earth)',
    description: 'Silent, gaunt wanderers made entirely of compressed, sentient soot and volcanic glass. Striking them disperses their form into blinding smoke before they reform behind their prey.',
    combatRole: 'Particulate-dispersal assassins',
    status: 'Fully Detailed in Draft'
  },
  // Caste 4: The Parasitic & Marrow-Leaches
  {
    id: 'breed-vaelgorgers',
    name: 'Vael-Gorgers',
    epithet: 'The Marrow-Thieves',
    caste: '4. The Parasitic & Marrow-Leaches (The Hunger Castes)',
    description: 'Thin, rubbery-limbed horrors with barbed proboscises that inject paralytic toxins into victims, liquifying their skeletal structure to drink it out.',
    combatRole: 'Paralytic grapplers & skeletal liquefaction',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-skulvermil',
    name: 'Skul-Vermil',
    epithet: 'Armor-Seam Crab Swarms',
    caste: '4. The Parasitic & Marrow-Leaches (The Hunger Castes)',
    description: 'Swarming, crab-like micro-demons that scuttle across battlefields by the millions, gnawing through boots, armor seams, and weapons to pick wounded soldiers clean to the bone.',
    combatRole: 'Micro-swarm attrition & equipment degradation',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-myxari',
    name: 'Myxari',
    epithet: 'The Bile-Drinkers',
    caste: '4. The Parasitic & Marrow-Leaches (The Hunger Castes)',
    description: 'Bloated, leathery swamp-demons of the Nether trenches that exude toxic miasmas capable of rotting breathing gear and synthetic filters.',
    combatRole: 'Chemical warfare & life-support corrosion',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-sanguivor',
    name: 'Sanguivor',
    epithet: 'The Blood-Maws',
    caste: '4. The Parasitic & Marrow-Leaches (The Hunger Castes)',
    description: 'Feral berserkers with chest-cavities that unhinge into massive, vertical mouths lined with rib-teeth, devouring victims whole mid-charge.',
    combatRole: 'Whole-consumption shock berserkers',
    status: 'Fully Detailed in Draft'
  },
  // Caste 5: Nether-Sorcerers & Eldritch War-Priests
  {
    id: 'breed-zulkhor',
    name: 'Zul’Khor',
    epithet: 'The Chasm-Callers',
    caste: '5. Nether-Sorcerers & Eldritch War-Priests (The Arcanum Castes)',
    description: 'Four-armed, hooded demon warlocks whose skin is carved with self-inflicted burning scars. They tear open localized rifts into the Nether to drown reality in abyssal gravity.',
    combatRole: 'Gravitational rift-openers & high warlocks',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-ostrath',
    name: 'Ostrath',
    epithet: 'The Eye-Brood',
    caste: '5. Nether-Sorcerers & Eldritch War-Priests (The Arcanum Castes)',
    description: 'Grotesque, floating casters covered in dozens of lidless red eyes that project heat-rays and concussive telekinetic bursts.',
    combatRole: 'Aerial omni-directional beam & telekinetic artillery',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-malakorim',
    name: 'Malakorim',
    epithet: 'The Rune-Carvers',
    caste: '5. Nether-Sorcerers & Eldritch War-Priests (The Arcanum Castes)',
    description: 'Ancient, scholarly fiends who brand weapons and the hides of younger warrior-demons with profane glyphs that burn through energy shielding.',
    combatRole: 'Anti-shield buff specialists & glyphic smith-priests',
    status: 'Fully Detailed in Draft'
  },
  // Caste 6: Nether-Behemoths & World-Breakers
  {
    id: 'breed-brontorim',
    name: 'The Dread-Goliath (Brontorim)',
    epithet: 'Living Siege Platforms',
    caste: '6. Nether-Behemoths & World-Breakers (Apex Siege-Fauna)',
    description: 'Mountain-sized monstrosities used as living siege platforms, carrying fortress towers bolted to their armored spines into battle.',
    combatRole: 'Titan-class mobile citadel & troop transport',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-vraxx',
    name: 'Abyss-Gorgon (The Vraxx)',
    epithet: 'Slag-Sea Leviathans',
    caste: '6. Nether-Behemoths & World-Breakers (Apex Siege-Fauna)',
    description: 'Massive serpentine leviathans that swim through the sea of molten slag that borders the Nether\'s deepest boundaries.',
    combatRole: 'Boundary-sea naval/magma apex predator',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'breed-kaelgoth',
    name: 'Ruin-Beast (The Kaelgoth)',
    epithet: 'Six-Legged Citadel Rams',
    caste: '6. Nether-Behemoths & World-Breakers (Apex Siege-Fauna)',
    description: 'Six-legged, blind juggernauts driven into battle on massive chains, unleashed like living battering rams against planetary citadel walls.',
    combatRole: 'Planetary wall-breaching juggernaut',
    status: 'Fully Detailed in Draft'
  }
];

// 3. ALL 102 NAMED DEMON BLOODLINES & RACES (SEED ARCHIVE TO FLESH OUT!)
export const NAMED_DEMON_BLOODLINES: NamedBloodlineGroup[] = [
  {
    id: 'bloodline-chthonic',
    categoryName: '1. Chthonic Sovereigns & Tartarean Bloodlines',
    subtitle: 'Ancient, primordial entities native to the deepest underworld layers and subterranean pits.',
    bloodlines: [
      { name: 'The Tartarokh', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kallokhor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Nadirim', notes: 'Entities born of the absolute planetary nadir', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Erebari', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vaelzeth', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Chasm-Lords', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Xur’kallath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Morkhaen', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Pit-Sovereigns', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Brak’Zul', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Deep-Crowned', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ostragoth', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-malefic',
    categoryName: '2. Malefic Sorcerers & Hex-Weavers (Deep Occult / Curse-Craft)',
    subtitle: 'Races governed by blood rituals, binding pacts, forbidden glyphs, and metaphysical curses.',
    bloodlines: [
      { name: 'The Maleficari', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kharonith', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Zul’Goresh', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Vesperi', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vorak-El', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Rite-Born', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Hex-Matrons of Kael', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Thal’Morath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Glyph-Carvers', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Morphiad', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vael-Khem', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Sanguimor', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-chaos-night',
    categoryName: '3. Primordial Chaos & Cosmic Night (Tiamat / Nyx / Void-Born)',
    subtitle: 'Entities born from pre-creation dark waters, eternal eclipses, and unshaped magical chaos.',
    bloodlines: [
      { name: 'Tiamorath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Nyxarion', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ysh’Kaldor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Zaharoth', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Khaotic Brood', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vex’Amon', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Eclipse-Walkers', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Nocturnim', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kael-Tiamat', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Void-Suckled', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ushumgal', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Zul-Mantis', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-stygian',
    categoryName: '4. Stygian Necromancers & Soul-Carriers',
    subtitle: 'Races intertwined with death-sorcery, dead gods, soul-currents, and underworld rivers.',
    bloodlines: [
      { name: 'The Acheroni', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Thanatar', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Stygian-Born', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Grave-Oracles', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Phlegethi', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Soul-Siphons', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Karon-hai', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Sepulchral', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Cocytan', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Vessel-Thieves', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Marrow-Weavers', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Lethe-Kin', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-muspel',
    categoryName: '5. Muspel-Forged & Chthonic Pyromancers',
    subtitle: 'Supernatural hellfire, ancient ash, and earth-splitting chthonic flame—pure elemental magic.',
    bloodlines: [
      { name: 'The Pyrosthath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Muspel-Brood', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kharvoth', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Cinder-Seers', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Surtr-Kin', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ignorath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Ash-Monarchs', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Pyrovellian', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Slag-Womb', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Brimstone-Archons', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Valthur', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Zul-Ignis', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-bestial',
    categoryName: '6. The Bestial Gods & Monstrous Archetypes',
    subtitle: 'Mythical horrors, chimeric beasts, and ancient predators from forgotten underworld bestiaries.',
    bloodlines: [
      { name: 'The Behemoth-Kin', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Lamashtu', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vrohkari', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Chimera-Born', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Gorgonith', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Dread-Tusked', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Brakori', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Ophidian', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Hydrakor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'The Horned-Spawn', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Scyllari', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Nemean-Kin', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  },
  {
    id: 'bloodline-independent-30',
    categoryName: '7. Independent & Sovereign Demon Lineages (30 Strains)',
    subtitle: 'Cross-pantheon and abyssal bloodlines cataloged across the Nethermost.',
    bloodlines: [
      { name: 'Azazoth', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Baelkhor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Charnelith', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Drak’Mor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Erebos-Kin', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Golgath', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Hel-Vael', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ishtar-Fiends', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Jorgun', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kallir', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Lilitan', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Makhari', status: 'Detailed' },
      { name: 'Nekroth', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ourob', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Paimonith', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Quliphot', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ravana-Spawn', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Shax’ul', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Typhon-Brood', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Ur-Kael', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Vael-Gorgor', status: 'Detailed' },
      { name: 'Xibalbi', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Yama-Kin', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Zaganor', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Belial-Spur', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Molokh-Born', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Asura-Vex', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Geryon', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Kobalith', status: 'Seed Name Only (Needs Flesh-Out)' },
      { name: 'Nergal-hai', status: 'Seed Name Only (Needs Flesh-Out)' }
    ]
  }
];

// 4. ALL 150 ASTRAL ENTITIES + TIER 5/6 & SOUL 1 TEMPORAL ANOMALIES
export const ASTRAL_TAXONOMY_GROUPS: AstralTaxonomyGroup[] = [
  {
    id: 'astral-tier5-6',
    category: 'Cognition Tier 5 & Tier 6 Baseline Astral Species',
    tier: 'Tier 5 (Electromagnetic/Low-Astral) & Tier 6 (10^9 Gap / True Astral Projection)',
    entities: [
      'Astral Trails', 'Apparitions / Phantoms', 'Eidolons', 'Wraiths',
      'Ghosts', 'Jinns', 'Specters', 'Banshees', 'Poltergeists',
      'Un-Born', 'Nachzehrer', 'Pretas', 'Gulon', 'Soul Fragments', 'Keres'
    ]
  },
  {
    id: 'astral-soul1-temporal',
    category: 'Soul 1 Destruction Fallout: Exotic Temporal Horrors',
    tier: 'Tier 7 Breach Phenomena (Triggered when a linear Soul 1 Nuke detonates)',
    entities: [
      'Temporal Spectres', 'Aeon Wraiths', 'Epoch Ghouls', 'Timeline Apparitions',
      'Chronostalkers', 'Time-Reapers', 'Entropy Stalkers', 'Paradox Hounds',
      'Chronophages', 'Temporal Anomalies', 'Chronoclasts ("Time-Breakers")',
      'Null-Timers', 'Static Shades', 'Interval Drifters'
    ]
  },
  {
    id: 'astral-1-trance',
    category: '1. Trance, Mirror & Manifestation Entities',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Speculum', 'The Phantasmagoria', 'Emanation', 'The Ideoplasm', 'The Apparitor',
      'The Simulacrum', 'The Shade of Endor', 'The Resonator', 'The Visualizer', 'The Automatism'
    ]
  },
  {
    id: 'astral-2-goetic',
    category: '2. Goetic, Grimoire & Pactional Spirits',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Familiar', 'A Familiar Stratagem', 'The Legate', 'The Pact-Keeper', 'The Imp',
      'The Cacodaemon', 'The Agathodaemon', 'The Decan', 'The Consort', 'The Under-Sign'
    ]
  },
  {
    id: 'astral-3-funerary',
    category: '3. Funerary, Graveyard & Chthonic Wraiths',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Chthonic Shade', 'The Charon', 'The Revenant', 'The Corpse-Light', 'The Psychopomp',
      'The Lemure', 'The Larva', 'The Genius Loci', 'The Mourning-Weaver', 'The Osseous Ghost'
    ]
  },
  {
    id: 'astral-4-planetary',
    category: '4. Planetary & Astrological Intelligences',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Olympic Spirit', 'The Intelligence', 'The Solar Daemon', 'The Lunar Genius', 'The Saturnian Warden',
      'The Mercurial Trickster', 'The Martial Wraith', 'The Jovial Lord', 'The Node-Walker', 'The Celestial Scribe'
    ]
  },
  {
    id: 'astral-5-liminal',
    category: '5. Liminal, Threshold & Circle Guards',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Guardian of the Threshold', 'The Warden of the Circle', 'The Janiform Spirit', 'The Key-Bearer', 'The Boundary-Stalker',
      'The Crossroads Shadow', 'The Veil-Tearer', 'The Hinge-Spirit', 'The Intermediary', 'The Sentinel of the North'
    ]
  },
  {
    id: 'astral-6-thoughtforms',
    category: '6. Thoughtforms, Tulpas & Egregores',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Egregore', 'The Tulpa', 'The Homunculus', 'The Obsession-Shade', 'The Phantasm',
      'The Malice-Weaver', 'The Glamour-Spirit', 'The Larval Thought', 'The Memory-Keep', 'The Autonomous Will'
    ]
  },
  {
    id: 'astral-7-parasites',
    category: '7. Parasites, Leeches & Energy Siphons',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Incuba', 'The Aura-Leech', 'The Miasma', 'The Cord-Cutter', 'The Golem-Feeder',
      'The Static-Worm', 'The Shadow-Clinger', 'The Vitality Sponge', 'The Discord Daemon', 'The Twilight Tick'
    ]
  },
  {
    id: 'astral-8-archons',
    category: '8. Archons, Hierarchs & Astral Judges',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Archon', 'The Arbiter', 'The Abyssal Lord', 'The Magistellus', 'The Chancellor of the Veil',
      'The Principal', 'The Inquisitor of Souls', 'The Sovereign of Lead', 'The Hierarchy Guide', 'The Aeon'
    ]
  },
  {
    id: 'astral-9-tricksters',
    category: '9. Tricksters, Vagabonds & Unbound Souls',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Vagabond-SoulFragments', 'The Impostor', 'The Fetch-Light', 'The Stray', 'The Changeling Shade',
      'The Rogue Intelligency', 'The Scavenger Wraith', 'The Banshee-Shade', 'The Mirror-Thief', 'The Nomad-Monk'
    ]
  },
  {
    id: 'astral-10-bestial',
    category: '10. Bestial, Totemic & Animal Spirits',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Wolf-Shade', 'The Serpent Guide', 'The Raven Messenger', 'The Stag Warden', 'The Lion Guardian',
      'The Spider Weaver', 'The Owl Seer', 'The Bear Sentinel', 'The Fox Trickster', 'The Dolphin Whisperer'
    ]
  },
  {
    id: 'astral-11-dream',
    category: '11. Dream, Nightmare & Oneiric Entities',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Dreamweaver', 'The Night Terror', 'The Sleepwalker', 'The Lucid Phantom', 'The Sandman',
      'The Nightmare Steed', 'The Hypnos Shade', 'The Slumbering Eidolon', 'The Dreamcatcher', 'The REM Wraith'
    ]
  },
  {
    id: 'astral-12-mythic',
    category: '12. Mythic, Legendary & Archetypal Forms',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Heroic Shade', 'The Trickster Archetype', 'The Mother Spirit', 'The Wise Old One', 'The Shadow Self',
      'The Eternal Child', 'The Warrior Ghost', 'The Sage Apparition', 'The Monster of Legend', 'The Guardian Beast'
    ]
  },
  {
    id: 'astral-13-elemental',
    category: '13. Elemental Phenomena & Weather Spirits',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Storm Herald', 'The Rainmaker', 'The Thunder Wraith', 'The Frost Phantom', 'The Sunflare',
      'The Mist Walker', 'The Gale Rider', 'The Ember Shade', 'The Dew Spirit', 'The Lightning Dancer'
    ]
  },
  {
    id: 'astral-14-machine',
    category: '14. Machine, Synthetic & Technomantic Entities',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Cogmind', 'The Data Ghost', 'The Circuit Shade', 'The Algorithmic Eidolon', 'The Nanite Swarm',
      'The Digital Phantom', 'The Clockwork Apparition', 'The Signal Wraith', 'The Byte Spirit', 'The Mechanist'
    ]
  },
  {
    id: 'astral-15-alchemical',
    category: '15. Alchemical & Elemental Essences',
    tier: 'Psyche Vibrational Spectrum (Incomplete Soul)',
    entities: [
      'The Sylph-Adept', 'The Undine-Maiden', 'The Gnome-Elder', 'The Salamander-Spark', 'The Quintessence',
      'The Calcination Ghost', 'The Coagulator', 'The Volatile Spirit', 'The Fixed Daemon', 'The Prima Materia'
    ]
  }
];

// 5. ALL 72 GOETARCHS & SOVEREIGN FACTION DYNASTIES
export const GOETARCH_72_NOBLES = [
  'Bael', 'Agares', 'Vassago', 'Samigina', 'Marbas', 'Valefor', 'Amon', 'Barbatos', 'Paimon', 'Buer',
  'Gusion', 'Sitri', 'Beleth', 'Leraje', 'Eligos', 'Zepar', 'Botis', 'Bathin', 'Sallos', 'Purson',
  'Marax', 'Ipos', 'Aim', 'Naberius', 'Glasya-Labolas', 'Bune', 'Ronove', 'Berith', 'Astaroth', 'Forneus',
  'Foras', 'Asmodeus', 'Gaap', 'Furfur', 'Marchosias', 'Stolas', 'Phenex', 'Halphas', 'Malphas', 'Raum',
  'Focalor', 'Vepar', 'Sabnock', 'Shax', 'Vine', 'Bifrons', 'Uvall', 'Haagenti', 'Crocell', 'Furcas',
  'Balam', 'Alloces', 'Camio', 'Murmur', 'Orobas', 'Gremory', 'Ose', 'Amy', 'Orias', 'Vapula',
  'Zagan', 'Valac', 'Andras', 'Flauros', 'Andrealphus', 'Kimaris', 'Amdusias', 'Belial', 'Decarabia', 'Seere',
  'Dantalion', 'Andromalius'
];

// 6. ALL 21 NETHERFIRE / SUPERNATURAL ENERGY RESERVES FROM DRAFT
export const NETHERFIRE_RESERVES_LIST: NetherfireReserve[] = [
  {
    id: 'nf-vaelburn',
    name: 'Vaelburn Spark',
    outcomeReality: 'A localized anomaly where the space-time fabric gets so intensely compressed and distorted by nether influence that the friction releases a raw, highly volatile thermal output.',
    status: 'Defined in Draft'
  },
  {
    id: 'nf-aethelfire',
    name: 'Aethelfire Flux',
    outcomeReality: 'Highly unstable, localized thermodynamic vector that occurs when the background geometry of space-time is stripped of its mathematical continuity, forcing raw potential energy to bleed into the physical world as a cold, crystalline conflagration.',
    status: 'Defined in Draft'
  },
  { id: 'nf-netherfire', name: 'Netherfire Essence', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-gloompyre', name: 'Gloompyre Pulse', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-marrowblaze', name: 'Marrowblaze Core', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-umbralburn', name: 'Umbralburn Shard', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-soulignis', name: 'Soulignis Ether', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-cryptblaze', name: 'Cryptblaze Fuel', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-sunderfire', name: 'Sunderfire Current', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-cinderveil', name: 'Cinderveil Spark', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-netherite', name: 'Netherite Catalyst', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-vaelsteel', name: 'Vaelsteel Embers', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-chthonpyre', name: 'Chthonpyre Ash', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-marrowslag', name: 'Marrowslag Dust', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-cryptfire', name: 'Cryptfire Shard', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-soulcinder', name: 'Soulcinder Slag', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-voidignis', name: 'Voidignis Fluid', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-gloomembers', name: 'Gloomembers Dust', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-sunderburn', name: 'Sunderburn Fuel', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-aethelpyre', name: 'Aethelpyre Remnant', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' },
  { id: 'nf-ignitionslag', name: 'Ignition Slag', outcomeReality: 'Awaiting specific outcome blueprint & depletion state definition.', status: 'Named Seed (Needs Outcome Vector)' }
];

// 7. ALL 31 OCCULT FRAMEWORKS FROM DRAFT
export const OCCULT_FRAMEWORKS_LIST: OccultFrameworkRecord[] = [
  {
    id: 'fw-pactional',
    name: 'I. The Pactional Jurisprudence System',
    epithet: 'The Juridical Manifold',
    mythos: 'Derived from Solomonic Exorcism. Rejects raw willpower; treats the universe as an unyielding cosmic Legislative Grid governed by ancient treaties signed at the beginning of chaos.',
    mechanic: 'Practitioners file Metaphysical Injunctions by locating a historical Clause-Seal (geometric contract dictating how reality must behave).',
    hardware: 'The Writ: Ink alloy of lead, cinnabar, and vitriol rapidly written as a logical argument onto sympathetic parchment inside a chalk perimeter loop.',
    outputAndKickback: 'If logic matches ancient treaties, the local timeline is legally compelled to yield and drops resistance. Misinterpreting a single sub-clause is treated as contempt of reality—violently snapping space back and fracturing the caster\'s Soul 1 hardware.',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'fw-decanic',
    name: 'II. Decanic Vector Anchoring',
    epithet: 'The Chrono-Geometric Gearbox',
    mythos: 'Rooted in Sabian astral mechanics of the Picatrix and the 36 Faces of the zodiac. Treats the universe as a rotating mechanical clockwork distribution grid leaking frequencies of potential energy.',
    mechanic: 'Dependent on Mundane Elections—the exact millisecond a cosmic coordinate cuts through the local horizon.',
    hardware: 'The Alloy Antennas: Human nervous systems fry if holding the current directly. Requires pre-forged metal hardware (e.g., iron gear quenched in toxic nightshade oil for Mars Decans) etched at the exact millisecond with a non-linguistic Charaktêr scratch.',
    outputAndKickback: 'Permanently traps the down-flowing cosmic current. The Inspirited object radiates a narrow, objective reality-warping field (local time dilation or atomic degradation) running purely off structural alignment.',
    status: 'Fully Detailed in Draft'
  },
  {
    id: 'fw-suffumigative',
    name: 'III. Suffumigative Phantasmata',
    epithet: 'The Atmospheric Curdle',
    mythos: 'Inspired by Greco-Egyptian papyri and Chaldean sorcery. Non-corporeal entities and nether currents are blind to standard matter and require a dense, chemically specific Atmospheric Medium to project their silhouette.',
    mechanic: 'The magician acts as an exotic chemical engineer burning dangerous resin and mineral compounds (crushed henbane, sulfur, myrrh, powdered dried bone).',
    hardware: 'Enclosed chamber saturated with heavy smoke + rhythmic intonation of Barbarous Names (non-translatable vocal frequencies spiking air pressure).',
    outputAndKickback: 'Sound waves force heavy smoke particles to curdle in mid-air into a localized Phantasmata (shifting geometric silhouette) used as a physical anchor until the chemical fuel burns out.',
    status: 'Fully Detailed in Draft'
  },
  // Named Seeds from the Classified List
  ...[
    'Hermetic Qabalah & Golden Dawn Thaumaturgy',
    'Chaldean-Egyptian Theurgic Phantasmata',
    'Solomonic Exorcism',
    'The Picatrix Talismanic Inspiritment',
    'Solomonic Chain',
    'Honorian Seals',
    'Abramelin Operation',
    'Weyerian Hierarchy',
    'Notory Chants',
    'Sabian Pneuma',
    'Agrippan Sympathies',
    'Galdrabók Staves',
    'Heptameron Hours',
    'Trithemian Code',
    'PGM Barbarous Names',
    'Iamblichan Theurgy',
    'Abraxas Matrix',
    'Magia Naturalis',
    'Chaldean Suffumigation',
    'Charaktêres',
    'Synthemata',
    'Sigillum Dei',
    'Exaltation Alloys',
    'Mundane Elections',
    'Astro-Thaumaturgy',
    'Notae-Matrices',
    'Pneuma-Siphons',
    'Chaos Magic',
    'Egregoric & Consensus Reality'
  ].map((name, i) => ({
    id: `fw-seed-${i}`,
    name,
    status: 'Named Seed (Needs Mechanics)' as const
  }))
];

// 8. ACTIVE BRAINSTORMING & NAMING FORGE SEEDS
export const BRAINSTORM_FORGE_SEEDS: BrainstormPromptSeed[] = [
  {
    id: 'bf-cat2-cat3',
    domain: 'Missing Category Races',
    question: 'Who are the flagship Category 2 (formless thinking nodes) and Category 3 (emotionless memory-less precognitive calculators) races, and what happens when they collide with Humans?',
    contextFromDraft: 'The draft establishes that Category 3 races lack emotions and permanent pattern recognition ("they don\'t learn from past mistakes, they lack long-term memory, they learn by the way, predict by the way"), yet it takes a Cat 3 race to utilize MAGIC steadily. Meanwhile Cat 2 has zero form and zero sentience, yet can think and is part of Category X!',
    pitchedIdeas: [
      {
        name: 'The Markovian Lattice (or The Ephemerids / Tachyon-Calculators)',
        etymology: 'Named after Markov Chains (memoryless stochastic processes where future states depend ONLY on the current state, never the past).',
        concept: 'A Category 3 race whose brains physically wipe their synaptic slate every 12 seconds. Because they carry zero trauma, zero nostalgia, and zero past bias, they experience zero psychological drag when simulating the future—allowing them to align Many-Worlds quantum gaps with cold, mathematical precision, even though they cannot remember why they started a war ten minutes ago.',
        restrictorPlate: 'Zero long-term memory: if an opponent disrupts their current 12-second calculation window, they must re-derive their enemy\'s entire combat style from scratch.'
      },
      {
        name: 'The Silicon-Blind / Noetic Mycelia (Category 2)',
        etymology: 'Noetic (pure intellect/thought) + non-sentient subterranean/quantum networks.',
        concept: 'A Category 2 "race" that has no body, ego, or self-awareness—existing purely as a self-executing mathematical proof drifting through planetary magnetospheres. It "thinks" only in geometric boundary conditions, accidentally warping local gravity and biology whenever a mortal city\'s architecture violates its equation.',
        restrictorPlate: 'Completely lacks ego or survival instinct; can be "trapped" by feeding it an unsolvable recursive geometric paradox.'
      }
    ]
  },
  {
    id: 'bf-cat5-benevolent',
    domain: 'Missing Category Races',
    question: 'The draft says Category 5 manipulation "doesn\'t always mean malicious" and that "other entities that aren\'t malevolent exist on the other end of the spectrum." Who are the Anti-Netherbound Category 5s?',
    contextFromDraft: 'Netherbound Category 5s exploit "Bad is Stronger than Good" (threat simulation bias). But the draft also lists evolutionary algorithms for Gratitude, Reciprocal Altruism, Love/Attachment, and Awe.',
    pitchedIdeas: [
      {
        name: 'The Eunoia-Weavers (or The Covenant Seraphim / Axiomatic Symbiotes)',
        etymology: 'Eunoia (Greek: "beautiful thinking / well-mind") + Reciprocal Altruism game theory.',
        concept: 'Category 5 entities bound to the evolutionary psychology of Hyper-Cooperation and Reciprocal Altruism. Because "Bad is stronger than Good" in raw survival urgency, a single human\'s gratitude is weaker than their fear—so these Category 5s must link thousands of Category 4 minds into synchronized "Trust Lattices" (festivals, oaths, shared martyrdom) to generate enough simulation weight to rival a Demon.',
        restrictorPlate: 'If betrayal or "cheating" (evolutionary game theory defection) occurs inside their linked mortal host group, their ontological boundary snaps and their power instantly flatlines.'
      }
    ]
  },
  {
    id: 'bf-bloodline-fleshout',
    domain: 'Unfleshed Demon Bloodlines',
    question: 'Out of the 102 named Demon Bloodlines (Tartarokh, Nadirim, Hex-Matrons of Kael, Void-Suckled, Marrow-Weavers, Lethe-Kin, Quliphot, etc.), which ones are major faction players vs. feral ecological horrors?',
    contextFromDraft: 'The draft gives full combat & biological breakdowns for 22 breeds (Khorvath, Skorvath, Vael-Gorgers, etc.), and then drops 102 evocative bloodline names across 7 lists.',
    pitchedIdeas: [
      {
        name: 'The Nadirim ("Born of the Absolute Planetary Nadir")',
        etymology: 'Nadir (lowest astronomical/gravitational point directly beneath an observer) + Hebrew/Semitic plural -im.',
        concept: 'Entities born at the exact center-of-gravity core of dead or hollowed planets where gravitational vectors cancel out in every direction. They wield inverted barycenter mechanics—making their own sternum the "downward" gravitational nadir of a room so enemies fall *upward* or *sideways* into their blades.',
        restrictorPlate: 'Must remain anchored to a local center of mass; if knocked airborne away from solid planetary crust, their internal gravity inverts and crushes their own organs.'
      },
      {
        name: 'The Lethe-Kin & Marrow-Weavers (Stygian Soul-Carriers)',
        etymology: 'Lethe (Greek underworld river of forgetfulness/oblivion).',
        concept: 'Specialists in stripping long-term pattern recognition from Category 4 mortals—temporarily lobotomizing a human into a Category 3 state so the mortal\'s raw precognitive engine can be hijacked like a biological GPU without emotional interference.',
        restrictorPlate: 'Cannot harm a target who has already forgotten their own name (Tey-Ren immunity).'
      }
    ]
  },
  {
    id: 'bf-gatekept-frameworks',
    domain: 'Classified Frameworks',
    question: 'How do the "Astral Hit-Squads" & Neurological Gaslighters actually hunt down mortals who accidentally discover a Gatekept Framework?',
    contextFromDraft: 'EXTREME MAJOR POINT in draft: Frameworks are SO GATEKEPT that merely becoming aware of a specific framework leads to being hunted by Astral Entities or other supernatural beings—some tamper with memories, some physically manifest to gaslight the target, some mess with evolutionary nerve/neurology to prevent the simulation from compiling, and some torture/kill.',
    pitchedIdeas: [
      {
        name: 'The Agnosia Hounds / Pneuma-Censors (Framework Enforcement Ecology)',
        etymology: 'Agnosia (neurological inability to process sensory information or recognize objects/concepts).',
        concept: 'Specialized Astral/Category 5 enforcement parasites attached like DRM (Digital Rights Management) to hyper-classified frameworks. The moment a mortal brain starts simulating the specific mathematical angle of a forbidden framework, the entity induces targeted *Wernicke’s Aphasia* or *Visual Agnosia*—making the magician physically unable to read their own chalk sigils, or hallucinate that their ritual room is on fire.',
        restrictorPlate: 'They only trigger when the specific probability spectrum of that framework is simulated; a practitioner using Category 3 "memoryless" calculation or Mu-Ki null-state can slip under their radar.'
      }
    ]
  },
  {
    id: 'bf-netherfire-chemistry',
    domain: 'Netherfire Fuels',
    question: 'We have 19 named Netherfire fuels (Gloompyre Pulse, Marrowblaze Core, Soulignis Ether, Cryptblaze Fuel, Vaelsteel Embers, etc.) whose exact outcome realities and depletion states (solid/liquid/gas) haven\'t been written yet. How should we differentiate them?',
    contextFromDraft: 'Vaelburn Spark (spacetime compression thermal friction) and Aethelfire Flux (stripped mathematical continuity -> cold crystalline conflagration) are defined. The draft notes that fuels deplete differently: "Some may deplete like liquid, others may deplete like solid."',
    pitchedIdeas: [
      {
        name: 'Marrowblaze Core (Sub-Skeletal Calcination Fuel)',
        etymology: 'Marrow + Blaze.',
        concept: 'Depletes like a sublimating solid chalk rod inside the caster\'s femur. Outcome Reality: Collapses the timeline toward spontaneous internal osteo-combustion, igniting the calcium-phosphate lattice of bones within a 5-meter radius while leaving cloth and outer skin untouched.',
        restrictorPlate: 'Requires line-of-sight acoustic resonance with skeletal mass; useless against chitinous (Skorvath) or non-skeletal entities.'
      },
      {
        name: 'Voidignis Fluid (Zero-Kelvin Photonic Burn)',
        etymology: 'Void + Latin Ignis (Fire).',
        concept: 'Depletes like a heavy, frictionless superfluid that drips upward when spent. Outcome Reality: Forces a Many-Worlds gap where combustion consumes *light and heat* rather than oxygen, creating pitch-black fireballs that leave targets frostbitten and blind.',
        restrictorPlate: 'Extinguishes instantly if exposed to high-output solar plasma (Tejas-Ignis or Tonalli-Ray).'
      }
    ]
  }
];
