export type TemplateId = 'classic' | 'handwritten' | 'minimal' | 'botanical' | 'dark';
export type LetterMode = 'TEMPLATES' | 'BLANK' | 'AI ASSIST';
export type LetterFont = 'Cormorant Garamond' | 'Pinyon Script' | 'Cinzel' | 'Montserrat' | 'Courier Prime';
export type LetterTone = 'Poetic' | 'Sincere' | 'Romantic' | 'Gratitude' | 'Minimalist';
export type TextAlign = 'left' | 'center' | 'right';

export interface LetterTemplate {
  id: TemplateId;
  name: string;
  thumbnail: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  defaultFont: LetterFont;
  textureType: 'deckle' | 'lined' | 'clean' | 'pressed' | 'charcoal';
  showWatermark: boolean;
  showBrandHeader: boolean;
  paperLines: boolean;
  bgImage?: string;
}

export interface LetterFormatting {
  font: LetterFont;
  tone: LetterTone;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  align: TextAlign;
}

export interface LetterState {
  mode: LetterMode;
  templateId: TemplateId;
  recipient: string;
  body: string;
  closing: string;
  formatting: LetterFormatting;
  giftId?: string;
}

export interface AIStarterPrompt {
  id: string;
  title: string;
  tone: LetterTone;
  botanicalPairing?: string;
  salutation: string;
  bodySnippet: string;
  closing: string;
}
