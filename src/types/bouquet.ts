export type BouquetCategory = 'FLOWERS' | 'FOLIAGE' | 'EXTRAS' | 'RARE BOTANICALS' | 'VASE & WRAP';

export type FlowerColor = 'all' | 'red' | 'pink' | 'white' | 'purple' | 'yellow' | 'blue' | 'amber' | 'green';
export type FlowerMeaning = 'all' | 'love' | 'gratitude' | 'peace' | 'admiration' | 'joy' | 'purity' | 'charm' | 'devotion' | 'remembrance';
export type FlowerSeason = 'all' | 'spring' | 'summer' | 'autumn' | 'winter';
export type FlowerRegion = 'all' | 'japan' | 'france' | 'mediterranean' | 'netherlands' | 'britain' | 'italy';

export type FlowerRole = 'FOCAL' | 'SECONDARY' | 'FILLER' | 'FOLIAGE';

export interface BotanicalItem {
  id: string;
  name: string;
  scientificName: string;
  category: BouquetCategory;
  role: FlowerRole;
  colors: FlowerColor[];
  meanings: FlowerMeaning[];
  seasons: FlowerSeason[];
  regions: FlowerRegion[];
  image: string;
  thumbnail: string;
  defaultScale: number;
  minScale?: number;
  maxScale?: number;
  defaultRotation: number;
  stemType: 'woody' | 'herbaceous' | 'flexible' | 'trailing';
  description: string;
  focalWeight: number; // 1 (filler/extra) to 5 (grand focal blossom)
  naturalHeight: number; // relative height factor
}

// Backward compatibility alias
export type Flower = BotanicalItem;

export interface BouquetInstance {
  instanceId: string;
  botanicalId: string;
  name: string;
  image: string;
  category: BouquetCategory;
  role?: FlowerRole;
  x: number; // percentage from center (e.g. -40% to +40%)
  y: number; // vertical offset from vase neck
  scale: number;
  rotation: number; // in degrees
  zIndex: number;
  flipX?: boolean;
}

// Backward compatibility alias
export type BouquetItem = BouquetInstance;

export interface VaseOption {
  id: string;
  name: string;
  type: 'vase';
  material: string;
  image: string;
  thumbnail: string;
  description: string;
  neckY: number; // Percentage where stems enter vase
  accentColor: string;
}

export interface WrapOption {
  id: string;
  name: string;
  type: 'wrap';
  texture: string;
  image: string;
  thumbnail: string;
  color: string;
  borderColor: string;
}

export interface CompositionPreset {
  id: string;
  name: string;
  description: string;
  stemCountRange: [number, number];
  focalWeights: number[];
  angleSpread: number; // degrees
  vaseId: string;
  wrapId: string;
}
