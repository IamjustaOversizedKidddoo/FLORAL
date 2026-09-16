import { BotanicalItem, BouquetInstance, FlowerRole } from '../types/bouquet';
import { BOTANICAL_CATALOG } from '../data/botanicalCatalog';

/**
 * FLORÆ Dedicated Bouquet Composition Engine
 * 
 * Mathematical Silhouette & Boundary Anchor:
 * - Central Anchor: Vase opening/neck at (50%, 64%)
 * - Vertical Reach: 18% (highest foliage tip) to 65% (rim of vase). Flowers CANNOT exist below y: 65%.
 * - Horizontal Silhouette: Arch envelope radiating outward from the vase neck.
 */

export const BOUQUET_BOUNDS = {
  ANCHOR_X: 50,
  ANCHOR_Y: 56,
  MIN_Y: 20,
  MAX_Y: 58,
  BASE_RIM_Y: 56
};

/**
 * Calculates the maximum allowable half-width spread of the bouquet silhouette at a given vertical position Y.
 * Creates an organic arch/dome silhouette:
 * - At top (y = 18%): half-width is ~12% (x in [38%, 62%])
 * - At mid-body (y = 39%): half-width blooms to ~30.5% (x in [19.5%, 80.5%])
 * - At vase neck (y = 58-60%): half-width tapers to ~12% (x in [38%, 62%])
 */
export function getBouquetHalfWidth(y: number): number {
  if (y < BOUQUET_BOUNDS.MIN_Y || y > BOUQUET_BOUNDS.MAX_Y) {
    return 0;
  }
  const span = BOUQUET_BOUNDS.MAX_Y - BOUQUET_BOUNDS.MIN_Y;
  const t = Math.max(0, Math.min(1, (y - BOUQUET_BOUNDS.MIN_Y) / span));
  
  // Arch formula: base spread + sinusoidal bloom
  return 12 + 18.5 * Math.sin(t * Math.PI);
}

/**
 * Verifies whether a given coordinate point belongs to the cohesive bouquet silhouette.
 */
export function isWithinBouquetSilhouette(x: number, y: number): boolean {
  if (y < BOUQUET_BOUNDS.MIN_Y || y > BOUQUET_BOUNDS.MAX_Y) {
    return false;
  }
  const maxSpread = getBouquetHalfWidth(y);
  return Math.abs(x - BOUQUET_BOUNDS.ANCHOR_X) <= maxSpread;
}

/**
 * Projects/clamps any coordinate to the nearest valid point inside the bouquet silhouette.
 * Prevents flowers from escaping onto the table, letter, margins, or background.
 */
export function clampToBouquetSilhouette(x: number, y: number): { x: number; y: number } {
  // Clamp vertical range strictly between crown and vase neck
  const clampedY = Math.max(BOUQUET_BOUNDS.MIN_Y, Math.min(BOUQUET_BOUNDS.MAX_Y, y));
  const maxSpread = getBouquetHalfWidth(clampedY);
  const minX = BOUQUET_BOUNDS.ANCHOR_X - maxSpread;
  const maxX = BOUQUET_BOUNDS.ANCHOR_X + maxSpread;
  const clampedX = Math.max(minX, Math.min(maxX, x));

  return {
    x: Number(clampedX.toFixed(1)),
    y: Number(clampedY.toFixed(1))
  };
}

/**
 * Role-based scale limits ensuring natural visual hierarchy.
 */
export function getRoleScaleBounds(role?: FlowerRole): { min: number; max: number } {
  switch (role) {
    case 'FOCAL':
      return { min: 0.90, max: 1.30 };
    case 'SECONDARY':
      return { min: 0.70, max: 1.10 };
    case 'FILLER':
      return { min: 0.45, max: 0.85 };
    case 'FOLIAGE':
      return { min: 0.95, max: 1.35 };
    default:
      return { min: 0.50, max: 1.30 };
  }
}

/**
 * Role-based rotation limits for automatic compositions.
 */
export function getRoleRotationBounds(role?: FlowerRole): { min: number; max: number } {
  switch (role) {
    case 'FOCAL':
      return { min: -8, max: 8 };
    case 'SECONDARY':
      return { min: -18, max: 18 };
    case 'FILLER':
      return { min: -28, max: 28 };
    case 'FOLIAGE':
      return { min: -35, max: 35 };
    default:
      return { min: -20, max: 20 };
  }
}

/**
 * Composition Archetypes for Controlled Randomization
 */
export type CompositionArchetype = 'CLASSIC_ROUND' | 'ASYMMETRIC_IKEBANA' | 'WILD_BOTANICAL' | 'MINIMAL_ZEN';

interface ArchetypeSlot {
  role: FlowerRole;
  relX: number; // offset from anchor 50%
  relY: number; // offset from anchor 64% (negative is higher)
  baseRotation: number;
  scaleMult: number;
  zIndex: number;
}

const ARCHETYPE_PATTERNS: Record<CompositionArchetype, ArchetypeSlot[]> = {
  // 1. CLASSIC ROUND: Symmetrical, full, dome-shaped centerpiece
  CLASSIC_ROUND: [
    { role: 'FOLIAGE', relX: -18, relY: -28, baseRotation: -24, scaleMult: 1.15, zIndex: 2 },
    { role: 'FOLIAGE', relX: 18, relY: -26, baseRotation: 22, scaleMult: 1.15, zIndex: 3 },
    { role: 'SECONDARY', relX: -14, relY: -16, baseRotation: -14, scaleMult: 1.0, zIndex: 6 },
    { role: 'SECONDARY', relX: 14, relY: -15, baseRotation: 14, scaleMult: 1.0, zIndex: 7 },
    { role: 'FOCAL', relX: 0, relY: -14, baseRotation: 0, scaleMult: 1.25, zIndex: 10 },
    { role: 'FOCAL', relX: -4, relY: -7, baseRotation: -4, scaleMult: 1.15, zIndex: 11 },
    { role: 'FILLER', relX: 9, relY: -5, baseRotation: 10, scaleMult: 0.85, zIndex: 12 },
    { role: 'FILLER', relX: -11, relY: -3, baseRotation: -12, scaleMult: 0.85, zIndex: 13 }
  ],

  // 2. ASYMMETRIC IKEBANA: Shin (Heaven high left), Soe (Earth right), Hikae (Human center)
  ASYMMETRIC_IKEBANA: [
    { role: 'FOLIAGE', relX: -16, relY: -34, baseRotation: -28, scaleMult: 1.30, zIndex: 3 }, // Shin
    { role: 'FOLIAGE', relX: 19, relY: -20, baseRotation: 30, scaleMult: 1.15, zIndex: 4 }, // Soe
    { role: 'SECONDARY', relX: -8, relY: -22, baseRotation: -16, scaleMult: 1.05, zIndex: 6 },
    { role: 'FOCAL', relX: -2, relY: -12, baseRotation: -2, scaleMult: 1.20, zIndex: 10 }, // Hikae
    { role: 'FILLER', relX: 6, relY: -6, baseRotation: 8, scaleMult: 0.90, zIndex: 12 },
    { role: 'SECONDARY', relX: 15, relY: -10, baseRotation: 18, scaleMult: 0.95, zIndex: 8 }
  ],

  // 3. WILD BOTANICAL: Airy, cascading garden meadow with multi-tiered depth
  WILD_BOTANICAL: [
    { role: 'FOLIAGE', relX: -20, relY: -30, baseRotation: -32, scaleMult: 1.25, zIndex: 2 },
    { role: 'FOLIAGE', relX: 12, relY: -32, baseRotation: 16, scaleMult: 1.20, zIndex: 3 },
    { role: 'SECONDARY', relX: -12, relY: -18, baseRotation: -18, scaleMult: 1.05, zIndex: 5 },
    { role: 'FOCAL', relX: 4, relY: -16, baseRotation: 6, scaleMult: 1.20, zIndex: 9 },
    { role: 'SECONDARY', relX: 16, relY: -14, baseRotation: 24, scaleMult: 1.0, zIndex: 7 },
    { role: 'FILLER', relX: -6, relY: -8, baseRotation: -8, scaleMult: 0.85, zIndex: 11 },
    { role: 'FILLER', relX: 8, relY: -4, baseRotation: 14, scaleMult: 0.80, zIndex: 12 },
    { role: 'FOLIAGE', relX: 22, relY: -8, baseRotation: 35, scaleMult: 1.05, zIndex: 4 }
  ],

  // 4. MINIMAL ZEN: Striking poetic restraint (1 branch, 1 focal blossom, 1 accent)
  MINIMAL_ZEN: [
    { role: 'FOLIAGE', relX: -14, relY: -28, baseRotation: -22, scaleMult: 1.25, zIndex: 3 },
    { role: 'FOCAL', relX: 2, relY: -14, baseRotation: 2, scaleMult: 1.25, zIndex: 10 },
    { role: 'FILLER', relX: -6, relY: -4, baseRotation: -6, scaleMult: 0.90, zIndex: 12 },
    { role: 'SECONDARY', relX: 14, relY: -10, baseRotation: 18, scaleMult: 1.0, zIndex: 8 }
  ]
};

/**
 * Generates an intelligent, cohesive bouquet composition using controlled archetypes.
 */
export function generateIntelligentComposition(archetypeId?: CompositionArchetype): {
  instances: BouquetInstance[];
  vaseId: string;
  wrapId: string;
} {
  const archetypes: CompositionArchetype[] = ['CLASSIC_ROUND', 'ASYMMETRIC_IKEBANA', 'WILD_BOTANICAL', 'MINIMAL_ZEN'];
  const chosenArchetype = archetypeId && archetypes.includes(archetypeId)
    ? archetypeId
    : archetypes[Math.floor(Math.random() * archetypes.length)];
  const slots = ARCHETYPE_PATTERNS[chosenArchetype];

  // Pools by role
  const focalItems = BOTANICAL_CATALOG.filter(b => b.role === 'FOCAL');
  const secondaryItems = BOTANICAL_CATALOG.filter(b => b.role === 'SECONDARY');
  const fillerItems = BOTANICAL_CATALOG.filter(b => b.role === 'FILLER');
  const foliageItems = BOTANICAL_CATALOG.filter(b => b.role === 'FOLIAGE');

  // Pick primary focal blossom
  const primeFocal = focalItems[Math.floor(Math.random() * focalItems.length)];
  // Pick secondary harmonizing bloom
  const primeSecondary = secondaryItems[Math.floor(Math.random() * secondaryItems.length)];
  // Pick foliage
  const primeFoliage = foliageItems[Math.floor(Math.random() * foliageItems.length)];
  // Pick filler
  const primeFiller = fillerItems[Math.floor(Math.random() * fillerItems.length)];

  const instances: BouquetInstance[] = slots.map((slot, index) => {
    let botanical: BotanicalItem;
    if (slot.role === 'FOCAL') botanical = primeFocal;
    else if (slot.role === 'SECONDARY') botanical = primeSecondary;
    else if (slot.role === 'FOLIAGE') botanical = primeFoliage;
    else botanical = primeFiller;

    // Small controlled organic jitter: +/- 1.5% position, +/- 3 deg rotation
    const rawX = BOUQUET_BOUNDS.ANCHOR_X + slot.relX + (Math.random() - 0.5) * 3;
    const rawY = BOUQUET_BOUNDS.ANCHOR_Y + slot.relY + (Math.random() - 0.5) * 2.5;
    const bounded = clampToBouquetSilhouette(rawX, rawY);

    const rotJitter = (Math.random() - 0.5) * 6;
    const scaleBounds = getRoleScaleBounds(botanical.role);
    const targetScale = botanical.defaultScale * slot.scaleMult;
    const boundedScale = Math.max(scaleBounds.min, Math.min(scaleBounds.max, targetScale));

    return {
      instanceId: `inst-${botanical.id}-${Date.now()}-${index}`,
      botanicalId: botanical.id,
      name: botanical.name,
      image: botanical.image,
      category: botanical.category,
      role: botanical.role,
      x: bounded.x,
      y: bounded.y,
      scale: Number(boundedScale.toFixed(2)),
      rotation: Math.round(slot.baseRotation + rotJitter),
      zIndex: slot.zIndex,
      flipX: slot.relX > 0
    };
  });

  return {
    instances: validateBouquetComposition(instances),
    vaseId: 'vase-kintsugi',
    wrapId: 'wrap-none'
  };
}

/**
 * Calculates optimal position when a user clicks '+' to add a flower to the bouquet.
 * Dynamically positions the new item within the silhouette according to its role.
 */
export function calculateNextItemPlacement(
  botanical: BotanicalItem,
  existingItems: BouquetInstance[] | number = []
): Omit<BouquetInstance, 'instanceId'> {
  const items: BouquetInstance[] = Array.isArray(existingItems) ? existingItems : [];
  const existingCount = items.length;
  const role = botanical.role || 'SECONDARY';

  let rawX = BOUQUET_BOUNDS.ANCHOR_X;
  let rawY = BOUQUET_BOUNDS.ANCHOR_Y - 12;
  let baseRot = 0;
  let scaleMultiplier = 1.0;
  let zIndex = 10;

  if (role === 'FOCAL') {
    // Center heart of arrangement
    const focalCount = items.filter(i => i.role === 'FOCAL').length;
    const offsets = [
      { x: 0, y: -12, rot: 0 },
      { x: -5, y: -8, rot: -5 },
      { x: 5, y: -9, rot: 6 },
      { x: 0, y: -18, rot: 2 }
    ];
    const pick = offsets[focalCount % offsets.length];
    rawX = BOUQUET_BOUNDS.ANCHOR_X + pick.x + (Math.random() - 0.5) * 2;
    rawY = BOUQUET_BOUNDS.ANCHOR_Y + pick.y + (Math.random() - 0.5) * 2;
    baseRot = pick.rot;
    scaleMultiplier = 1.15;
    zIndex = 10 + focalCount;
  } else if (role === 'SECONDARY') {
    // Left or right flank around the focal heart
    const leftCount = items.filter(i => i.x < BOUQUET_BOUNDS.ANCHOR_X).length;
    const rightCount = items.filter(i => i.x >= BOUQUET_BOUNDS.ANCHOR_X).length;
    const goLeft = leftCount <= rightCount;

    const offsetRelX = goLeft ? -12 - (leftCount % 3) * 4 : 12 + (rightCount % 3) * 4;
    const offsetRelY = -14 - (existingCount % 4) * 3;

    rawX = BOUQUET_BOUNDS.ANCHOR_X + offsetRelX + (Math.random() - 0.5) * 3;
    rawY = BOUQUET_BOUNDS.ANCHOR_Y + offsetRelY + (Math.random() - 0.5) * 2;
    baseRot = goLeft ? -14 - (existingCount % 3) * 4 : 14 + (existingCount % 3) * 4;
    scaleMultiplier = 1.0;
    zIndex = 7 + (existingCount % 4);
  } else if (role === 'FOLIAGE') {
    // Structural background branches arching high
    const foliageCount = items.filter(i => i.role === 'FOLIAGE').length;
    const foliageConfigs = [
      { x: -16, y: -28, rot: -24 },
      { x: 18, y: -26, rot: 22 },
      { x: -4, y: -34, rot: -8 },
      { x: 22, y: -16, rot: 32 }
    ];
    const cfg = foliageConfigs[foliageCount % foliageConfigs.length];
    rawX = BOUQUET_BOUNDS.ANCHOR_X + cfg.x + (Math.random() - 0.5) * 3;
    rawY = BOUQUET_BOUNDS.ANCHOR_Y + cfg.y + (Math.random() - 0.5) * 2;
    baseRot = cfg.rot;
    scaleMultiplier = 1.20;
    zIndex = 3 + (foliageCount % 3);
  } else {
    // FILLER: Tucks into gaps or adorns the rim
    const fillerCount = items.filter(i => i.role === 'FILLER').length;
    const fillerConfigs = [
      { x: 8, y: -6, rot: 8, z: 12 },
      { x: -10, y: -4, rot: -10, z: 12 },
      { x: 14, y: -12, rot: 14, z: 6 },
      { x: -14, y: -12, rot: -14, z: 6 },
      { x: 0, y: -4, rot: 0, z: 13 }
    ];
    const cfg = fillerConfigs[fillerCount % fillerConfigs.length];
    rawX = BOUQUET_BOUNDS.ANCHOR_X + cfg.x + (Math.random() - 0.5) * 3;
    rawY = BOUQUET_BOUNDS.ANCHOR_Y + cfg.y + (Math.random() - 0.5) * 2;
    baseRot = cfg.rot;
    scaleMultiplier = 0.85;
    zIndex = cfg.z;
  }

  // Clamping to guaranteed bouquet silhouette
  const bounded = clampToBouquetSilhouette(rawX, rawY);
  const scaleBounds = getRoleScaleBounds(role);
  const targetScale = botanical.defaultScale * scaleMultiplier;
  const boundedScale = Math.max(scaleBounds.min, Math.min(scaleBounds.max, targetScale));

  return {
    botanicalId: botanical.id,
    name: botanical.name,
    image: botanical.image,
    category: botanical.category,
    role: botanical.role,
    x: bounded.x,
    y: bounded.y,
    scale: Number(boundedScale.toFixed(2)),
    rotation: Math.round(baseRot),
    zIndex,
    flipX: bounded.x > BOUQUET_BOUNDS.ANCHOR_X
  };
}

/**
 * Universal Composition Validator
 * Automatically audits and clamps any array of flower instances.
 * Repositions stray or corrupted legacy coordinates back inside the bouquet silhouette.
 */
export function validateBouquetComposition(items: BouquetInstance[]): BouquetInstance[] {
  if (!Array.isArray(items)) return [];

  return items.map(item => {
    // Validate position against silhouette
    const bounded = clampToBouquetSilhouette(
      typeof item.x === 'number' ? item.x : BOUQUET_BOUNDS.ANCHOR_X,
      typeof item.y === 'number' ? item.y : BOUQUET_BOUNDS.ANCHOR_Y - 12
    );

    // Validate scale
    const scaleBounds = getRoleScaleBounds(item.role);
    const itemScale = typeof item.scale === 'number' && !isNaN(item.scale) ? item.scale : 1.0;
    const clampedScale = Math.max(scaleBounds.min, Math.min(scaleBounds.max, itemScale));

    // Validate rotation
    const rotation = typeof item.rotation === 'number' && !isNaN(item.rotation) ? item.rotation : 0;
    let normalizedRot = rotation % 360;
    if (normalizedRot > 180) normalizedRot -= 360;
    if (normalizedRot < -180) normalizedRot += 360;

    // Validate zIndex
    const zIndex = typeof item.zIndex === 'number' && !isNaN(item.zIndex) ? Math.max(1, Math.min(50, item.zIndex)) : 10;

    return {
      ...item,
      x: bounded.x,
      y: bounded.y,
      scale: Number(clampedScale.toFixed(2)),
      rotation: Math.round(normalizedRot),
      zIndex
    };
  });
}
