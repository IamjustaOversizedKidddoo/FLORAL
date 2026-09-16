import { BOTANICAL_CATALOG, VASE_OPTIONS } from './botanicalCatalog';

export const FLOWERS_DATA = BOTANICAL_CATALOG.filter(b => b.category === 'FLOWERS');
export const FOLIAGE_DATA = BOTANICAL_CATALOG.filter(b => b.category === 'FOLIAGE');
export const EXTRAS_DATA = BOTANICAL_CATALOG.filter(b => b.category === 'EXTRAS');
export { VASE_OPTIONS };
