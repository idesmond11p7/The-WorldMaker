export interface VisualAsset {
  id: string;
  title: string;
  category: 'Environment' | 'Character / Somatics' | 'Artifact / Seal' | 'Inverted Realm';
  src: string;
  aspectRatio: '16:9' | '3:4' | '1:1';
  prompt: string;
  composition: string;
  colorPalette: { name: string; hex: string }[];
  lightingAndAtmosphere: string;
  inWorldGrounding: string;
  production3DNotes: string;
}

export const VISUAL_ASSETS: VisualAsset[] = [
  {
    id: 'tartaros-phlegethon',
    title: 'Tartaros-Barathron & The River Phlegethon',
    category: 'Environment',
    src: '/images/urworlds_chthonic_tartaros_1792769525621.jpg',
    aspectRatio: '16:9',
    prompt: 'Cinematic wide shot of an obsidian subterranean canyon in a dark mythic world, a river of smokeless crimson liquid hellfire flowing through razor-sharp black volcanic glass, glowing adamantine bronze pillars, ceiling illuminated by strobing cold blue lightning, epic dark fantasy concept art, atmospheric volume and scale.',
    composition: 'Leading curve of the molten hellfire river guiding the eye through cyclopean adamantine colonnades toward the vanishing point abyss.',
    colorPalette: [
      { name: 'Obsidian Basalt', hex: '#0B0D10' },
      { name: 'Phlegethon Crimson', hex: '#DC2626' },
      { name: 'Adamantine Bronze', hex: '#B45309' },
      { name: 'Cold Strobe Blue', hex: '#38BDF8' }
    ],
    lightingAndAtmosphere: 'High-contrast dual key light: warm, radiant updraft glow from the smokeless magma contrasted with cold, sporadic flashes of ceiling-bound black-blue lightning.',
    inWorldGrounding: 'Visualizes Tartaros-Barathron and the River Phlegethon, where Titan-class remnants remain chained under perpetual strobing electrical glare.',
    production3DNotes: 'Level geometry: modular instanced pillars with high-density normal baking from ZBrush sculpts. Water/magma surface uses dual flow-maps with emissive Fresnel falloff. Volumetric fog pass with blue-biased scattering.'
  },
  {
    id: 'somatic-ki-warrior',
    title: 'Somatic Ki Master: Ara-Ki & Gō-Ki State',
    category: 'Character / Somatics',
    src: '/images/somatic_ki_warrior_1792769526285.jpg',
    aspectRatio: '3:4',
    prompt: 'Epic dark mythic character study of an ancestral martial artist in peak Ara-Ki state, hissing superheated white pore-steam venting from muscular shoulders and forearms, veins glowing with bruised violet static and crimson bio-currents, graphite bone ridges visible along knuckles, intensely grounded and visceral combat aesthetic.',
    composition: 'Grounded, low-center-of-gravity horse stance on fractured crags. Tense forearm diagonals framing the torso and channeling kinetic pressure into clenched fists.',
    colorPalette: [
      { name: 'Somatic Charcoal', hex: '#1E293B' },
      { name: 'Bruised Indigo', hex: '#4338CA' },
      { name: 'Arterial Crimson', hex: '#991B1B' },
      { name: 'Pore-Steam White', hex: '#F8FAFC' }
    ],
    lightingAndAtmosphere: 'Dramatic natural rim light highlighting venting clouds of pore-steam. Vein currents provide internal sub-dermal luminescence.',
    inWorldGrounding: 'Depicts a Kokotsu-variant human ascetic operating at peak hydraulic backpressure. The body aggressively vents scalding sweat to prevent internal organ cooking at 110°F+ core temperatures.',
    production3DNotes: 'Character mesh: 45k polygons. Custom skin shader with dynamic subsurface scattering (SSS) linked to internal temperature float. Particle system on mesh surface spawning ribbon-based pore-steam trails.'
  },
  {
    id: 'bast-irkalla-realm',
    title: 'Bast-Irkalla: The Inverted Felis Manifold',
    category: 'Inverted Realm',
    src: '/images/bast_irkalla_inverted_realm_1792769527088.jpg',
    aspectRatio: '16:9',
    prompt: 'Eerie subterranean metropolis of needle-sharp spires curving like feline claws under a dark indigo cosmic aurora, total silence atmosphere, matte-black architectural silhouettes and cold pale violet starlight, non-Euclidean mystical architecture, dark mythic world concept.',
    composition: 'Multi-tiered spiraling walkways and razor bridges rising into curving cathedral spires that evoke unsheathed claws grasping the aurora ceiling.',
    colorPalette: [
      { name: 'Matte Void Black', hex: '#050508' },
      { name: 'Abyssal Violet', hex: '#581C87' },
      { name: 'Aurora Indigo', hex: '#312E81' },
      { name: 'Cold Starlight', hex: '#E0E7FF' }
    ],
    lightingAndAtmosphere: 'Subdued ambient light with zero acoustic vibration. Light is absorbed rather than reflected, giving walls an unearthly matte texture.',
    inWorldGrounding: 'The capital of the inverted feline manifold ruled by the Shadow-Stalkers of Vepar, where sound cannot propagate and assassins step through the shadows of victims.',
    production3DNotes: 'Environment layout: modular gothic-inspired cat-claw spires. Architecture shaders use an aggressive roughness clamp (0.95+) and negative specular response to mimic photonic absorption.'
  },
  {
    id: 'cacodictyology-seal',
    title: 'Pactional Jurisprudence Seal of Root IV',
    category: 'Artifact / Seal',
    src: '/images/cacodictyology_astral_seal_1792769527671.jpg',
    aspectRatio: '1:1',
    prompt: 'Ancient occult geometric seal etched in weathered dark bronze and lead, Solomonic pactional jurisprudence diagram, intricate mathematical glyphs, non-linguistic Charaktêres scratches, astronomical decanic circles, museum archival artifact presentation on black velvet.',
    composition: 'Centric hexagonal and concentric ring layout with radial glyphic bands, balancing geometric mathematical precision with archaic ritual wear.',
    colorPalette: [
      { name: 'Weathered Bronze', hex: '#78350F' },
      { name: 'Lead Ingot Grey', hex: '#334155' },
      { name: 'Patina Verdant', hex: '#065F46' },
      { name: 'Archival Velvet', hex: '#0A0A0A' }
    ],
    lightingAndAtmosphere: 'Museum archival spot illumination skimming across the engraved grooves, casting subtle cast shadows within the cut glyphs.',
    inWorldGrounding: 'A Solomonic Clause-Seal used by Pactional Jurists to file metaphysical injunctions against local physical laws, forcing spacetime to yield according to primordial treaties.',
    production3DNotes: 'Prop mesh: 8k tris cylinder disk. 4K parallax occlusion map (POM) or displacement map for deep engraved grooves. Metalness/roughness maps with verdigris patina vertex color masking.'
  }
];
