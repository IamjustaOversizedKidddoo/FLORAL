import React, { useState } from 'react';
import { useAtelier } from '../../store/atelierStore';
import { LetterFont, LetterTone } from '../../types/letter';
import { ChevronDownIcon, ListIcon, ArrowRightIcon } from '../ui/Icons';
import './LetterToolbar.css';

const FONTS: { label: string; value: LetterFont }[] = [
  { label: 'Cormorant (Elegant Serif)', value: 'Cormorant Garamond' },
  { label: 'Cinzel (Modern Serif)', value: 'Cinzel' },
  { label: 'Pinyon (Handwritten)', value: 'Pinyon Script' },
  { label: 'Courier (Classic Typewriter)', value: 'Courier Prime' },
  { label: 'Montserrat (Minimalist Sans)', value: 'Montserrat' }
];

const TONES: LetterTone[] = ['Poetic', 'Sincere', 'Romantic', 'Gratitude', 'Minimalist'];

export const LetterToolbar: React.FC = () => {
  const { 
    formatting, 
    updateFormatting, 
    setIsPreviewOpen,
    setActiveNav 
  } = useAtelier();

  const [openDropdown, setOpenDropdown] = useState<'font' | 'tone' | null>(null);

  const toggleDropdown = (type: 'font' | 'tone') => {
    setOpenDropdown(prev => (prev === type ? null : type));
  };

  const cycleAlignment = () => {
    const next = formatting.align === 'left' ? 'center' : formatting.align === 'center' ? 'right' : 'left';
    updateFormatting({ align: next });
  };

  const handlePreviewClick = () => {
    setActiveNav('PREVIEW');
    setIsPreviewOpen(true);
  };

  return (
    <div className="letter-toolbar-container">
      {/* Formatting tools bar */}
      <div className="toolbar-controls-row">
        {/* Font Dropdown */}
        <div className="toolbar-dropdown-wrapper">
          <button 
            className="toolbar-pill-btn" 
            onClick={() => toggleDropdown('font')}
            id="letter-font-btn"
            title={`Font: ${formatting.font}`}
          >
            <span>Font</span>
            <ChevronDownIcon size={9} />
          </button>
          {openDropdown === 'font' && (
            <div className="toolbar-dropdown-menu">
              {FONTS.map(f => (
                <button
                  key={f.value}
                  className={`toolbar-dropdown-item ${formatting.font === f.value ? 'selected' : ''}`}
                  onClick={() => {
                    updateFormatting({ font: f.value });
                    setOpenDropdown(null);
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tone Dropdown */}
        <div className="toolbar-dropdown-wrapper">
          <button 
            className="toolbar-pill-btn" 
            onClick={() => toggleDropdown('tone')}
            id="letter-tone-btn"
            title={`Tone: ${formatting.tone}`}
          >
            <span>Tone</span>
            <ChevronDownIcon size={9} />
          </button>
          {openDropdown === 'tone' && (
            <div className="toolbar-dropdown-menu">
              {TONES.map(t => (
                <button
                  key={t}
                  className={`toolbar-dropdown-item ${formatting.tone === t ? 'selected' : ''}`}
                  onClick={() => {
                    updateFormatting({ tone: t });
                    setOpenDropdown(null);
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bold Toggle */}
        <button
          className={`format-toggle-btn ${formatting.bold ? 'active' : ''}`}
          onClick={() => updateFormatting({ bold: !formatting.bold })}
          aria-label="Toggle Bold"
          title="Toggle Bold"
          id="format-bold-btn"
        >
          <span style={{ fontWeight: 700 }}>B</span>
        </button>

        {/* Italic Toggle */}
        <button
          className={`format-toggle-btn ${formatting.italic ? 'active' : ''}`}
          onClick={() => updateFormatting({ italic: !formatting.italic })}
          aria-label="Toggle Italic"
          title="Toggle Italic"
          id="format-italic-btn"
        >
          <span style={{ fontStyle: 'italic', fontFamily: 'serif' }}>I</span>
        </button>

        {/* Underline Toggle */}
        <button
          className={`format-toggle-btn ${formatting.underline ? 'active' : ''}`}
          onClick={() => updateFormatting({ underline: !formatting.underline })}
          aria-label="Toggle Underline"
          title="Toggle Underline"
          id="format-underline-btn"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>

        {/* Alignment Toggle */}
        <button
          className="format-toggle-btn"
          onClick={cycleAlignment}
          aria-label={`Current alignment: ${formatting.align}. Click to cycle.`}
          title={`Text Align: ${formatting.align.toUpperCase()}`}
          id="format-align-btn"
        >
          <ListIcon size={12} />
        </button>
      </div>

      {/* Primary Action Button: PREVIEW YOUR CREATION → */}
      <button 
        className="preview-creation-btn"
        onClick={handlePreviewClick}
        id="preview-creation-action-btn"
      >
        <span>PREVIEW YOUR CREATION</span>
        <ArrowRightIcon size={12} />
      </button>

      {/* Bottom Editorial Tagline */}
      <div className="letter-footer-editorial">
        A BOUQUET. A LETTER. A MEMORY.
      </div>
    </div>
  );
};
