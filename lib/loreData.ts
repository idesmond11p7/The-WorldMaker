// Canonical lore database for Ur-Worlds / ForeverWorlds
// Faithfully transcribed from primary source materials

export interface LoreArticle {
  id: string;
  title: string;
  kicker: string;
  category: 'Cosmology' | 'Magic & MWI' | 'Ki & Somatics' | 'Cacodictyology' | 'Realms & Sectors' | 'Creative Philosophy';
  summary: string;
  content: string;
  sourceSection: string;
  tags: string[];
  establishedFacts: string[];
  inferredPrinciples: string[];
  unresolvedQuestions: string[];
}

export interface HierarchyItem {
  id: string;
  number: number;
  name: string;
  rootNumber: number;
  domain: string;
  threatTier: 'Prime' | 'Cataclysmic' | 'Subterranean' | 'Cognitive' | 'Axiomatic';
  description: string;
}

export interface CacodictyologyRoot {
  rootNumber: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  hierarchies: HierarchyItem[];
}

export interface FuelReservoir {
  id: string;
  name: string;
  sector: 'Vedic & Dharmic' | 'Kemetic & Sumerian' | 'Mesoamerican' | 'Norse & Runic';
  state: string;
  mythicRoot: string;
  axiomaticVector: string;
  fuelGrade: 'Volatile' | 'Superfluid' | 'Plasma' | 'Heavy Nectar' | 'Vitrified';
}

export interface KiType {
  name: string;
  kanji: string;
  designation: string;
  source: string;
  visualSignature: string;
  somaticMechanism: string;
  environmentalBehavior: string;
}

export interface KiVersion {
  version: string;
  name: string;
  kanji: string;
  state: string;
  manifestation: string;
  operationalNature: string;
}

export interface KiVariant {
  name: string;
  kanji: string;
  designation: string;
  specialization: string;
  visuals: string;
  mechanics: string;
}

export interface UnderworldRealm {
  id: string;
  name: string;
  sector: string;
  visuals: string;
  dominantEntities: string;
  loreContext: string;
}

export interface InvertedBeastRealm {
  id: string;
  name: string;
  mirrorAnimal: string;
  rulingCaste: string;
  nature: string;
}

export interface DossierRecord {
  id: string;
  title: string;
  type: 'Character' | 'Creature' | 'Artifact' | '3D Production Spec' | 'Custom Lore';
  categoryTier: 'Category 3' | 'Category 4' | 'Category 5' | 'Category 7' | 'Artifact' | 'Environment';
  summary: string;
  description: string;
  visualDirection: string;
  soundDesignNotes: string;
  production3DNotes: string;
  associatedFuelOrKi: string;
  possibilityResistanceTier: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// 1. Lore Articles
export const CANONICAL_LORE_ARTICLES: LoreArticle[] = [
  {
    id: 'cosmology-ontology',
    title: 'Cosmic Architecture: Physical, Metaphysical, and the Non-Corporeal',
    kicker: 'Cosmology & Existential Layers',
    category: 'Cosmology',
    summary: 'The threefold division of supernatural existence, from matter phase-states to entities completely blind to time-space and mass.',
    content: `The Ur-Worlds supernatural ecosystem does not operate on a simple spectrum of ambient magic. Instead, existence is divided across three distinct operational layers:

1. **Actual Matter States**: Supernatural energies express freely in physical matter states, including classical states (solid, liquid, gas, plasma) and exotic matter phases (Quark-Gluon Plasma, Degenerate Matter, Bose-Einstein Condensate, Fermionic Condensate, Superfluid, Supersolid, Time Crystals, and Superionic Ice).
2. **Metaphysical Forms**: Abstract and fundamentally un-explainable by physical observation, violating the laws of infinite possibility by being impossible to physicality.
3. **Completely Non-Physical Forms**: Entities lacking zero mass, unaffected by gravity, unrecognizable by time-space, and strictly incapable of being observed within the observable universe.

These energies circulate as Fields, Reserves, Connected Networks, Essence, Realms of Energy, and En-Grafted structures.`,
    sourceSection: 'Supernatural Ecosystem / Energy Ecology',
    tags: ['Cosmology', 'Ontology', 'Matter States', 'Metaphysics'],
    establishedFacts: [
      'Supernatural energies can manifest in any physical matter state from plasma to time crystals.',
      'Metaphysical forms have zero mass and are completely unaffected by gravity.',
      'Time-space is blind to non-physical metaphysical forms.'
    ],
    inferredPrinciples: [
      'The cosmology grounds high-concept fantasy in advanced particle physics and thermodynamics.',
      'Physical laws are not replaced by magic; magic manipulates the quantum probabilities underlying physical laws.'
    ],
    unresolvedQuestions: [
      'What boundary mechanism prevents non-physical forms from accidentally collapsing into observable spacetime?',
      'Are en-grafted energies permanently welded to their hosts or can they be harvested without host death?'
    ]
  },
  {
    id: 'category-species-taxonomy',
    title: 'The Category Race Hierarchy: From Amoebae to Axiomarchical Authority',
    kicker: 'Bio-Manifold & Cognitive Scaling',
    category: 'Cosmology',
    summary: 'Taxonomy of living organisms across the Bio-Manifold based on cognitive capacity, emotional algorithmic software, and reality-warping authority.',
    content: `Life in the Bio-Manifold (all realms supporting evolutionary life) is classified by ontological category:

* **Category 1**: Purely physical organisms lacking mental/precognitive capabilities (e.g. Amoeba). Bound entirely by classical physics.
* **Category 2**: Mental & psychic life that lacks sentient form but can think conceptually.
* **Category 3**: Sentient and intellectual life with precognitive simulation capability, but lacking emotions and permanent pattern recognition. They learn and predict on the fly without long-term memories of past mistakes, allowing steady, calculated Many-Worlds reality warping.
* **Category 4**: Sentient, intellectual, and emotional life (e.g. Humans). The most populated race. Their emotional software accelerates and weights precognitive simulations, unconsciously warping reality on a massive scale.
* **Category 5**: Advanced beings (including Netherbound entities) with strict ontological boundaries. They manipulate and predate upon Category 4 psychology to amplify reality warping.
* **Category 7**: Absolute authority entities wielding True Netherarchesial / Axiomarchical Reality Warping beyond MWI, touching Metachaos and transfinite cardinals (beyond ZFC set theory, Berkeley Cardinals).`,
    sourceSection: 'The Ultimate Hierarchy / Cognition Tiers',
    tags: ['Species', 'Bio-Manifold', 'Cognition', 'Category Races', 'Evolution'],
    establishedFacts: [
      'Category 4 races are the most common in the Bio-Manifold.',
      'Category 3 lacks emotions and long-term memory, making them slower but capable of steady MWI manipulation.',
      'Category 7 operates beyond countably infinite Many-Worlds, tapping into transfinite Metachaos.'
    ],
    inferredPrinciples: [
      'Emotions are not moral feelings; they are evolutionary cognitive algorithms that weight predictive threat simulation.',
      'Higher category races do not merely possess higher energy; they possess higher ontological authority over reality axioms.'
    ],
    unresolvedQuestions: [
      'What characterizes Category 6 in the cosmic scale, as the draft jumps from Cat 5 to Cat 7?',
      'Can a Category 4 individual permanently ascend to Category 5 without losing their human emotional hardware?'
    ]
  },
  {
    id: 'soul-architecture-bifurcation',
    title: 'Soul 1 vs. Soul 2: Temporal Destinies and MWI Erasure',
    kicker: 'Metaphysical Anatomy',
    category: 'Cosmology',
    summary: 'The bifurcation into semi-spiritual linear temporal anchors (Soul 1) and abstract Many-Worlds blueprint souls (Soul 2), and the catastrophic physics of their destruction.',
    content: `Unlike conventional RPG systems where a soul is a single ghost-essence, the Ur-Worlds recognizes two distinct soul systems:

### Soul 1: Semi-Spiritual Temporal Anchor
* **Substrate**: Quantum particles, information particles, temporal crystals, and quantum foam.
* **Nature**: Linear and temporal. Houses the past, present, and probable futures of an individual. Reading Soul 1 allows full trajectory forecasting.
* **Destruction Consequence**: **Supernatural Nuke**. Shattering Soul 1 tears local spacetime, weakens dimensional temporal mechanisms, causes timeline resets, and draws predatory temporal horrors (Chronostalkers, Paradox Hounds, Epoch Ghouls, Chronoclasts, and Null-Timers).

### Soul 2: Spiritualities 1
* **Substrate**: Abstract, non-Euclidean, non-temporal Many-Worlds possibility matrix.
* **Nature**: Indefinite collection of all realities and possibilities linked to a single point.
* **Destruction Consequence**: Erases the very possibility of the entity existing across any Many-Worlds timeline. Paradoxically less catastrophic to local physical dimensions than Soul 1, but ontologically absolute.`,
    sourceSection: 'Difference Between Astral, Semi-Spiritual & Spiritualities',
    tags: ['Soul', 'Metaphysics', 'Temporal Mechanics', 'MWI'],
    establishedFacts: [
      'An individual possesses both Soul 1 (temporal anchor) and Soul 2 (MWI possibility blueprint).',
      'Destroying Soul 1 behaves like a supernatural nuclear detonation and fractures local temporal mechanics.',
      'Destroying Soul 2 deletes an entity across all timelines without local dimensional collapse.'
    ],
    inferredPrinciples: [
      'Linear time is a local stabilization phenomenon supported by Soul 1 structures.',
      'Temporal horrors function as cosmic immune responses feeding on leaked causality.'
    ],
    unresolvedQuestions: [
      'How do beings with severed Soul 1s maintain physical cohesion before collapsing into nothingness?',
      'Can Soul 2 be modified without destroying Soul 1?'
    ]
  },
  {
    id: 'magic-mwi-gap-collapse',
    title: 'MAGIC: Many-Worlds Alignment via Gap Induction & Collapse',
    kicker: 'Power Mechanics & Theoretical Physics',
    category: 'Magic & MWI',
    summary: 'The scientific mechanics of reality warping: quantum superposition, wave-particle duality, precognitive simulations, and Possibility Resistance.',
    content: `In the Ur-Worlds, magic is defined as **"Many-Worlds Alignment via Gap Induction & Collapse" (MAGIC)**.

* **Quantum Reality**: Superposition particles are not in hidden static states; they exist as abstract probability waves. Magic manipulates these probabilities at the quantum foam level.
* **The Gun System vs. The Mana Laser**: Conventional fiction uses a "Mana Laser" (pouring a generic pool of mana into a spell). The Ur-Worlds uses a **Military Reserve Bank / Gun System**:
  1. **The Shell (The Outcome)**: An empty physical chamber that has no power of its own.
  2. **The Bullet (The Ammunition)**: Every specific outcome demands a designated supernatural fuel reserve (e.g. Aethelfire Flux for spatial outcomes, Tejas-Flame for atomic thermal bonding).
  3. **The Blueprint (Precognitive Simulation)**: The user runs a frame-perfect internal simulation of how the future event occurs. The fuel forces that mental blueprint to collapse into the physical world.
* **Possibility Resistance**: Cost is not based on physical mass, but on how improbable the simulated outcome is relative to the natural timeline. Near-natural events cost practically zero fuel; unnatural deviations encounter massive Possibility Resistance and cause severe neural and hardware strain.`,
    sourceSection: 'Hypervisualization Mechanics / MWI MAGIC Imports',
    tags: ['MAGIC', 'Quantum Mechanics', 'Many-Worlds', 'Possibility Resistance', 'Gun System'],
    establishedFacts: [
      'Magic is formally titled MAGIC (Many-Worlds Alignment via Gap Induction & Collapse).',
      'Outcomes require matching fuel types; you cannot fire a spatial chamber with kinetic fuel.',
      'Cost is governed by Possibility Resistance, not mass or volume.'
    ],
    inferredPrinciples: [
      'Casters act as quantum measurement devices selecting timeline eigenstates through mental visualization.',
      'Magic is inherently probabilistic calculation reinforced by specialized physical/spiritual propellants.'
    ],
    unresolvedQuestions: [
      'What happens when two contradictory Category 5 simulations attempt to collapse the same quantum gap simultaneously?',
      'Can Possibility Resistance be bypassed using artificial quantum resonators or talismans?'
    ]
  },
  {
    id: 'ki-somatic-constant',
    title: 'Ki (気): The Somatic, Relational, and Kinetic Constant of Biology',
    kicker: 'Power Mechanics & Animistic Biology',
    category: 'Ki & Somatics',
    summary: 'The physical constant of mortal biology asserting territory, mass, and velocity against an indifferent universe, and its brutal somatic costs.',
    content: `Ki is not an act of reality warping, nor is it a quantum calculation. It is the un-warped pressure of living organisms asserting physical territory, structural mass, and kinetic velocity against an indifferent cosmos.

### The Four Primal Types (Ichirei Shikon)
1. **Ara-Ki (荒気 — Kinetic Vector)**: Pure forward momentum, destructive kinetic discharge, cardiovascular overpressure, barometric air crash.
2. **Nigi-Ki (和気 — Cohesive Vector)**: Structural equilibrium, tissue stabilization, bone densification, ground friction maximization.
3. **Kushi-Ki (奇気 — Prescient Vector)**: Non-cognitive spatial intuition, spinal reflex bypass, acoustic wake erasure.
4. **Saki-Ki (幸気 — Trophic Siphon)**: Metabolic scavenging, environmental thermal/moisture siphoning, vital assimilation.

### The Five Processing Versions
* **Version 0 (Gen-Ki)**: Metabolic baseline of resting carbon life.
* **Version I (Ren-Ki)**: Coiled somatic tension, sub-dermal impact armor, non-linear hydraulic bursts.
* **Version II (Gō-Ki)**: Atmospheric rupture, concussive Kiai roars, supersonic air-wedges.
* **Version III (Yō-Ki)**: Inverted bestial warp, telluric ground-coupling, anatomical mutations.
* **Version IV (Mu-Ki)**: Null-somatic void, sensory/thermal/seismic extinction, zero pre-strike tells.

### Somatic Toll
Overdriving Ki causes pore-steam thermal dissipation (temperatures spiking past 110°F), lactic vitrification (muscles calcifying into brittle stone-like paralysis), and capillary blowouts (eyes filling with blood, scleral hemorrhaging).`,
    sourceSection: 'Universal Ontological Taxonomy: Ki (気)',
    tags: ['Ki', 'Somatics', 'Ichirei Shikon', 'Somatic Toll', 'Martial Arts', 'Biology'],
    establishedFacts: [
      'Ki does not warp reality; it is a purely physical and somatic constant of biology.',
      'Ki taxes physical meat, blood, and bone, not Possibility Resistance.',
      'Peak Ki output vents superheated steam through pores to prevent internal organ cooking.'
    ],
    inferredPrinciples: [
      'Ki operates as an evolutionary counter-balance to MWI reality-warping, giving physical biology autonomous territorial sovereignty.',
      'Somatic conditioning (Nigi-Ki) is mandatory before high-velocity discharge (Ara-Ki) to avoid vascular blowouts.'
    ],
    unresolvedQuestions: [
      'Can an entity seamlessly alternate between high-output Gō-Ki and Many-Worlds MAGIC in the same combat encounter?',
      'Are non-carbon biological entities in other realms capable of adapting Ki through non-organic mineral channels?'
    ]
  },
  {
    id: 'cacodictyology-the-nethermost',
    title: 'Cacodictyology & The Nethermost: 144 Negative Ontological Hierarchies',
    kicker: 'Infernal Taxonomy & Metaphysics',
    category: 'Cacodictyology',
    summary: 'The overarching study of negative supernatural networks binding across the Bio-Manifold, the 12 Roots, and the 144 existential hierarchies.',
    content: `Cacodictyology is the overarching science of how connected networks and fields of negative non-physical energy bind across the Bio-Manifold.

The Nethermost (also known as the Deep-Sunk, Foundationless, Sunken, Enders, and Under-Realmers) is structured into Twelve Roots containing 144 distinct Ontological Hierarchies:
* **Root I: Pre-Ontological Abysses** (The Causeless Void, Ontological Fracture, Null-Point Abyss...)
* **Root II: Mathematical & Physical Bleeds** (Law-Breakers, Probability Tyrants, Entropic Monarchs...)
* **Root III: Chronological & Many-World Fractures** (Timeline Splinters, Epoch-Ghouls, Paradox Hounds...)
* **Root IV: High Goetic & Pactional Boles** (True Legates, Sovereign Crowns, Pact-Masters...)
* **Root V: Bio-Manifold & Collective Egregores** (Egregore Over-Lords, Tribal Nightmares, Aura-Siphons...)
* **Root VI: Chthonic, Funerary & Dead Realms** (Chthonic Arbiters, Revenant Lords, Grave-Soil Clingers...)
* **Root VII: Astrological & Planetary Inversions** (Archon Hierarchs, Inverted Decans, Solar Inversions...)
* **Root VIII: Alchemical & Material Dissolutions** (Prima Materia Defects, Superfluid Drowners, Time-Crystal Rot...)
* **Root IX: Liminal & Threshold Outcasts** (Guardians of Threshold, Hinge-Thieves, Crossroads Shadows...)
* **Root X: Cognitive & Psychological Siphons** (Discord Daemons, Static-Worms, Grief-Eater Ghouls...)
* **Root XI: Traditional Religious & Folk Sins** (Asmodean Brood, Leviathan Maw-Spawns, Luciferian Sovereigns...)
* **Root XII: Metaphysical Impossible Outcasts** (Non-Corporeal Impossible, Space-Time Blind, Absolute En-Grafted Apex...)

These tiers describe existential ontology and tier authority rather than biological species.`,
    sourceSection: 'The NETHERMOST / Cacodictyology Tree',
    tags: ['Cacodictyology', 'Nethermost', '144 Hierarchies', 'Demons', 'Roots'],
    establishedFacts: [
      'The 144 hierarchies are ontological classifications of existence and tier, not mere biological races.',
      'Root I precedes existence itself; Root XII operates beyond all spacetime and observability.',
      'Demons embody Ender-Traits: they obliterate and end civilizations rather than engage in active theatrical torture.'
    ],
    inferredPrinciples: [
      'The Nethermost is an inverted structural reflection of cosmic order, anchored into mathematical constants and psychic debt.',
      'Understanding a specific Root allows practitioners to bind or insulate against its corresponding supernatural bleeds.'
    ],
    unresolvedQuestions: [
      'What authority or entity cataloged the 144 Hierarchies originally?',
      'Do the 144 Hierarchies compete for territorial dominance or are they mechanically segregated across dimensional layers?'
    ]
  },
  {
    id: 'underworld-sectors-cold-war',
    title: 'The Great Cold War of the Underworld Sectors & Inverted Beast Manifolds',
    kicker: 'Geopolitics & Dimensional Ecology',
    category: 'Realms & Sectors',
    summary: 'The geopolitical tensions between Abrahamic Goetia, Vedic Narakas, East Asian Diyu, Kemetic Duat, and the Inverted Mirror Beast biospheres.',
    content: `The Underworld is not a single cavern; it is a colossal geopolitical battleground spanning nine major mythological sectors and outer Inverted Beast Manifolds:

### The Cold War Dynamics
1. **Solomonic-Hellenic Border Friction**: The 72 Goetic Pillar Clans (Bael, Paimon, Asmodeus) constantly probe the House of Hades for soul-rights along the underworld rivers (Acheron, Phlegethon, Cocytus).
2. **The Diyu-Naraka Accord**: The Ten Courts of Yanluo and Lord Yama's Court in Yamaloka exchange records between the *Agrasamdhani* and the *Scrolls of Mount Fengdu* to track escaped souls.
3. **The Primordial Wildcards**: Factions like Apep in Egypt and Typhon's Chained Brood in Greece bow to no courts. When their cosmic anchors loosen, all civilized infernal dynasties must mobilize joint shock-legions to prevent total annihilation into the Void.

### Inverted Beast Manifolds
Tethered across the outer boughs of the Void-Tree are mirror biospheres where mortal animals are inverted into predatory demon dimensions:
* **Bast-Irkalla** (Feline / Shadow-Stalkers of Vepar): Absolute silence; feline-claw spires; assassination via shadow-severing.
* **Mal-Caballus** (Equine / Nightmares of House Orobas): Hypersonic salt flats; skinless thunder-steeds; spatial-drag gravity.
* **Canis-Hades** (Canine / Cerberean & Garmr Broods): Labyrinthine slate ravines with iron briars; smelling soul-guilt across rifts.
* **The Ophi-Nadir** (Serpentine / Nagas & Typhonian Spawns): Venom oceans; petrification gazes; non-Euclidean spatial coils.
* **Vespa-Tartaros** (Insectoid / Zebub-Brood): Swarms of millions hollowing out subterranean continents.
* **Corvus-Gallow** (Avian / Stymphalian Harpies & Stolas-Kin): Sky-terrors scouting death-prophecy.`,
    sourceSection: 'The Void-Tree Sovereign Faction Grid & Underworld Realms',
    tags: ['Underworld', 'Geopolitics', 'Goetic', 'Vedic', 'Diyu', 'Inverted Beast Manifolds'],
    establishedFacts: [
      'The Goetic 72 clans operate under the Seven Arch-Princes of Sin.',
      'Diyu is structured as an imperial bureaucracy of 10 Courts, distinct from Goetic feudalism.',
      'Inverted Beast Manifolds are predatory mirror biospheres of mortal fauna.'
    ],
    inferredPrinciples: [
      'Infernal politics are driven by soul currency and ontological real-estate in the quantum foam.',
      'Sovereigns maintain cold wars because open conflict risks awakening uncreated primordial horrors (Apep, Typhon, Causeless Void).'
    ],
    unresolvedQuestions: [
      'How are diplomatic treaties between Diyu and Yamaloka enforced across non-Euclidean dimensional borders?',
      'Can mortal travelers safely traverse the Inverted Beast Manifolds using specialized acoustic or photonic dampeners?'
    ]
  },
  {
    id: 'ultimate-cognition-hierarchy-13-tiers',
    title: 'The Ultimate Hierarchy of Cognition: The 13 Ontological Tiers',
    kicker: 'Cognition & Metaphysical Scaling',
    category: 'Cosmology',
    summary: 'The complete 13-rung ladder from purely biological organisms to Meta-Conceptual mathematical absolute infinity, and why cognitive depth does not equal decision-making intelligence.',
    content: `The draft establishes "THE ULTIMATE HIERARCHY" of Cognition—explicitly noting that perceptual and simulatory depth is NOT a grade of overall intelligence in everyday decision-making, but of ontological reach:

1. **Tier 1 — Physical & Biological**: Purely physical organisms lacking mental or precognitive capabilities (e.g., Amoeba).
2. **Tier 2 — Mental & Psychic**: Entities capable of conscious thought (e.g., baseline humans).
3. **Tier 3 — Extra-Psychic & Deep-Subconscious Cognition & Intuition**: The "sixth sense." Deeper cognitive and perceptual capabilities enabling high-end internal simulations.
4. **Tier 4 — Telepathic & Psionic-Mindlinks (Hive Mind)**: Deeper collective bonds and hyper-simulatory capabilities; includes entities such as virtual mental diseases.
5. **Tier 5 — Micro-Telekinesis & Low-End Astral Capabilities**: Synchronized with electromagnetic fields of entities; not necessarily magical. Includes *Astral Trails, Apparitions / Phantoms, Eidolons, Wraiths*.
6. **Tier 6 — Telekinesis & Astral**: Separated from Tier 5 by a **massive gap in magnitude of order 9 ($10^9$) and above**. Actual abilities like Astral Projection unlock here. Includes *Ghosts, Jinns, Specters, Banshees, Poltergeists, Un-Born, Nachzehrer, Pretas, Gulon, Soul Fragments, Keres*.
7. **Tier 7 — Semi-Spiritual & High-End Astral**: Composed of actual quantum particles, information particles, temporal crystals, and quantum foam. Virtual/silicon-deep, subject to mathematical laws, and **comprehensible by a finite processing mind**. Locus of **Soul 1**.
8. **Tier 8 — Spirituality 1 (Abstract & Non-Corporeal)**: Non-Euclidean, unbounded by time and space, zero mass, pure chaos repetitions. Not entities, but **destinies** (all past, present, and future possibilities linked to one point). Breaks mathematical laws and **requires an Infinite/Indefinite Processing Mind**. Locus of **Soul 2**.
9. **Tier 9 — Spirituality 2**: Many-Worlds Interpretation Reality Manipulation (**MAGIC**).
10. **Tier 10 — Spirituality 3**: Conceptual & Abstract frameworks rooted in human psychology.
11. **Tier 11A — Conceptual & Abstract 1**: Concepts, Cause, and Effects.
12. **Tier 11B — Conceptual & Abstract 2**: **ACTUAL CONCEPT** (not a representation). Lacks visual form, physical body, or psychological core. Fundamentally primordial—destroying this alters or erases the actual concept across multiple worlds.
13. **Tier 12 — Meta-Conceptual & Endlessly Infinite**: Actual mathematical absolute infinity. Cannot be changed, surpassed, or touched; serves as the framework of transcendence itself.`,
    sourceSection: 'THE ULTIMATE HIERARCHY / Cognition',
    tags: ['Cognition', '13 Tiers', 'Astral', 'Semi-Spiritual', 'Spirituality', 'Meta-Conceptual'],
    establishedFacts: [
      'Extra-psychic simulatory depth is explicitly not a measure of decision-making intelligence.',
      'A massive gap of order 9+ separates Micro-Telekinesis/Low-End Astral (Tier 5) from true Telekinesis/Astral Projection (Tier 6).',
      'Semi-Spiritual (Soul 1) obeys mathematical laws and is comprehensible to a finite mind, whereas Spirituality 1 (Soul 2) breaks mathematics and requires infinite processing.'
    ],
    inferredPrinciples: [
      'Ontological scaling in the Ur-Worlds transitions from biological hardware -> electromagnetic synchronization -> quantum information -> non-Euclidean probability -> primordial concepts.',
      'Because Conceptual & Abstract 2 lacks a psychological core, human-centric emotional manipulation cannot affect it.'
    ],
    unresolvedQuestions: [
      'What specific energetic or structural threshold bridges the 10^9 magnitude gap between Tier 5 (Eidolons/Wraiths) and Tier 6 (Ghosts/Jinns/Pretas)?',
      'How do finite Category 4 or 5 minds interface with Spirituality 2 (Tier 9 MAGIC) if Spirituality 1 (Tier 8) already requires infinite processing comprehension?'
    ]
  },
  {
    id: 'astral-ecology-150-archetypes',
    title: 'The Astral Ecology: 50! Population & The 150 Canonical Archetypes',
    kicker: 'Supernatural Ecology & Folklore Substrate',
    category: 'Cosmology',
    summary: 'How unintended mental precognitive simulations generate Astral Trails and cluster into an ecosystem outnumbering biological life on Earth by over 50!.',
    content: `In the Ur-Worlds, "Astral" and "Spiritual" are radically distinct. While Spiritualities are non-Euclidean destinies outside spacetime, the **Astral** is where folklore, ghosts, and psyche phenomena live.

### Core Mechanics of the Astral
* **Genesis via Emotional Kickback**: Mental precognitive simulations—especially those weighted by negative human emotions like anger or dread—cause unintended reality warping, shedding **Astral Trails** every second and microsecond. These trails cluster and coalesce into **Astral Entities**.
* **Incomplete Soul Rule**: An Astral Entity is **never** a complete soul. If an entity achieves soul completeness, it automatically qualifies as a **Soul 1** (Semi-Spiritual).
* **Population Scale**: In the Terra-Realms (Earth), Astral Entities outnumber ALL evolutionary life forms by a magnitude of order over **50! (50 factorial / $10^{50}$)**. They are the political and ecological **bedrock**—the lowest and most foundational rung of the supernatural ladder.
* **Astral Realms as the Psychic Internet**: Astral realms act as a hyper-complex "Internet" for psychic/telepathic beings—comprising Mirror Dimensions, Voids, Bridges, Transversal Routes, Cities, Nations, or vibrational frequencies of terrestrial locations. Due to the *Illusion of Myths*, their visuals are emotionally exaggerated (epic, terrifying, horrific, gross, or abstract).

### The 15 Canonical Astral Taxonomies (150 Named Entities)
1. **Trance, Mirror & Manifestation**: The Speculum, The Phantasmagoria, Emanation, The Ideoplasm, The Apparitor, The Simulacrum, The Shade of Endor, The Resonator, The Visualizer, The Automatism.
2. **Goetic, Grimoire & Pactional**: The Familiar, A Familiar Stratagem, The Legate, The Pact-Keeper, The Imp, The Cacodaemon, The Agathodaemon, The Decan, The Consort, The Under-Sign.
3. **Funerary, Graveyard & Chthonic Wraiths**: The Chthonic Shade, The Charon, The Revenant, The Corpse-Light, The Psychopomp, The Lemure, The Larva, The Genius Loci, The Mourning-Weaver, The Osseous Ghost.
4. **Planetary & Astrological Intelligences**: The Olympic Spirit, The Intelligence, The Solar Daemon, The Lunar Genius, The Saturnian Warden, The Mercurial Trickster, The Martial Wraith, The Jovial Lord, The Node-Walker, The Celestial Scribe.
5. **Liminal, Threshold & Circle Guards**: The Guardian of the Threshold, The Warden of the Circle, The Janiform Spirit, The Key-Bearer, The Boundary-Stalker, The Crossroads Shadow, The Veil-Tearer, The Hinge-Spirit, The Intermediary, The Sentinel of the North.
6. **Thoughtforms, Tulpas & Egregores**: The Egregore, The Tulpa, The Homunculus, The Obsession-Shade, The Phantasm, The Malice-Weaver, The Glamour-Spirit, The Larval Thought, The Memory-Keep, The Autonomous Will.
7. **Parasites, Leeches & Energy Siphons**: The Incuba, The Aura-Leech, The Miasma, The Cord-Cutter, The Golem-Feeder, The Static-Worm, The Shadow-Clinger, The Vitality Sponge, The Discord Daemon, The Twilight Tick.
8. **Archons, Hierarchs & Astral Judges**: The Archon, The Arbiter, The Abyssal Lord, The Magistellus, The Chancellor of the Veil, The Principal, The Inquisitor of Souls, The Sovereign of Lead, The Hierarchy Guide, The Aeon.
9. **Tricksters, Vagabonds & Unbound Souls**: The Vagabond-SoulFragments, The Impostor, The Fetch-Light, The Stray, The Changeling Shade, The Rogue Intelligency, The Scavenger Wraith, The Banshee-Shade, The Mirror-Thief, The Nomad-Monk.
10. **Bestial, Totemic & Animal Spirits**: The Wolf-Shade, The Serpent Guide, The Raven Messenger, The Stag Warden, The Lion Guardian, The Spider Weaver, The Owl Seer, The Bear Sentinel, The Fox Trickster, The Dolphin Whisperer.
11. **Dream, Nightmare & Oneiric Entities**: The Dreamweaver, The Night Terror, The Sleepwalker, The Lucid Phantom, The Sandman, The Nightmare Steed, The Hypnos Shade, The Slumbering Eidolon, The Dreamcatcher, The REM Wraith.
12. **Mythic, Legendary & Archetypal Forms**: The Heroic Shade, The Trickster Archetype, The Mother Spirit, The Wise Old One, The Shadow Self, The Eternal Child, The Warrior Ghost, The Sage Apparition, The Monster of Legend, The Guardian Beast.
13. **Elemental Phenomena & Weather Spirits**: The Storm Herald, The Rainmaker, The Thunder Wraith, The Frost Phantom, The Sunflare, The Mist Walker, The Gale Rider, The Ember Shade, The Dew Spirit, The Lightning Dancer.
14. **Machine, Synthetic & Technomantic Entities**: The Cogmind, The Data Ghost, The Circuit Shade, The Algorithmic Eidolon, The Nanite Swarm, The Digital Phantom, The Clockwork Apparition, The Signal Wraith, The Byte Spirit, The Mechanist.
15. **Alchemical & Elemental Essences**: The Sylph-Adept, The Undine-Maiden, The Gnome-Elder, The Salamander-Spark, The Quintessence, The Calcination Ghost, The Coagulator, The Volatile Spirit, The Fixed Daemon, The Prima Materia.`,
    sourceSection: 'Astral / Examples of Some Astral Entities',
    tags: ['Astral', 'Folklore', 'Psyche', 'Terra-Realms', '150 Archetypes', 'Illusion of Myths'],
    establishedFacts: [
      'Astral Entities outnumber biological life in Terra-Realms by a magnitude of order over 50!.',
      'An Astral Entity can never be a complete soul; completion elevates it to Soul 1.',
      'Astral visuals are exaggerated (epic, horrific, gross, or abstract) because they are directly linked to emotional kickback and the Illusion of Myths.'
    ],
    inferredPrinciples: [
      'Modern technological anxiety spawns Technomantic Astral entities (Data Ghosts, Algorithmic Eidolons) alongside ancient Goetic and Alchemical forms.',
      'Because Astral entities form the political bedrock of the supernatural ladder, higher-tier factions harvest or govern them as foundational infrastructure.'
    ],
    unresolvedQuestions: [
      'Can an incomplete Astral Entity artificially graft fragments together to force an ascension into a complete Soul 1?',
      'How do Machine/Technomantic Astral entities interact with physical silicon hardware vs. biological minds?'
    ]
  },
  {
    id: 'evolutionary-emotions-and-restrictor-plates',
    title: 'Evolutionary Hardware Overrides & The "Restrictor Plates" Law',
    kicker: 'Creative Philosophy & Meta-Mechanics',
    category: 'Creative Philosophy',
    summary: 'How evolutionary biology (hardware optimization) and evolutionary psychology (social calibration) drive MWI simulations, governed by rigid ontological restrictor plates.',
    content: `Two foundational pillars govern how internal psychology translates into external supernatural mechanics in the Ur-Worlds:

### 1. Emotions as Evolutionary Hardware & Software
The draft explicitly rejects treating emotions as vague mystical feelings. Instead, it grounds them in two scientific disciplines:
* **Evolutionary Biology (Hardware Optimization)**: Emotions are automated, somatic survival programs shifting blood, hormones, and metabolic energy instantly:
  * *Fear*: Sympathetic nervous system override—adrenaline flood, pupil dilation, blood shunted from digestion to large muscles for fight-or-flight.
  * *Depression / Lethargy*: Metabolic energy-conservation state shutting down costly exploration in hostile environments.
  * *Disgust*: Pathogen/toxin rejection mechanism triggering gag/nausea reflexes.
  * *Anger*: Testosterone and upper-extremity blood surge preparing jaw and fists to defend territory/mates.
* **Evolutionary Psychology (Social Calibration)**: Emotions are ancient information-processing algorithms navigating tribal hyper-cooperation where banishment equaled death:
  * *Shame & Guilt*: Internal social GPS penalizing norm violations before tribal exile occurs.
  * *Gratitude & Moral Outrage*: Game-theory reciprocal altruism algorithms rewarding allies and punishing "cheaters" (social parasites).
  * *Jealousy & Love/Attachment*: Oxytocin/dopamine anchors protecting genetic investments and keeping parents cooperative for slow-developing infants.

### 2. Why Category 3 & Category 4 Differ in MAGIC
* **Category 3 Races** lack emotions (precompiled algorithms) and lack permanent pattern recognition / long-term memory of past mistakes, learning and predicting on the fly. Yet because they possess intellectual precognitive simulation, they utilize MAGIC on a steady scale.
* **Category 4 Races** (Humans) possess emotional precompilation. Emotions do not amplify magic through "emotional loudness"—they amplify precognitive simulations through **prioritization, action determination, and weight**. Because imagining an all-powerful god or lethal threat carries extreme survival priority, emotional kickback causes precognition, hallucination, and simulated effects that birth entire supernatural ecologies (*The Illusion of Myths*).

### 3. The "Restrictor Plates" Meta-Law
> *"Under the hood, the engine is bending reality and probability, but the vehicle has rigid restrictor plates. An entity isn’t an omnipotent genie rewriting the universe on a whim; their reality warping is locked behind strict ontological boundaries that force it to manifest as concrete, defined powers with hard limits, costs, and physical lanes."*`,
    sourceSection: 'Psychological View / Evolutionary Biology & META NOTE',
    tags: ['Evolutionary Biology', 'Evolutionary Psychology', 'Restrictor Plates', 'Category 3', 'Category 4', 'Illusion of Myths'],
    establishedFacts: [
      'Precognitive Simulation = Supernatural Energies is a valid ontological statement in the Ur-Worlds.',
      'Emotions amplify MAGIC by prioritization, action determination, and weight rather than sheer emotional loudness.',
      'Reality warping is locked behind rigid ontological restrictor plates that force it into concrete powers with hard limits, costs, and physical lanes.'
    ],
    inferredPrinciples: [
      'The "Restrictor Plates" principle prevents narrative power-creep and ensures combat/gameplay mechanics remain tactical and readable.',
      'Real-world occult practices (such as reality shifting and ceremonial frameworks) are synthesized with MWI quantum mechanics to explain why rituals require rigid steps.'
    ],
    unresolvedQuestions: [
      'What happens when an entity’s ontological restrictor plates are damaged or artificially removed—does the entity dissolve into chaotic probability?',
      'How do Category 3 races construct frameworks without long-term memory of past mistakes?'
    ]
  }
];

// 2. The 144 Cacodictyology Hierarchies
export const CACODICTYOLOGY_ROOTS: CacodictyologyRoot[] = [
  {
    rootNumber: 1,
    romanNumeral: 'Root I',
    title: 'The Pre-Ontological Abysses',
    subtitle: 'Before Existence — Uncreated Primordial Slag',
    hierarchies: [
      { id: 'caco-1', number: 1, name: 'The Causeless Void', rootNumber: 1, domain: 'Pre-Causal Nullity', threatTier: 'Axiomatic', description: 'The absolute absence of cause or potential; erases the causal chain of anything it contacts.' },
      { id: 'caco-2', number: 2, name: 'The Ontological Fracture', rootNumber: 1, domain: 'Structural Being Breach', threatTier: 'Axiomatic', description: 'The primordial crack between non-existence and existence where reality leaks.' },
      { id: 'caco-3', number: 3, name: 'The Un-Formed Chaos', rootNumber: 1, domain: 'Undifferentiated Chaos', threatTier: 'Axiomatic', description: 'Raw unpatterned substrate rejecting all physical and mathematical laws.' },
      { id: 'caco-4', number: 4, name: 'The Prime Anti-Thesis', rootNumber: 1, domain: 'Negation Invariant', threatTier: 'Axiomatic', description: 'An existential mirror that automatically negates any active cosmic law.' },
      { id: 'caco-5', number: 5, name: 'The First Blindness', rootNumber: 1, domain: 'Sensory Annihilation', threatTier: 'Axiomatic', description: 'The void state before light and perception existed; snuffs all observation.' },
      { id: 'caco-6', number: 6, name: 'The Primordial Slag', rootNumber: 1, domain: 'Unrefined Cosmic Waste', threatTier: 'Cataclysmic', description: 'The dense, unusable dregs remaining from the formation of initial dimensions.' },
      { id: 'caco-7', number: 7, name: 'The Null-Point Abyss', rootNumber: 1, domain: 'Zero-Energy Basin', threatTier: 'Cataclysmic', description: 'A bottomless spatial drain dropping thermodynamic energy to absolute null.' },
      { id: 'caco-8', number: 8, name: 'The Non-Being Matrix', rootNumber: 1, domain: 'Negation Lattice', threatTier: 'Axiomatic', description: 'A structured architecture holding things in permanent non-existence.' },
      { id: 'caco-9', number: 9, name: 'The Zero-Sum Maw', rootNumber: 1, domain: 'Equilibrium Consumption', threatTier: 'Cataclysmic', description: 'Consumes an equal amount of existence for every particle created.' },
      { id: 'caco-10', number: 10, name: 'The Pre-Cosmic Static', rootNumber: 1, domain: 'White Noise Void', threatTier: 'Subterranean', description: 'Unmodulated frequency noise drowning out psychic and precognitive simulations.' },
      { id: 'caco-11', number: 11, name: 'The Un-Spoken Negative', rootNumber: 1, domain: 'Linguistic Dissolution', threatTier: 'Axiomatic', description: 'Words and names that immediately delete the concept they articulate.' },
      { id: 'caco-12', number: 12, name: 'The Void-Born Anchor', rootNumber: 1, domain: 'Abyssal Mooring', threatTier: 'Cataclysmic', description: 'Monolithic anchors holding fractured dimensions open to the pre-ontological deep.' }
    ]
  },
  {
    rootNumber: 2,
    romanNumeral: 'Root II',
    title: 'The Mathematical & Physical Bleeds',
    subtitle: 'Axiom Breakers & Constant Shifters',
    hierarchies: [
      { id: 'caco-13', number: 13, name: 'The Law-Breakers', rootNumber: 2, domain: 'Axiomatic Subversion', threatTier: 'Cataclysmic', description: 'Entities that selectively disable Newtonian and relativistic invariants locally.' },
      { id: 'caco-14', number: 14, name: 'The Conceptual Rot', rootNumber: 2, domain: 'Semantic Decay', threatTier: 'Axiomatic', description: 'Infects conceptual frameworks, causing words and symbols to lose coherence.' },
      { id: 'caco-15', number: 15, name: 'The Mathematical Bleed', rootNumber: 2, domain: 'Numerical Corruption', threatTier: 'Axiomatic', description: 'Forces equations in local space to resolve into impossible values (e.g. division by zero).' },
      { id: 'caco-16', number: 16, name: 'The Probability Tyrants', rootNumber: 2, domain: 'Quantum Forcing', threatTier: 'Prime', description: 'Monopolizes Many-Worlds superpositions, forcing 0.0001% chances into certainty.' },
      { id: 'caco-17', number: 17, name: 'The Geometric Anomalies', rootNumber: 2, domain: 'Spatial Distortion', threatTier: 'Subterranean', description: 'Folds interior space into impossible non-Euclidean angles without exterior expansion.' },
      { id: 'caco-18', number: 18, name: 'The Entropic Monarchs', rootNumber: 2, domain: 'Thermal Decay', threatTier: 'Prime', description: 'Accelerates the thermodynamic heat death of localized planetary sectors.' },
      { id: 'caco-19', number: 19, name: 'The Constant-Shifters', rootNumber: 2, domain: 'Fundamental Alteration', threatTier: 'Axiomatic', description: 'Tweaks the fine-structure constant or speed of light to shatter matter stability.' },
      { id: 'caco-20', number: 20, name: 'The Paradox Engines', rootNumber: 2, domain: 'Causal Contradiction', threatTier: 'Prime', description: 'Self-powering constructs that run indefinitely on recursive causal contradictions.' },
      { id: 'caco-21', number: 21, name: 'The Fractal Corruptors', rootNumber: 2, domain: 'Scale Corruption', threatTier: 'Subterranean', description: 'Multiplies biological or structural flaws across every microscopic scale.' },
      { id: 'caco-22', number: 22, name: 'The Non-Euclidean Shades', rootNumber: 2, domain: 'Angle Predation', threatTier: 'Subterranean', description: 'Shadows that lurk in obtuse angles and step out through parallel lines.' },
      { id: 'caco-23', number: 23, name: 'The Asymmetry Harvesters', rootNumber: 2, domain: 'Chirality Inversion', threatTier: 'Subterranean', description: 'Inverts molecular and structural symmetry, rendering organic life toxic to itself.' },
      { id: 'caco-24', number: 24, name: 'The Formula-Eaters', rootNumber: 2, domain: 'Knowledge Erasure', threatTier: 'Cognitive', description: 'Devours mathematical models and blueprints directly out of scholar minds.' }
    ]
  },
  {
    rootNumber: 3,
    romanNumeral: 'Root III',
    title: 'The Chronological & Many-World Fractures',
    subtitle: 'Time Shadows & Retrocausal Entities',
    hierarchies: [
      { id: 'caco-25', number: 25, name: 'The Timeline Splinters', rootNumber: 3, domain: 'Timeline Bifurcation', threatTier: 'Cataclysmic', description: 'Jagged causal shards left over from catastrophic Many-Worlds divergences.' },
      { id: 'caco-26', number: 26, name: 'The Epoch-Ghouls', rootNumber: 3, domain: 'Age Devouring', threatTier: 'Subterranean', description: 'Feed on the elapsed temporal duration of dead civilizations.' },
      { id: 'caco-27', number: 27, name: 'The Static Interval', rootNumber: 3, domain: 'Chronal Stasis', threatTier: 'Subterranean', description: 'Freezes moments into endless loops where victims experience a single second forever.' },
      { id: 'caco-28', number: 28, name: 'The Paradox Hounds', rootNumber: 3, domain: 'Causality Hunting', threatTier: 'Prime', description: 'Tracks entities that violate temporal invariants or shatter Soul 1 containers.' },
      { id: 'caco-29', number: 29, name: 'The Retrocausal Wraiths', rootNumber: 3, domain: 'Past Re-Writing', threatTier: 'Prime', description: 'Attacks in the present by retroactively murdering the target’s ancestry in the past.' },
      { id: 'caco-30', number: 30, name: 'The Alternate-Weavers', rootNumber: 3, domain: 'Branch Weaving', threatTier: 'Cataclysmic', description: 'Forcefully knits incompatible timelines together, creating geographic chimeras.' },
      { id: 'caco-31', number: 31, name: 'The Decayed Futures', rootNumber: 3, domain: 'Future Rot', threatTier: 'Subterranean', description: 'Pours the ash of abandoned timelines into active realities.' },
      { id: 'caco-32', number: 32, name: 'The Aborted Timelines', rootNumber: 3, domain: 'Canceled Realities', threatTier: 'Subterranean', description: 'Hungry phantom realities that attempt to overwrite active timelines to exist.' },
      { id: 'caco-33', number: 33, name: 'The Chrono-Phantoms', rootNumber: 3, domain: 'Temporal Echoes', threatTier: 'Cognitive', description: 'Phantoms of what could have been, haunting observers with phantom memories.' },
      { id: 'caco-34', number: 34, name: 'The Age-Devourers', rootNumber: 3, domain: 'Biological Aging', threatTier: 'Subterranean', description: 'Drains centuries of physical youth in fractions of a second.' },
      { id: 'caco-35', number: 35, name: 'The Horizon-Bleeders', rootNumber: 3, domain: 'Event Horizon Spreading', threatTier: 'Cataclysmic', description: 'Expands the unobservable boundary of dying timelines into active sectors.' },
      { id: 'caco-36', number: 36, name: 'The Null-Time Drifters', rootNumber: 3, domain: 'Timeless Drifters', threatTier: 'Axiomatic', description: 'Beings that exist entirely outside the flow of temporal ticks, immune to time manipulation.' }
    ]
  },
  {
    rootNumber: 4,
    romanNumeral: 'Root IV',
    title: 'The High Goetic & Pactional Boles',
    subtitle: 'The Grimoire Kings & Sigil Dwellers',
    hierarchies: [
      { id: 'caco-37', number: 37, name: 'The True Legates', rootNumber: 4, domain: 'Diplomatic Domination', threatTier: 'Prime', description: 'Envoys of the Arch-Princes carrying binding legislative edicts.' },
      { id: 'caco-38', number: 38, name: 'The Sovereign Crowns', rootNumber: 4, domain: 'Feudal Hegemony', threatTier: 'Prime', description: 'The 72 Goetic Clan heads wielding ancient pactional monopolies.' },
      { id: 'caco-39', number: 39, name: 'The Pact-Masters', rootNumber: 4, domain: 'Contractual Enslavement', threatTier: 'Prime', description: 'Drafts metaphysical covenants that harvest souls upon fine-print infractions.' },
      { id: 'caco-40', number: 40, name: 'The Seal-Keepers', rootNumber: 4, domain: 'Geometric Custody', threatTier: 'Subterranean', description: 'Guardians of Solomonic brass seals and planetary pentacles.' },
      { id: 'caco-41', number: 41, name: 'The Grimoire Intelligences', rootNumber: 4, domain: 'Textual Possession', threatTier: 'Cognitive', description: 'Living grimoire spirits that infect magical manuscripts and corrupt spells.' },
      { id: 'caco-42', number: 42, name: 'The Magistelli', rootNumber: 4, domain: 'Familiar Control', threatTier: 'Subterranean', description: 'Lesser demonic advisors assigned to monitor and direct mortal occultists.' },
      { id: 'caco-43', number: 43, name: 'The Familiar Stratagems', rootNumber: 4, domain: 'Symbiotic Parasitism', threatTier: 'Cognitive', description: 'Demonic familiars designed to steer bloodlines toward hereditary damnation.' },
      { id: 'caco-44', number: 44, name: 'The Chancellors of the Pit', rootNumber: 4, domain: 'Infernal Bureaucracy', threatTier: 'Prime', description: 'Oversees the ledger books of debts, tithes, and blood tributes.' },
      { id: 'caco-45', number: 45, name: 'The Infernal Diplomats', rootNumber: 4, domain: 'Treaty Manipulation', threatTier: 'Subterranean', description: 'Brokers treaties between the Goetic Clans and the Courts of Yama or Hades.' },
      { id: 'caco-46', number: 46, name: 'The Pactional Architects', rootNumber: 4, domain: 'Fortress Masonry', threatTier: 'Subterranean', description: 'Builds fortresses and cities anchored into mathematical contract grids.' },
      { id: 'caco-47', number: 47, name: 'The Sigil-Dwellers', rootNumber: 4, domain: 'Glyphic Habitation', threatTier: 'Subterranean', description: 'Inhabits drawn geometric signs, striking when a seal is scuffed or stepped on.' },
      { id: 'caco-48', number: 48, name: 'The Courtly Tempters', rootNumber: 4, domain: 'Aristocratic Seduction', threatTier: 'Cognitive', description: 'Masters of subtle court intrigue, pride manipulation, and dynastic collapse.' }
    ]
  },
  {
    rootNumber: 5,
    romanNumeral: 'Root V',
    title: 'The Bio-Manifold & Collective Egregores',
    subtitle: 'Mind Parasites & Mass-Hysteria Brood',
    hierarchies: [
      { id: 'caco-49', number: 49, name: 'The Egregore Over-Lords', rootNumber: 5, domain: 'Consensus Thoughtforms', threatTier: 'Prime', description: 'God-like thoughtforms created by billions of praying minds, turning on their creators.' },
      { id: 'caco-50', number: 50, name: 'The Tribal Nightmares', rootNumber: 5, domain: 'Ancestral Phobia', threatTier: 'Subterranean', description: 'Primal horrors evolved from prehistoric mankind’s fear of apex predators.' },
      { id: 'caco-51', number: 51, name: 'The Myth-Weavers', rootNumber: 5, domain: 'Narrative Trapping', threatTier: 'Cognitive', description: 'Forces real individuals to re-enact ancient tragic mythological tropes.' },
      { id: 'caco-52', number: 52, name: 'The Hallucinatory Brood', rootNumber: 5, domain: 'Perceptual Distortion', threatTier: 'Cognitive', description: 'Projects waking collective illusions that physically hurt targets through psychosomatics.' },
      { id: 'caco-53', number: 53, name: 'The Obsession-Larvae', rootNumber: 5, domain: 'Monomania Feeding', threatTier: 'Cognitive', description: 'Burrows into obsessive brains, feeding on repeating recursive thoughts.' },
      { id: 'caco-54', number: 54, name: 'The Aura-Siphons', rootNumber: 5, domain: 'Bio-Field Depletion', threatTier: 'Subterranean', description: 'Leeches radiant life fields from sleeping mortal cities.' },
      { id: 'caco-55', number: 55, name: 'The Mimic-Strays', rootNumber: 5, domain: 'Identity Theft', threatTier: 'Subterranean', description: 'Astral strays that copy voices, faces, and emotional habits of dead loved ones.' },
      { id: 'caco-56', number: 56, name: 'The Cultural Parasites', rootNumber: 5, domain: 'Societal Decay', threatTier: 'Prime', description: 'Feeds on cultural decay and nihilism, steering civilizations into extinction events.' },
      { id: 'caco-57', number: 57, name: 'The Phantasm Projections', rootNumber: 5, domain: 'Silhouette Manifestation', threatTier: 'Subterranean', description: 'Semi-physical manifestations curdled out of smoke, dust, and collective panic.' },
      { id: 'caco-58', number: 58, name: 'The Mass-Hysteria Seeds', rootNumber: 5, domain: 'Contagious Mania', threatTier: 'Subterranean', description: 'Spreads irrational panic and dancing plagues through neural synchronization.' },
      { id: 'caco-59', number: 59, name: 'The Ideon Swarms', rootNumber: 5, domain: 'Idea Swarming', threatTier: 'Cognitive', description: 'Living memes that consume cognitive bandwidth until host minds suffer stroke.' },
      { id: 'caco-60', number: 60, name: 'The Autonomous Wills', rootNumber: 5, domain: 'Splintered Agency', threatTier: 'Subterranean', description: 'Severed intentions and desires that gain independent demonic sentience.' }
    ]
  },
  {
    rootNumber: 6,
    romanNumeral: 'Root VI',
    title: 'The Chthonic, Funerary & Dead Realms',
    subtitle: 'Underworld Masters & Grave-Soil Clingers',
    hierarchies: [
      { id: 'caco-61', number: 61, name: 'The Chthonic Arbiters', rootNumber: 6, domain: 'Subterranean Justice', threatTier: 'Prime', description: 'Judges of underworld bedrock enforcing absolute burial laws.' },
      { id: 'caco-62', number: 62, name: 'The Revenant Lords', rootNumber: 6, domain: 'Grave Vengeance', threatTier: 'Subterranean', description: 'Unkillable corpses driven by unfulfilled vengeance covenants.' },
      { id: 'caco-63', number: 63, name: 'The Lemure Swarms', rootNumber: 6, domain: 'Restless Shades', threatTier: 'Subterranean', description: 'Wandering, hungry shades of the unburied drifting across the Acheron.' },
      { id: 'caco-64', number: 64, name: 'The Miasmic Mists', rootNumber: 6, domain: 'Decomposition Vapors', threatTier: 'Subterranean', description: 'Choking sulfurous fog that rots lung tissue and soul anchors on contact.' },
      { id: 'caco-65', number: 65, name: 'The Corpse-Light Wardens', rootNumber: 6, domain: 'Will-o-Wisp Luring', threatTier: 'Subterranean', description: 'Pale phosphorescent marsh lights that lead travelers into bottomless black mud.' },
      { id: 'caco-66', number: 66, name: 'The Osseous Ghasts', rootNumber: 6, domain: 'Bone Mineralization', threatTier: 'Subterranean', description: 'Skeletons fused with mineral obsidian that hunt by sensing bone vibration.' },
      { id: 'caco-67', number: 67, name: 'The Under-Earth Sovereigns', rootNumber: 6, domain: 'Tectonic Necromancy', threatTier: 'Prime', description: 'Ancient kings buried under miles of rock holding court over subterranean dead.' },
      { id: 'caco-68', number: 68, name: 'The Grave-Soil Clingers', rootNumber: 6, domain: 'Earth Binding', threatTier: 'Subterranean', description: 'Spirits that bind their victims into the damp earth of abandoned graveyards.' },
      { id: 'caco-69', number: 69, name: 'The Larval Remnants', rootNumber: 6, domain: 'Incomplete Soul Slag', threatTier: 'Subterranean', description: 'Fragments of souls that failed to cross the underworld rivers, crawling like worms.' },
      { id: 'caco-70', number: 70, name: 'The Necromantic Sparks', rootNumber: 6, domain: 'Cold Reanimation', threatTier: 'Subterranean', description: 'Sparks of black lightning that jump between corpses, forcing violent reanimation.' },
      { id: 'caco-71', number: 71, name: 'The Sepulcher Phantoms', rootNumber: 6, domain: 'Tomb Guardianship', threatTier: 'Subterranean', description: 'Phantoms bound to royal crypts with authority to collapse stone ceilings on looters.' },
      { id: 'caco-72', number: 72, name: 'The Ferrymen of Bone', rootNumber: 6, domain: 'Passage Collection', threatTier: 'Subterranean', description: 'Silent boatmen collecting coins and blood tokens along the five infernal rivers.' }
    ]
  },
  {
    rootNumber: 7,
    romanNumeral: 'Root VII',
    title: 'The Astrological & Planetary Inversions',
    subtitle: 'The Dark Spheres & Inverted Decans',
    hierarchies: [
      { id: 'caco-73', number: 73, name: 'The Archon Hierarchs', rootNumber: 7, domain: 'Planetary Spheres', threatTier: 'Prime', description: 'Tyrants ruling the planetary spheres that block souls from ascending.' },
      { id: 'caco-74', number: 74, name: 'The Node-Stalkers', rootNumber: 7, domain: 'Eclipse Crossing', threatTier: 'Subterranean', description: 'Hunts along lunar and solar nodes during rare astronomical syzygies.' },
      { id: 'caco-75', number: 75, name: 'The Inverted Decans', rootNumber: 7, domain: 'Zodiacal Angles', threatTier: 'Prime', description: 'The 36 dark faces of the zodiac that radiate reality-degrading frequencies.' },
      { id: 'caco-76', number: 76, name: 'The Saturnian Wardens', rootNumber: 7, domain: 'Lead & Stagnation', threatTier: 'Prime', description: 'Enforces gravitational paralysis, leaden depression, and structural petrification.' },
      { id: 'caco-77', number: 77, name: 'The Martial Wraiths', rootNumber: 7, domain: 'Iron & Slaughter', threatTier: 'Subterranean', description: 'Ignites senseless, bloodthirsty warfare between neighboring mortal empires.' },
      { id: 'caco-78', number: 78, name: 'The Mercurial Tricksters', rootNumber: 7, domain: 'Quicksilver Deception', threatTier: 'Subterranean', description: 'Scrambles transmissions, treaties, and mathematical coordinates across rifts.' },
      { id: 'caco-79', number: 79, name: 'The Abyssal Void-Liners', rootNumber: 7, domain: 'Interplanetary Voids', threatTier: 'Cataclysmic', description: 'Titanic leviathans swimming through the lightless void between stars.' },
      { id: 'caco-80', number: 80, name: 'The Solar Inversions', rootNumber: 7, domain: 'Black Sun Radiation', threatTier: 'Prime', description: 'Radiates invisible black sun rays that blind retinas and scorch soul conduits.' },
      { id: 'caco-81', number: 81, name: 'The Lunar Genii', rootNumber: 7, domain: 'Tidal Madness', threatTier: 'Subterranean', description: 'Manipulates fluids, cerebrospinal pressures, and erratic psychic fluctuations.' },
      { id: 'caco-82', number: 82, name: 'The Jovial Tyrants', rootNumber: 7, domain: 'Imperious Hubris', threatTier: 'Prime', description: 'Induces megalomaniacal delusions of godhood in kings before orchestrating their fall.' },
      { id: 'caco-83', number: 83, name: 'The Venerean Tempests', rootNumber: 7, domain: 'Passionate Ruin', threatTier: 'Subterranean', description: 'Winds of intoxicating copper-perfumed pheromones driving armies to mutiny.' },
      { id: 'caco-84', number: 84, name: 'The Zodiacal Corruptions', rootNumber: 7, domain: 'Horoscopic Destiny', threatTier: 'Prime', description: 'Re-writes natal horoscopes to guarantee tragic doom at birth.' }
    ]
  },
  {
    rootNumber: 8,
    romanNumeral: 'Root VIII',
    title: 'The Alchemical & Material Dissolutions',
    subtitle: 'Exotic Matter & Slag Abominations',
    hierarchies: [
      { id: 'caco-85', number: 85, name: 'The Prima Materia Defects', rootNumber: 8, domain: 'Base Matter Rot', threatTier: 'Cataclysmic', description: 'Flawed primordial matter that causes neighboring elements to degenerate into slag.' },
      { id: 'caco-86', number: 86, name: 'The Coagulation Horrors', rootNumber: 8, domain: 'Forced Congealing', threatTier: 'Subterranean', description: 'Instantly hardens blood, fluids, and river water into solid glassy pitch.' },
      { id: 'caco-87', number: 87, name: 'The Calcination Phantoms', rootNumber: 8, domain: 'Spontaneous Ash', threatTier: 'Subterranean', description: 'Reduces living tissue and metallic armaments to fine white calcified ash without flame.' },
      { id: 'caco-88', number: 88, name: 'The Volatile Daemons', rootNumber: 8, domain: 'Gaseous Explosion', threatTier: 'Subterranean', description: 'Unstable vapors that combust at room temperature with concussive force.' },
      { id: 'caco-89', number: 89, name: 'The Fixed Cages', rootNumber: 8, domain: 'Molecular Immobility', threatTier: 'Subterranean', description: 'Freezes atomic movement, creating zones of zero thermal energy and zero kinetic action.' },
      { id: 'caco-90', number: 90, name: 'The Salamander-Sparks', rootNumber: 9, domain: 'Chthonic Ignition', threatTier: 'Subterranean', description: 'Living sparks that feed on sulfur and metal, carving magma tunnels through rock.' },
      { id: 'caco-91', number: 91, name: 'The Mire-Silt Eels', rootNumber: 8, domain: 'Corrosive Mud', threatTier: 'Subterranean', description: 'Burrows through volcanic ash, spitting acidic sludge that melts reinforced plate.' },
      { id: 'caco-92', number: 92, name: 'The Degenerate Slag', rootNumber: 8, domain: 'Neutron Density', threatTier: 'Cataclysmic', description: 'Matter so compressed that a thimble-sized drop weighs millions of tons and crushes crusts.' },
      { id: 'caco-93', number: 93, name: 'The Plasma-Leeches', rootNumber: 8, domain: 'Energy Siphoning', threatTier: 'Subterranean', description: 'Attaches to energy shields, stars, and lightning strikes to gorging on ionized gas.' },
      { id: 'caco-94', number: 94, name: 'The Bose-Einstein Specters', rootNumber: 8, domain: 'Absolute Zero Phantoms', threatTier: 'Prime', description: 'Quantum specters that exist at near absolute zero, behaving as a single macroscopic super-atom.' },
      { id: 'caco-95', number: 95, name: 'The Superfluid Drowners', rootNumber: 8, domain: 'Frictionless Fluid', threatTier: 'Cataclysmic', description: 'Fluids with zero viscosity that creep up container walls and drown sealed citadels.' },
      { id: 'caco-96', number: 96, name: 'The Time-Crystal Rot', rootNumber: 8, domain: 'Temporal Lattice Decay', threatTier: 'Axiomatic', description: 'Breaks down structures that repeat in time, fracturing temporal stability.' }
    ]
  },
  {
    rootNumber: 9,
    romanNumeral: 'Root IX',
    title: 'The Liminal & Threshold Outcasts',
    subtitle: 'Border-Feeders & Crossroads Shadows',
    hierarchies: [
      { id: 'caco-97', number: 97, name: 'The Guardian of the Threshold', rootNumber: 9, domain: 'Gateway Defense', threatTier: 'Prime', description: 'Terrifying gatekeepers requiring exorbitant blood or soul tolls to pass portals.' },
      { id: 'caco-98', number: 98, name: 'The Hinge-Thieves', rootNumber: 9, domain: 'Portal Hijacking', threatTier: 'Subterranean', description: 'Steals the destination coordinates of doorways, sending travelers to the Void.' },
      { id: 'caco-99', number: 99, name: 'The Crossroads Shadows', rootNumber: 9, domain: 'Fateful Bargains', threatTier: 'Subterranean', description: 'Appears at physical and metaphysical crossroads to offer ruinous Faustian pacts.' },
      { id: 'caco-100', number: 100, name: 'The Boundary-Stalkers', rootNumber: 9, domain: 'Perimeter Hunting', threatTier: 'Subterranean', description: 'Paces along territorial wards and circle lines, waiting for micro-fractions in focus.' },
      { id: 'caco-101', number: 101, name: 'The Intermediary Translators', rootNumber: 9, domain: 'Semantic Poisoning', threatTier: 'Cognitive', description: 'Translates messages between realms while subtly twisting intent to trigger wars.' },
      { id: 'caco-102', number: 102, name: 'The Veil-Tearers', rootNumber: 9, domain: 'Barrier Shredding', threatTier: 'Cataclysmic', description: 'Claws open tears between the physical Bio-Manifold and the Nether depths.' },
      { id: 'caco-103', number: 103, name: 'The Mirror-Thieves', rootNumber: 9, domain: 'Reflective Abduction', threatTier: 'Subterranean', description: 'Reaches through polished glass and still water to drag physical bodies into reflections.' },
      { id: 'caco-104', number: 104, name: 'The Janiform Observers', rootNumber: 9, domain: 'Bifurcated Vision', threatTier: 'Prime', description: 'Two-faced watchers observing the past and future simultaneously to anticipate escapes.' },
      { id: 'caco-105', number: 105, name: 'The Gate-Breakers', rootNumber: 9, domain: 'Siege Warfare', threatTier: 'Cataclysmic', description: 'Massive battering ram entities designed to shatter planetary defensive seals.' },
      { id: 'caco-106', number: 106, name: 'The Key-Corruptors', rootNumber: 9, domain: 'Access Revocation', threatTier: 'Subterranean', description: 'Rusts and warps talismans and keys so casters cannot return to their home realm.' },
      { id: 'caco-107', number: 107, name: 'The Twilight Ticks', rootNumber: 9, domain: 'Liminal Parasitism', threatTier: 'Subterranean', description: 'Parasites that feast during dusk and dawn, draining magical reserves in transition.' },
      { id: 'caco-108', number: 108, name: 'The Edge-Liners', rootNumber: 9, domain: 'Cliff & Precipice Luring', threatTier: 'Subterranean', description: 'Whispers from abyssal cliffs, urging climbers to take the fatal plunge.' }
    ]
  },
  {
    rootNumber: 10,
    romanNumeral: 'Root X',
    title: 'The Cognitive & Psychological Siphons',
    subtitle: 'Somatic Afflictions & Neural Leeches',
    hierarchies: [
      { id: 'caco-109', number: 109, name: 'The Incuba-Swarms', rootNumber: 10, domain: 'Somnolent Siphoning', threatTier: 'Subterranean', description: 'Feeds on somatic energy during REM sleep paralysis.' },
      { id: 'caco-110', number: 110, name: 'The Discord Daemons', rootNumber: 10, domain: 'Paranoia & Spite', threatTier: 'Cognitive', description: 'Inflames petty jealousies and mutual suspicions between close comrades.' },
      { id: 'caco-111', number: 111, name: 'The Static-Worms', rootNumber: 10, domain: 'Neural Fuzz', threatTier: 'Cognitive', description: 'Burrows along acoustic nerves, converting thoughts into painful white static.' },
      { id: 'caco-112', number: 112, name: 'The Shadow-Clinger Clones', rootNumber: 10, domain: 'Parasitic Doubling', threatTier: 'Subterranean', description: 'Grows out of an individual’s own shadow, slowly strangling the original host.' },
      { id: 'caco-113', number: 113, name: 'The Grief-Eater Ghouls', rootNumber: 10, domain: 'Mourning Consumption', threatTier: 'Subterranean', description: 'Congregates in hospital wards and mourning halls, growing fat on acute bereavement.' },
      { id: 'caco-114', number: 114, name: 'The Guilt-Weavers', rootNumber: 10, domain: 'Remorse Looping', threatTier: 'Cognitive', description: 'Forces minds to endlessly replay their worst moral failures until sanity snaps.' },
      { id: 'caco-115', number: 115, name: 'The Mania-Sparks', rootNumber: 10, domain: 'Euphoric Destruction', threatTier: 'Cognitive', description: 'Induces frenzied manic euphoria where victims exhaust their hearts in frantic dance.' },
      { id: 'caco-116', number: 116, name: 'The Dread-Anchors', rootNumber: 10, domain: 'Existential Horror', threatTier: 'Cognitive', description: 'Affixes a sensation of impending cosmic doom that paralyzes motor function.' },
      { id: 'caco-117', number: 117, name: 'The Paranoia Mites', rootNumber: 10, domain: 'Suspicion Multiplication', threatTier: 'Cognitive', description: 'Microscopic astral parasites making everyone in a settlement suspect their neighbor is a spy.' },
      { id: 'caco-118', number: 118, name: 'The Lethargy Sponges', rootNumber: 10, domain: 'Willpower Dissolution', threatTier: 'Cognitive', description: 'Drains initiative and motivation, causing victims to lie down and starve.' },
      { id: 'caco-119', number: 119, name: 'The Malice-Blades', rootNumber: 10, domain: 'Hate Solidification', threatTier: 'Subterranean', description: 'Condenses pure hatred into physical obsidian daggers that never blunt.' },
      { id: 'caco-120', number: 120, name: 'The Memory-Erasers', rootNumber: 10, domain: 'Retroactive Amnesia', threatTier: 'Cognitive', description: 'Deletes core childhood memories, turning experienced masters into helpless amnesiacs.' }
    ]
  },
  {
    rootNumber: 11,
    romanNumeral: 'Root XI',
    title: 'The Traditional Religious & Folk Sins',
    subtitle: 'The Seven/Eight Sins & Ancient Mythic Horrors',
    hierarchies: [
      { id: 'caco-121', number: 121, name: 'The Asmodean Brood', rootNumber: 11, domain: 'Wrath & Carnal Ruin', threatTier: 'Prime', description: 'Blood-knights of Asmodeus that channel fury into devastating explosive combat.' },
      { id: 'caco-122', number: 122, name: 'The Leviathan Maw-Spawns', rootNumber: 11, domain: 'Envy & Deep Waters', threatTier: 'Prime', description: 'Serpentine abyssal horrors driven by bitter envy of surface civilizations.' },
      { id: 'caco-123', number: 123, name: 'The Beelzebub Flies', rootNumber: 11, domain: 'Gluttony & Decay', threatTier: 'Prime', description: 'Infinite swarms that spread pestilence and consume crops down to dirt.' },
      { id: 'caco-124', number: 124, name: 'The Mammon Sifts', rootNumber: 11, domain: 'Greed & Usury', threatTier: 'Prime', description: 'Golden usurers that weigh mortal life exclusively in gold and contractual servitude.' },
      { id: 'caco-125', number: 125, name: 'The Belphegor Yawns', rootNumber: 11, domain: 'Sloth & Stagnation', threatTier: 'Prime', description: 'Forge citadels where magical and industrial inventions rust into immobility.' },
      { id: 'caco-126', number: 126, name: 'The Luciferian Sovereigns', rootNumber: 11, domain: 'Pride & Inversion', threatTier: 'Prime', description: 'Cold, blindingly beautiful dynasts that invert celestial thrones.' },
      { id: 'caco-127', number: 127, name: 'The Abaddon Hordes', rootNumber: 11, domain: 'Pure Ruin & Oblivion', threatTier: 'Cataclysmic', description: 'The locust shock-legions unleashed solely to erase civilizations without trace.' },
      { id: 'caco-128', number: 128, name: 'The Oni-Crushers', rootNumber: 11, domain: 'Brutal Flesh-Cleaving', threatTier: 'Subterranean', description: 'Horned titans of Mount Ooe’s reflection wielding spiked iron clubs.' },
      { id: 'caco-129', number: 129, name: 'The Djinn-Gale Blights', rootNumber: 11, domain: 'Smokeless Fire Blight', threatTier: 'Subterranean', description: 'Scorching desert whirlwinds of smokeless flame that incinerate lungs.' },
      { id: 'caco-130', number: 130, name: 'The Rakshasa Changers', rootNumber: 11, domain: 'Cannibalistic Illusion', threatTier: 'Prime', description: 'Multi-headed demon sorcerers that wear mortal faces to feast on flesh.' },
      { id: 'caco-131', number: 131, name: 'The Wendigo Famines', rootNumber: 11, domain: 'Insatiable Winter Hunger', threatTier: 'Subterranean', description: 'Spirits of winter cannibalism that grow larger the more flesh they consume.' },
      { id: 'caco-132', number: 132, name: 'The Lilim Siphons', rootNumber: 11, domain: 'Nocturnal Strangling', threatTier: 'Subterranean', description: 'Winged night terrors hunting newborns and severing generative lineages.' }
    ]
  },
  {
    rootNumber: 12,
    romanNumeral: 'Root XII',
    title: 'The Metaphysical Impossible Outcasts',
    subtitle: 'Beyond All Spacetime & Infinite Possibility',
    hierarchies: [
      { id: 'caco-133', number: 133, name: 'The Non-Corporeal Impossible', rootNumber: 12, domain: 'Anti-Physicality', threatTier: 'Axiomatic', description: 'Entities that violate the laws of possibility simply by being impossible to physicality.' },
      { id: 'caco-134', number: 134, name: 'The Space-Time Blind', rootNumber: 12, domain: 'Causal Invisibility', threatTier: 'Axiomatic', description: 'Time-space cannot register their coordinates; they pass through matter without contact.' },
      { id: 'caco-135', number: 135, name: 'The Absolute Massless', rootNumber: 12, domain: 'Zero Mass Invariant', threatTier: 'Axiomatic', description: 'Possesses literal zero mass yet exerts infinite ontological inertia.' },
      { id: 'caco-136', number: 136, name: 'The Gravity-Untouched', rootNumber: 12, domain: 'Gravitational Nullity', threatTier: 'Axiomatic', description: 'Completely unaffected by gravitational wells, black holes, or planetary mass.' },
      { id: 'caco-137', number: 137, name: 'The Un-Observable Blurs', rootNumber: 12, domain: 'Wave Collapse Rejection', threatTier: 'Axiomatic', description: 'Refuses to collapse under quantum observation, remaining a violent probability smear.' },
      { id: 'caco-138', number: 138, name: 'The Abstraction Tyrants', rootNumber: 12, domain: 'Pure Ideation', threatTier: 'Axiomatic', description: 'Ideas that conquer reality by existing prior to the brains that think them.' },
      { id: 'caco-139', number: 139, name: 'The Non-Physical Anchors', rootNumber: 12, domain: 'Intangible Mooring', threatTier: 'Axiomatic', description: 'Anchors realms together through abstract concepts rather than physical geometry.' },
      { id: 'caco-140', number: 140, name: 'The Infinite-Possibility Violators', rootNumber: 12, domain: 'Transfinite Incursion', threatTier: 'Axiomatic', description: 'Brings outcomes that are not contained anywhere in the countably infinite Many-Worlds.' },
      { id: 'caco-141', number: 141, name: 'The Void-Network Crux', rootNumber: 12, domain: 'Abyssal Nexus', threatTier: 'Cataclysmic', description: 'The central switching terminal routing negative psychic currents across the cosmos.' },
      { id: 'caco-142', number: 142, name: 'The Essence-Marrow Thieves', rootNumber: 12, domain: 'Ontological Siphoning', threatTier: 'Axiomatic', description: 'Strips the defining essence of what makes a concept distinct.' },
      { id: 'caco-143', number: 143, name: 'The Realm-Swallowers', rootNumber: 12, domain: 'Dimensional Consumption', threatTier: 'Cataclysmic', description: 'Massive blind entities that devour entire dimensional manifolds like planks of wood.' },
      { id: 'caco-144', number: 144, name: 'The Absolute En-Grafted Apex', rootNumber: 12, domain: 'Ultimate Transcendence', threatTier: 'Axiomatic', description: 'The supreme fusion point where Metachaos permanently engrafts onto reality.' }
    ]
  }
];

// 3. The 16 Cosmic Fuel Reservoirs
export const COSMIC_FUEL_RESERVOIRS: FuelReservoir[] = [
  {
    id: 'kalakuta-bile',
    name: 'Kalakuta (Halahala) Bile',
    sector: 'Vedic & Dharmic',
    state: 'Black-purple metallic superfluid dissolving local geometry',
    mythicRoot: 'Primordial world-poison from Samudra Manthan churning before the nectar of immortality.',
    axiomaticVector: 'Absolute Biological & Spiritual Necrosis; erases regenerative axioms, turning immortal biology into necrotic sludge.',
    fuelGrade: 'Superfluid'
  },
  {
    id: 'tejas-flame',
    name: 'Tejas-Ignis Ember',
    sector: 'Vedic & Dharmic',
    state: 'Radiant, dry, white-gold solar plasma at eyebrow center',
    mythicRoot: 'Subtle essence of fire, spiritual brilliance, and righteous wrath.',
    axiomaticVector: 'Thermal Purification & Piercing Vectors; bypasses armor by superheating atomic bonds directly inside target.',
    fuelGrade: 'Plasma'
  },
  {
    id: 'ojas-dew',
    name: 'Ojas-Dew',
    sector: 'Vedic & Dharmic',
    state: 'Heavy, golden, semi-solid nectar coating the nervous system',
    mythicRoot: 'Ultimate bodily and spiritual refinement of physical vitality.',
    axiomaticVector: 'Somatic Density & Recoil Nullification; hardens muscle fibers into adamantine to absorb high-Possibility recoil.',
    fuelGrade: 'Heavy Nectar'
  },
  {
    id: 'tapas-cinder',
    name: 'Tapas-Cinder',
    sector: 'Vedic & Dharmic',
    state: 'Smoldering, dense ash stored in the marrow',
    mythicRoot: 'Heat generated through ascetic meditation and self-mortification.',
    axiomaticVector: 'Possibility-Compression; sacrifices immediate vitality to forcefully drop fuel cost of an impossible reality shift.',
    fuelGrade: 'Vitrified'
  },
  {
    id: 'soma-nectar',
    name: 'Soma-Nectar Flux',
    sector: 'Vedic & Dharmic',
    state: 'Luminescent, moon-chilled silvery fluid',
    mythicRoot: 'Divine elixir of the Devas, granting ecstatic vision.',
    axiomaticVector: 'Cognitive Overclocking; accelerates mental rendering speed hundreds of times for frame-perfect precognitive simulation.',
    fuelGrade: 'Superfluid'
  },
  {
    id: 'melammu-glaze',
    name: 'Melammu-Glaze',
    sector: 'Kemetic & Sumerian',
    state: 'Pressurized golden nimbus draping skin like liquid glass',
    mythicRoot: 'Mesopotamian divine radiance possessed by gods and kings that forces surrender.',
    axiomaticVector: 'Psychological Gravitas & Coercive Dread; crushes neurological willpower; mortals collapse from phantom atmospheric pressure.',
    fuelGrade: 'Heavy Nectar'
  },
  {
    id: 'sekhem-pulse',
    name: 'Sekhem-Pulse',
    sector: 'Kemetic & Sumerian',
    state: 'High-frequency, crackling emerald-gold current',
    mythicRoot: 'Living energy of destruction and restoration tied to lion-goddess Sekhmet.',
    axiomaticVector: 'Cellular Restructuring & Flesh-Welding; reconstructs sheared organs or fuses enemy limbs together upon contact.',
    fuelGrade: 'Plasma'
  },
  {
    id: 'heka-vapor',
    name: 'Heka-Vapor',
    sector: 'Kemetic & Sumerian',
    state: 'Invisible, dry metaphysical atmosphere rippling like a desert heat mirage',
    mythicRoot: 'Primordial creative force preceding the gods, compelling reality via spoken words.',
    axiomaticVector: 'Law-Enforcement & Counter-Causality; ontological dampener snapping foreign spells and wards out of the timeline.',
    fuelGrade: 'Volatile'
  },
  {
    id: 'tey-ren-vibration',
    name: 'Tey-Ren Vibration',
    sector: 'Kemetic & Sumerian',
    state: 'Acoustic, subterranean resonance humming through bone',
    mythicRoot: 'The Egyptian Ren (true secret name anchoring a being to the cosmic ledger).',
    axiomaticVector: 'Identity-Targeting Vectors; tracks enemies across dimensional phases by locking onto their metaphysical name.',
    fuelGrade: 'Volatile'
  },
  {
    id: 'apep-sludge',
    name: 'Apep-Sludge',
    sector: 'Kemetic & Sumerian',
    state: 'Cold, lightless pitch-slurry dredged from beneath the Duat',
    mythicRoot: 'Venom of chaos serpent Apep seeking to drown the sun barge into non-being.',
    axiomaticVector: 'Light-Extinction & Spatial Dissolution; snuffs local photons, freezes heat, rots technology on contact.',
    fuelGrade: 'Superfluid'
  },
  {
    id: 'tonalli-ray',
    name: 'Tonalli-Ray',
    sector: 'Mesoamerican',
    state: 'Scorching, needle-sharp white solar plasma housed in skull and hair',
    mythicRoot: 'Fire given by dual creator Ometeotl governing destiny and intellectual vigor.',
    axiomaticVector: 'Destiny-Piercing Beams; fires linear scalar vectors from forehead bypassing armor to strike personal fate.',
    fuelGrade: 'Plasma'
  },
  {
    id: 'teyolia-marrow',
    name: 'Teyolia-Marrow',
    sector: 'Mesoamerican',
    state: 'Pulsing, deep-crimson bio-fuel circulating directly through aorta',
    mythicRoot: 'Divine heart fire that survives death and travels to the sun god.',
    axiomaticVector: 'Kinetic Overcharge & Blood-Combustion; converts life force into explosive physical velocity and concussive shockwaves.',
    fuelGrade: 'Volatile'
  },
  {
    id: 'ihiyotl-gale',
    name: 'Ihiyotl-Gale',
    sector: 'Mesoamerican',
    state: 'Green-black, sulfurous vapor vented from lower organs',
    mythicRoot: 'Soul breath of the liver, housing animal passions, hatred, and virulent curses.',
    axiomaticVector: 'Curse-Mist & Behavioral Degradation; inflames irrational panic and cellular decay in all breathing organisms.',
    fuelGrade: 'Volatile'
  },
  {
    id: 'sacred-itz',
    name: 'Sacred Itz',
    sector: 'Mesoamerican',
    state: 'Sticky, iridescent sap crystallizing on exposure to air',
    mythicRoot: 'Divine cosmic resin running through plants, blood, and rain that sustains the universe.',
    axiomaticVector: 'Metaphysical Adhesion; binds disparate concepts together (e.g. sticking an enemy’s shadow to a concrete wall).',
    fuelGrade: 'Heavy Nectar'
  },
  {
    id: 'eitr-slag',
    name: 'Eitr-Slag',
    sector: 'Norse & Runic',
    state: 'Thick, yeasty venom that hardens into dense volcanic-looking ice',
    mythicRoot: 'Primordial poison flowing from spring Hvergelmir that formed first giant Ymir.',
    axiomaticVector: 'Toxic Vitrification; liquid upon discharge, flash-freezes into brittle razor-sharp venomous rime upon flesh contact.',
    fuelGrade: 'Vitrified'
  },
  {
    id: 'elivagar-brine',
    name: 'Elivagar-Brine',
    sector: 'Norse & Runic',
    state: 'Freezing, pale-blue heavy water that does not evaporate',
    mythicRoot: 'Venomous primordial rivers of Niflheim.',
    axiomaticVector: 'Entropic Quenching; completely arrests kinetic momentum, freezing thermodynamic processes instantly.',
    fuelGrade: 'Superfluid'
  }
];

// 4. Underworld Sectors & Real Estate (All 29 Canonical Realms)
export const UNDERWORLD_SECTORS: UnderworldRealm[] = [
  // I. Hellenic & Tartarean Sector
  {
    id: 'tartaros-barathron',
    name: 'Tartaros-Barathron (The Iron Well)',
    sector: 'Hellenic & Tartarean',
    visuals: 'Endless vertical chasm bounded by triple-layered walls of adamantine bronze. Sky of black lightning that never hits the ground, casting strobing blue glare across suspended iron cages.',
    dominantEntities: 'Chained Titan-class remnants, Hekatonkheires wardens, and Tartarean jailer-demons.',
    loreContext: 'The deepest penal foundation of the Greek underworld, currently tested by Solomonic reconnaissance scouts.'
  },
  {
    id: 'acheron-vael',
    name: 'Acheron-Vael (The River of Woe)',
    sector: 'Hellenic & Tartarean',
    visuals: 'Vast stagnant swamp of black silt and pulverized bone under freezing motionless grey fog. Dead petrified willows of calcified ash trail into dead-water.',
    dominantEntities: 'Charon-class ferrymen, drifting Lemures, and weeping soul-husks.',
    loreContext: 'Primary transit boundary for deceased Category 4 souls; heavily contested between Hades and Goetic salvage houses.'
  },
  {
    id: 'phlegethon-khar',
    name: 'Phlegethon-Khar (The River of Boiling Slag)',
    sector: 'Hellenic & Tartarean',
    visuals: 'Tectonic canyon carved out of mirror-sharp obsidian channeling a roaring torrent of crimson, smokeless liquid hellfire.',
    dominantEntities: 'The Pyrosthath, molten salamander-strains, and flame-carved brute castes.',
    loreContext: 'Key industrial foundry sector supplying chthonic metallurgy to surrounding shock-legions.'
  },
  {
    id: 'cocytus-rime',
    name: 'Cocytus-Rime (The Lamentation Flats)',
    sector: 'Hellenic & Tartarean',
    visuals: 'Blindingly flat expanse of translucent black ice formed from frozen tears. Beneath the ice, millions of pale, frost-bitten faces stare upward in eternal silence.',
    dominantEntities: 'Cryo-wraiths, traitor-shades, and Empusa frost-stalkers.',
    loreContext: 'Freezing penitentiary plain where oath-breakers and traitors are vitrified in acoustic silence.'
  },
  // II. Vedic & Dharmic Sector
  {
    id: 'maharaurava',
    name: 'Maharaurava (The Realm of Screaming Copper)',
    sector: 'Vedic & Dharmic',
    visuals: 'Landscape of incandescent polished copper bedrock glowing orange with internal heat. Towering brass pillars with razor blade branches (Asipattravana) chiming in gale winds.',
    dominantEntities: 'The Ruru (flesh-eating serpent-deer), six-armed Asura duelists, and iron-horned Daitya warlords.',
    loreContext: 'Strict punitive Naraka layer where souls endure karmic restitution under brutal thermodynamic stress.'
  },
  {
    id: 'sutala-prime',
    name: 'Sutala-Prime (The Gilded Subterrane)',
    sector: 'Vedic & Dharmic',
    visuals: 'Immense underground paradise of black-stone palaces inlaid with gold and rubies, illuminated by floating artificial sun-orbs.',
    dominantEntities: 'King Bali’s ancestral Daitya court, noble Asura dynasts, and armored demon-guards.',
    loreContext: 'The most opulent subterranean capital in Patala, rivaling the celestial palaces of Indra.'
  },
  {
    id: 'bhogavati',
    name: 'Bhogavati (The Naga Jewel-Depths)',
    sector: 'Vedic & Dharmic',
    visuals: 'Bioluminescent subterranean metropolis carved into hollow diamond caverns, lit by self-shining Naga-mani gems embedded in the scales of colossal serpents.',
    dominantEntities: 'Vasuki’s royal Naga broods, venomous Uraga sentinels, and hooded serpent-sorcerers.',
    loreContext: 'Deepest layer of Patala where the royal Naga courts hoard soma-derivatives and kalakuta venom.'
  },
  {
    id: 'kumbhipaka',
    name: 'Kumbhipaka (The Boiling Oil Cauldrons)',
    sector: 'Vedic & Dharmic',
    visuals: 'Industrial hellscape of miles-wide bronze vats suspended over volcanic fissures, filled with bubbling, pitch-black sulfur oil.',
    dominantEntities: 'Yamadutas (Messengers of Yama), iron-beaked Sarama-hounds, and oil-scalded Rakshasa torturers.',
    loreContext: 'High-heat karmic refinery overseen by Yama’s martial wardens.'
  },
  // III. Goetic & Solomonic Sector
  {
    id: 'dite-sovereign',
    name: 'Dite-Sovereign (Citadel of Three Crowns)',
    sector: 'Goetic & Solomonic',
    visuals: 'Colossal mountain-sized fortress carved from black volcanic glass, crowned by three sharp spires piercing silent grey fog; massive iron barred gates.',
    dominantEntities: 'The High House of Bael, iron-armored phalanxes, and formless fog-assassins.',
    loreContext: 'Political capital of the Abrahamic / Infernal Hegemony, commanding the 72 Pillar Noble Clans.'
  },
  {
    id: 'paimon-glass-wastes',
    name: 'The Glass Wastes of Paimon',
    sector: 'Goetic & Solomonic',
    visuals: 'Endless desert of powdered emerald and ruby glass dunes under a sky of perpetual brass twilight, echoing with dissonant phantom trumpets and cymbals.',
    dominantEntities: 'Dromedary-mounted Goetic knights, the Djinn-bound legions of Paimon, and sand-wraiths.',
    loreContext: 'Western staging ground of the Goetic royalty where 200 legions parade across vitrified glass.'
  },
  {
    id: 'golachab-foundry',
    name: 'Golachab-Foundry (The Qliphothic Furnace)',
    sector: 'Goetic & Solomonic',
    visuals: 'Chaotic gravity-defying megastructure of rusted iron pipes, upside-down cathedrals, and open-hearth blast furnaces spewing greasy red smoke.',
    dominantEntities: 'Asmodean artificers, brass-grafted brute golems, and Qliphothic burner-fiends.',
    loreContext: 'Primary weapons manufacturer for the Qliphothic Husks and Goetic siege engines.'
  },
  {
    id: 'samael-gallows',
    name: 'Samael-Gallows (The Iron Orchard)',
    sector: 'Goetic & Solomonic',
    visuals: 'Petrified forest of towering black iron trees from which hang thousands of rusted cages and tolling bronze bells across blood-red moss.',
    dominantEntities: 'Arch-Ducal executioners, crow-headed Malphas builders, and winged tribunal inquisitors.',
    loreContext: 'Tribunal execution sector where broken demonic pacts are punished.'
  },
  // IV. Mesopotamian & Sumerian Sector
  {
    id: 'kur-ganzer',
    name: 'Kur-Ganzer (The Seven-Gated Dust)',
    sector: 'Mesopotamian & Sumerian',
    visuals: 'Colossal sunken ziggurat inverted into the earth, surrounded by seven concentric walls of baked mud-brick and lapis lazuli. Everything is coated in thick grey funeral dust.',
    dominantEntities: 'Ereshkigal’s Galla wardens, Pazuzu wind-fiends, and dust-eating Edimmu shades.',
    loreContext: 'The oldest recorded funerary fortress; visitors are stripped of oneontological protection at each of the seven gates.'
  },
  {
    id: 'abzu-tiamat',
    name: 'Abzu-Tiamat (The Brine-Womb)',
    sector: 'Mesopotamian & Sumerian',
    visuals: 'Pitch-black, hyper-pressurized subterranean ocean of primordial salt-water where massive bioluminescent ribs of dead primordial dragons form coral reefs.',
    dominantEntities: 'Ugallu storm-lions, Mushussu dragon-vipers, and Kusarikku bull-men.',
    loreContext: 'Spawning sea of the eleven chaos-monsters birthed from Tiamat’s primordial blood.'
  },
  {
    id: 'kigal-lilitu',
    name: 'Kigal-Lilitu (The Howling Steppe)',
    sector: 'Mesopotamian & Sumerian',
    visuals: 'Barren wind-scoured plateau of cracked clay and ruined watchtowers under a blood-eclipsed moon.',
    dominantEntities: 'Lilitu night-huntresses, Ardat-Lili succubi, and Lamashtu brood-mothers.',
    loreContext: 'Borderland wasteland between Kur and the mortal dream-layers.'
  },
  // V. Kemetic & Egyptian Sector
  {
    id: 'duat-amenthes',
    name: 'Duat-Amenthes (The Twelve Caverns of Night)',
    sector: 'Kemetic & Egyptian',
    visuals: 'Series of monumental basalt caverns connected by a subterranean river of liquid starlight, lined with 300-foot statues of jackal- and crocodile-headed judges.',
    dominantEntities: 'Gate-wardens with butcher knives, Ammit-strain devourers, and Heka-bound mummified pharaohs.',
    loreContext: 'Fortified solar transit corridor defended nightly against Void-Serpent incursions.'
  },
  {
    id: 'lake-of-khepri-fire',
    name: 'The Lake of Khepri-Fire',
    sector: 'Kemetic & Egyptian',
    visuals: 'Vast geometric basin of liquid solar gold surrounded by four colossal fire-spitting cobras at the cardinal points.',
    dominantEntities: 'Flame-baboons, solar executioners, and scorched shadow-eaters.',
    loreContext: 'Purification and annihilation reservoir where condemned Ba and Khat remnants are incinerated.'
  },
  {
    id: 'apep-coils',
    name: 'Apep-Coils (The Sandbank of Non-Existence)',
    sector: 'Kemetic & Egyptian',
    visuals: 'Lightless void-trench filled with shifting grey sandbars that look like the shedding skin of a planet-sized serpent. Gravity pulls sideways.',
    dominantEntities: 'Spawns of Apep, chaos-worms, and reality-unraveling shades.',
    loreContext: 'Quarantined hazard zone where Apep attempts to swallow the solar barge and collapse causality.'
  },
  // VI. East Asian Sector (Diyu & Yomi)
  {
    id: 'fengdu-necropolis',
    name: 'Fengdu-Necropolis (The Ten Iron Courts)',
    sector: 'East Asian (Diyu & Yomi)',
    visuals: 'Vertical mountain-city of multi-tiered black-slate pagodas and arched stone bridges spanning abyssal fog, lit by floating ghost-green lanterns.',
    dominantEntities: 'The Ten Kings of Yanluo, Ox-Head and Horse-Face wardens, and judicial ghost-scribes.',
    loreContext: 'Administrative capital of Diyu, processing souls through mechanical bureaucratic court hearings.'
  },
  {
    id: 'yomi-no-kuni',
    name: 'Yomi-no-Kuni (The Root-Land of Rot)',
    sector: 'East Asian (Diyu & Yomi)',
    visuals: 'Sprawling, damp cavern system choked by giant pallid tree roots, black mire, and rotting wooden shrines sealed behind boulder-barriers (Chigaeshi).',
    dominantEntities: 'Yomotsu-Shikome (hags of Yomi), Raiju-corrupted Oni clans, and centipede-infested skeletal samurai.',
    loreContext: 'Sealed Japanese necrotic realm where physical decay manifests as sentient miasma.'
  },
  {
    id: 'avici-lotus',
    name: 'Avici-Lotus (The Crimson Ice-Hell)',
    sector: 'East Asian (Diyu & Yomi)',
    visuals: 'Glacial basin where the cold is so extreme that flesh splits open like blooming red lotus flowers (Mahapadma), surrounded by mirrors reflecting past sins.',
    dominantEntities: 'Blue-skinned Oni executioners, karma-mirror phantoms, and frost-jiangshi.',
    loreContext: 'The eighth and deepest cold-naraka reserved for catastrophic karmic violators.'
  },
  // VII. Norse, Germanic & Celtic Sector
  {
    id: 'nastrond-hall',
    name: 'Nastrond-Hall (The Corpse-Shore)',
    sector: 'Norse, Germanic & Celtic',
    visuals: 'Colossal mead-hall woven entirely from the spines of living venomous serpents whose heads face inward, dripping lakes of glowing green poison onto the floor.',
    dominantEntities: 'Brood of Nidhogg, oath-breaker Draugr, and venom-soaked Valkyrie-falls.',
    loreContext: 'Terminal shore of Helheim where Nidhogg chews the roots of the cosmic ash.'
  },
  {
    id: 'muspel-surtr',
    name: 'Muspel-Surtr (The Cinder-Trench)',
    sector: 'Norse, Germanic & Celtic',
    visuals: 'Tectonic rift of blinding white-hot magma and floating islands of black pumice, showered by embers large enough to crush castles.',
    dominantEntities: 'Fire-Jotnar, Surtr’s soot-armored vanguard, and ash-wolves.',
    loreContext: 'Thermodynamic furnace world waiting to march across the rainbow bridge.'
  },
  {
    id: 'annwn-cauldron',
    name: 'Annwn-Cauldron (The Grey Glass Mire)',
    sector: 'Norse, Germanic & Celtic',
    visuals: 'Twilight realm of silver-barked forests, bottomless peat bogs, and hollow hills lit by cold fairy-fire.',
    dominantEntities: 'The Sluagh (Unforgiven Dead), Cwn Annwn (spectral red-eared hounds), and Fomorian deep-mutants.',
    loreContext: 'Otherworldly Celtic abyss where the Wild Hunt rides out to harvest stray souls.'
  },
  // VIII. Mesoamerican Sector (Xibalba & Mictlan)
  {
    id: 'xibalba-chak',
    name: 'Xibalba-Chak (The Obsidian Razor-Plains)',
    sector: 'Mesoamerican',
    visuals: 'Jagged plateau swept by screaming blade-winds flinging razor obsidian shards, centered around colossal blood-stained ball courts.',
    dominantEntities: 'The Twelve Lords of Death (Hun-Came, Vucub-Came), Camazotz bat-horrors, and skeletal disease lords.',
    loreContext: 'Cosmic trial grounds where mortal heroes and rival demons compete in lethal ball-games.'
  },
  {
    id: 'mictlan-nine',
    name: 'Mictlan-Nine (The Crushing Mountains)',
    sector: 'Mesoamerican',
    visuals: 'Corridor of two titanic basalt mountain ranges that rhythmically slam together with earth-shattering force before pulling apart, carpeted in bright orange marigolds.',
    dominantEntities: 'Mictlantecuhtli’s owl-messengers, Tzitzimime star-demons, and Xoloitzcuintli soul-guides.',
    loreContext: 'Ninth-tier soul trial where timing and bone-density determine survival.'
  },
  {
    id: 'house-of-jaguars',
    name: 'The House of Jaguars (Balam-Crypt)',
    sector: 'Mesoamerican',
    visuals: 'Pitch-black overgrown jungle temple inside a hollow subterranean stalactite, echoing with low guttural growls and dripping blood.',
    dominantEntities: 'Shadow-jaguars with obsidian teeth, flayed-skin priests, and blood-vine stalkers.',
    loreContext: 'Predatory ambush trial house of Xibalba.'
  },
  // IX. Primordial & Deep-Void Sector
  {
    id: 'qliphoth-thaumiel',
    name: 'Qliphoth-Thaumiel (The Split-Headed Husk)',
    sector: 'Primordial & Deep-Void',
    visuals: 'Non-Euclidean void of floating fractured geometric shells and inverted silver trees growing downward into purple nothingness.',
    dominantEntities: 'Two-headed Qliphothic sovereigns, anti-life husks, and entropy-leeches.',
    loreContext: 'Outer shell of the anti-tree where fractured divine leftovers calcify into anti-life.'
  },
  {
    id: 'chasm-of-erebos-prime',
    name: 'The Chasm of Erebos-Prime',
    sector: 'Primordial & Deep-Void',
    visuals: 'The absolute bottom of the Nethermost. No ground, no sky—only heavy, breathable black darkness as thick as water, punctuated by distant dying stars.',
    dominantEntities: 'First-Generation Void-Spawns, Nyx-remnants, and un-named Deep-Dwellers.',
    loreContext: 'Where Root I and Root XII meet; even the 72 Goetic Kings and Yama’s courts refuse to send scouts here.'
  }
];

// 5. Inverted Beast Manifolds
export const INVERTED_BEAST_MANIFOLDS: InvertedBeastRealm[] = [
  {
    id: 'bast-irkalla',
    name: 'Bast-Irkalla',
    mirrorAnimal: 'Felines (Cats / Panthers)',
    rulingCaste: 'The Shadow-Stalkers of Vepar',
    nature: 'Absolute silence; spires curve like feline claws under indigo aurora; assassination via shadow-severing.'
  },
  {
    id: 'mal-caballus',
    name: 'Mal-Caballus',
    mirrorAnimal: 'Equines (Horses / Steeds)',
    rulingCaste: 'The Nightmares of House Orobas',
    nature: 'Hypersonic white salt flats beneath rust-colored skies; skinless thunder-steeds; spatial-drag gravity.'
  },
  {
    id: 'canis-hades',
    name: 'Canis-Hades',
    mirrorAnimal: 'Canines (Wolves / Hounds)',
    rulingCaste: 'The Cerberean & Garmr Broods',
    nature: 'Labyrinth of jagged slate ravines overgrown with barbed iron briars; tracks soul-guilt across dimensional rifts.'
  },
  {
    id: 'ophi-nadir',
    name: 'The Ophi-Nadir',
    mirrorAnimal: 'Serpents & Reptiles',
    rulingCaste: 'The Nagas & Typhonian Spawns',
    nature: 'Subterranean venom oceans; petrification gazes; non-Euclidean constricting spatial coils.'
  },
  {
    id: 'vespa-tartaros',
    name: 'Vespa-Tartaros',
    mirrorAnimal: 'Insects & Arthropods',
    rulingCaste: 'The Zebub-Brood & Kyrak-Kai',
    nature: 'Swarms of millions; hive-mind burrowers that hollow out entire subterranean continents.'
  },
  {
    id: 'corvus-gallow',
    name: 'Corvus-Gallow',
    mirrorAnimal: 'Avians (Ravens / Vultures)',
    rulingCaste: 'The Stymphalian Harpies & Stolas-Kin',
    nature: 'Razor-feathered sky-terrors; scouts of battlefield slaughter and death-prophecy.'
  }
];

// 6. Initial Seed Dossiers for Character, Creature, Artifact, and 3D Production Specs
export const INITIAL_DOSSIERS: DossierRecord[] = [
  {
    id: 'dossier-1',
    title: 'Ash-Vanguard Warlord (Khorvath Strikecaster)',
    type: 'Character',
    categoryTier: 'Category 5',
    summary: 'Four-horned Nether-legion frontline commander wielding ignited sulfur breath and iron-scaled dermal armor.',
    description: `A battle-hardened frontline shock commander from the Khorvath caste. Stands 9 feet tall with an iron-scaled hide that deflects standard kinetic ordnance. Operates by channeling Vaelburn Spark and Tejas-Flame directly into heavy forged-chasm cleavers.

Combat Doctrine: Charges vanguard battle lines, discharging barometric shockwaves (equivalent to Gō-Ki version II) to collapse trench lines before engaging in close-quarters cleaving.`,
    visualDirection: 'Bulky, brutalist silhouette. Charcoal-black iron plates fused directly to skin. Brow crowned by four swept-back horns. Eyes smolder with dull orange internal embers. Constant trail of superheated sulfur gas venting from nasal slits.',
    soundDesignNotes: 'Heavy resonant footsteps with ground-shake bass. Vocalization is a dual-tone guttural rasp layered with the sound of roaring furnace draft. Weapon swings emit high-pitch whistling vacuum cuts.',
    production3DNotes: 'Polygon target: ~65k tris for hero model. Textures: 4K PBR (albedo, roughness, metallic, normal, emissive, subsurface scattering). Requires secondary bone chains for horn trinkets and cloth strips. Rigging: IK-FK hybrid for heavy quadrupedal stomp stances.',
    associatedFuelOrKi: 'Ara-Ki (Type I) + Vaelburn Spark',
    possibilityResistanceTier: 'Moderate (0.42 Delta) — Focuses on kinetic force amplification',
    createdAt: '2026-10-23T08:00:00Z',
    updatedAt: '2026-10-23T08:00:00Z',
    tags: ['Demon', 'Khorvath', 'Warlord', 'Frontline', 'Ara-Ki']
  },
  {
    id: 'dossier-2',
    title: 'Somatic Iron-Monk (Kokotsu Ascetic)',
    type: 'Character',
    categoryTier: 'Category 4',
    summary: 'Human ascetic in peak Ren-Ki and Kokotsu variant, displaying calcified bone ridges and steam-venting pores.',
    description: `A mortal master who has survived the brutal ascetic tempering of Nigi-Ki and Ara-Ki. By absorbing ambient silicon and iron into his osteoblast network, his skeletal frame possesses the structural mass of solid basalt.

Somatic Mechanics: Under sustained Ren-Ki, strikes deliver the unyielding mass of mountain rock directly into targets. When pushed to Gō-Ki, core temperature spikes to 112°F, triggering dense white pore-steam venting from shoulders and forearms.`,
    visualDirection: 'Weathered, lean, muscular physique wrapped in coarse indigo and slate wraps. Calcified bone ridges erupt along knuckles, brow, and shins. Veins thrum with pale cerulean bio-currents. Shrouded in a hissing haze of vaporized sweat.',
    soundDesignNotes: 'Acoustic footprint is paradoxically silent until strike impact: striking his flesh creates the deafening metallic clang of an iron sledgehammer hitting granite. Roar (Kiai) triggers a sub-bass low-pass filter on surrounding environment.',
    production3DNotes: 'Polygon target: ~45k tris. Dermal maps require custom cavity and displacement maps for the calcified bone ridges. Shader requires dynamic steam particle emitter attached to forearm and collarbone sockets.',
    associatedFuelOrKi: 'Nigi-Ki (Type II) + Ara-Ki (Type I) + Kokotsu Variant',
    possibilityResistanceTier: 'Zero (Somatic constant, does not tax Many-Worlds)',
    createdAt: '2026-10-23T08:15:00Z',
    updatedAt: '2026-10-23T08:15:00Z',
    tags: ['Human', 'Kokotsu', 'Ascetic', 'Somatic', 'Pore-Steam']
  },
  {
    id: 'dossier-3',
    title: 'The Charaktêr Decanic Gearbox',
    type: 'Artifact',
    categoryTier: 'Artifact',
    summary: 'A Sabian planetary brass and iron clockwork gear inspirited during Mars decanic alignment, radiating a local time-dilation field.',
    description: `Forged according to the astral mechanics of the Picatrix and the 36 Faces of the zodiac. Constructed from heavy cold-rolled iron quenched in toxic nightshade oil. 

At the exact second the Mars decan crossed the local horizon, a non-linguistic Charaktêr scratch was carved into the outer teeth, permanently trapping cosmic potential. Continuously radiates a 4-meter reality-warping field causing local spatial deceleration and atomic degradation.`,
    visualDirection: 'Heavy astronomical astrolabe gear, 18 inches in diameter. Deeply weathered bronze and black iron with jagged, non-Euclidean scratches glowing dull crimson along the perimeter. Mounted on a gimbal stand of black basalt.',
    soundDesignNotes: 'Continuous low metallic ticking accompanied by an eerie subterranean hum that causes water in nearby glasses to form geometric standing waves.',
    production3DNotes: 'Polygon target: ~12k tris. Textures: 2K PBR with intricate height/normal maps for the engraved Charaktêres. Central gear requires continuous slow rotation axis in game engine.',
    associatedFuelOrKi: 'Decanic Vector Anchoring (Astro-Thaumaturgy)',
    possibilityResistanceTier: 'High (0.78 Delta) — Anchored into planetary coordinates to absorb kickback',
    createdAt: '2026-10-23T08:30:00Z',
    updatedAt: '2026-10-23T08:30:00Z',
    tags: ['Artifact', 'Picatrix', 'Decan', 'Astro-Thaumaturgy', 'Clockwork']
  },
  {
    id: 'dossier-4',
    title: 'Bast-Irkalla Shadow-Severer',
    type: 'Creature',
    categoryTier: 'Category 5',
    summary: 'Predatory feline shade from Bast-Irkalla that stalks along zero-acoustic frequencies and assassinates targets by cleaving their shadow.',
    description: `Indigenous apex predator of the inverted feline manifold Bast-Irkalla. Moves without producing acoustic waves or air displacement. 

Axiomatic Capability: Rather than striking physical flesh, its razor talons sever the target’s shadow from the ground. Because the shadow is an ontological extension of Soul 1, severing the shadow immediately collapses the victim’s physical motor function and severs arterial pathways.`,
    visualDirection: 'Elongated, quadrupedal feline silhouette made of shifting matte-black particulate matter. Zero specular reflections; drinks ambient light. Eyes are twin crescent slits of cold pale violet.',
    soundDesignNotes: 'Absolute acoustic null. When it steps, ambient game audio drops by -12 dB. Attacks produce a sharp, wet tearing sound as the shadow splits.',
    production3DNotes: 'Target: ~30k tris. Custom light-extinction unlit shader with edge rim Fresnel in pale violet. Tail has dynamic ribbon particle trail.',
    associatedFuelOrKi: 'Kage-Kiri Variant + Inverted Beast Manifold',
    possibilityResistanceTier: 'Moderate (0.55 Delta)',
    createdAt: '2026-10-23T08:45:00Z',
    updatedAt: '2026-10-23T08:45:00Z',
    tags: ['Creature', 'Bast-Irkalla', 'Shadow-Stalker', 'Feline', 'Inverted']
  }
];
