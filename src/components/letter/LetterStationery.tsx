import React from 'react';
import { useAtelier } from '../../store/atelierStore';
import { LETTER_TEMPLATES } from '../../data/letterTemplates';
import './LetterStationery.css';

export const LetterStationery: React.FC = () => {
  const {
    letterMode,
    activeTemplateId,
    recipientText,
    setRecipientText,
    bodyText,
    setBodyText,
    closingText,
    setClosingText,
    formatting
  } = useAtelier();

  const currentTemplate = LETTER_TEMPLATES.find(t => t.id === activeTemplateId) || LETTER_TEMPLATES[0];
  const isDark = activeTemplateId === 'dark';
  const isBlank = letterMode === 'BLANK';

  // Determine font family variable
  const getFontFamily = () => {
    switch (formatting.font) {
      case 'Pinyon Script':
        return 'var(--font-script)';
      case 'Cinzel':
        return 'var(--font-cinzel)';
      case 'Montserrat':
        return 'var(--font-sans)';
      case 'Courier Prime':
        return 'var(--font-typewriter)';
      case 'Cormorant Garamond':
      default:
        return 'var(--font-serif)';
    }
  };

  return (
    <div className={`letter-stationery-wrapper ${isDark ? 'dark-theme' : ''} template-${currentTemplate.id}`}>
      <div 
        className={`letter-paper-sheet ${currentTemplate.paperLines && !isBlank ? 'has-lines' : ''}`}
        style={{
          backgroundColor: currentTemplate.bgColor,
          backgroundImage: currentTemplate.bgImage && !isBlank ? `url(${currentTemplate.bgImage})` : undefined,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          color: currentTemplate.textColor,
          borderColor: currentTemplate.borderColor
        }}
      >
        {/* Tactile paper grain texture (for non-image templates) */}
        {!currentTemplate.bgImage && <div className="paper-grain-overlay" />}

        {/* Top-Right Embossed Title (hidden in BLANK mode or when paper has native texture) */}
        {currentTemplate.showBrandHeader && !isBlank && !currentTemplate.bgImage && (
          <div className="paper-header-brand">
            <span className="brand-line-1">A LETTER</span>
            <span className="brand-line-2">FOR YOU</span>
            <div className="brand-underline" style={{ backgroundColor: currentTemplate.accentColor }} />
          </div>
        )}

        {/* Vintage Botanical Etching in Bottom Right (for synthesized templates without background image) */}
        {currentTemplate.showWatermark && !isBlank && !currentTemplate.bgImage && (
          <div className="paper-botanical-art">
            <img 
              src="/assets/botanical-sketch.png" 
              alt="" 
              className="botanical-etching-img"
              style={{ opacity: isDark ? 0.35 : 0.72 }}
              draggable={false}
            />
          </div>
        )}

        {/* Physical Stationery Editor Surface */}
        <div 
          className="letter-content-container"
          style={{
            fontFamily: getFontFamily(),
            textAlign: formatting.align,
            fontWeight: formatting.bold ? 700 : 400,
            fontStyle: formatting.italic ? 'italic' : 'normal',
            textDecoration: formatting.underline ? 'underline' : 'none'
          }}
        >
          {/* Recipient / Opening line */}
          <div className="recipient-row">
            <input
              type="text"
              value={recipientText}
              onChange={(e) => setRecipientText(e.target.value)}
              className="recipient-input"
              style={{ 
                color: currentTemplate.textColor,
                textAlign: formatting.align
              }}
              placeholder={currentTemplate.bgImage && !isBlank ? '' : 'Dear ...,'}
              aria-label="Letter Recipient"
              id="letter-recipient-input"
            />
          </div>

          {/* Letter Body Area */}
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="body-textarea"
            style={{ 
              color: currentTemplate.textColor,
              textAlign: formatting.align
            }}
            placeholder="YOUR LETTER IS WAITING. Write something meaningful..."
            rows={7}
            aria-label="Letter Body Text"
            id="letter-body-textarea"
          />

          {/* Valediction / Closing Signature line */}
          <div className="closing-row" style={{ justifyContent: formatting.align === 'center' ? 'center' : formatting.align === 'left' ? 'flex-start' : 'flex-end' }}>
            <input
              type="text"
              value={closingText}
              onChange={(e) => setClosingText(e.target.value)}
              className="closing-input"
              style={{ 
                color: currentTemplate.textColor,
                textAlign: formatting.align
              }}
              placeholder={currentTemplate.bgImage && !isBlank ? '' : '— Yours always,'}
              aria-label="Letter Closing Signature"
              id="letter-closing-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
