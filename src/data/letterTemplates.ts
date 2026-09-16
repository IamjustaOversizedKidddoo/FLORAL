import { LetterTemplate } from '../types/letter';

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/assets/templates/classic.png',
    bgColor: '#DDD1BD',
    textColor: '#2E2822',
    accentColor: '#8E7350',
    borderColor: 'rgba(142, 115, 80, 0.2)',
    defaultFont: 'Cormorant Garamond',
    textureType: 'deckle',
    showWatermark: false,
    showBrandHeader: false,
    paperLines: false,
    bgImage: '/assets/paper-stationery.png'
  },
  {
    id: 'handwritten',
    name: 'Handwritten',
    thumbnail: '/assets/templates/handwritten.png',
    bgColor: '#D8CAB3',
    textColor: '#241E18',
    accentColor: '#7A6242',
    borderColor: 'rgba(122, 98, 66, 0.25)',
    defaultFont: 'Pinyon Script',
    textureType: 'lined',
    showWatermark: false,
    showBrandHeader: false,
    paperLines: true
  },
  {
    id: 'minimal',
    name: 'Minimal',
    thumbnail: '/assets/templates/minimal.png',
    bgColor: '#EBE4D5',
    textColor: '#201D1A',
    accentColor: '#968774',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    defaultFont: 'Montserrat',
    textureType: 'clean',
    showWatermark: false,
    showBrandHeader: false,
    paperLines: false
  },
  {
    id: 'botanical',
    name: 'Botanical',
    thumbnail: '/assets/templates/botanical.png',
    bgColor: '#D5C4A6',
    textColor: '#2D261C',
    accentColor: '#5E4E35',
    borderColor: 'rgba(94, 78, 53, 0.3)',
    defaultFont: 'Cormorant Garamond',
    textureType: 'pressed',
    showWatermark: true,
    showBrandHeader: true,
    paperLines: false
  },
  {
    id: 'dark',
    name: 'Dark',
    thumbnail: '/assets/templates/dark.png',
    bgColor: '#161413',
    textColor: '#EDE8E1',
    accentColor: '#D7C7B0',
    borderColor: 'rgba(215, 199, 176, 0.25)',
    defaultFont: 'Cinzel',
    textureType: 'charcoal',
    showWatermark: true,
    showBrandHeader: true,
    paperLines: false
  }
];
