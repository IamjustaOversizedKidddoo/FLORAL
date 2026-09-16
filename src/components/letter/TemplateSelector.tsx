import React from 'react';
import { useAtelier } from '../../store/atelierStore';
import { LETTER_TEMPLATES } from '../../data/letterTemplates';
import { BOTANICAL_LETTER_STARTERS } from '../../data/letterStarters';
import { LetterMode } from '../../types/letter';
import './TemplateSelector.css';

const MODES: LetterMode[] = ['TEMPLATES', 'BLANK', 'AI ASSIST'];

export const TemplateSelector: React.FC = () => {
  const { 
    letterMode, 
    setLetterMode, 
    activeTemplateId, 
    setActiveTemplateId,
    applyStarter,
    bouquetItems 
  } = useAtelier();

  return (
    <div className="template-selector-container">
      {/* Mode navigation */}
      <div className="letter-mode-tabs">
        {MODES.map(mode => (
          <button
            key={mode}
            className={`mode-tab-btn ${letterMode === mode ? 'active' : ''}`}
            onClick={() => setLetterMode(mode)}
            id={`mode-${mode.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Mode 1: TEMPLATES (5 mini paper swatches matching reference) */}
      {letterMode === 'TEMPLATES' && (
        <div className="template-swatches-grid">
          {LETTER_TEMPLATES.map(tmpl => {
            const isSelected = activeTemplateId === tmpl.id;
            return (
              <div
                key={tmpl.id}
                className={`template-swatch-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setActiveTemplateId(tmpl.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${tmpl.name} template`}
                id={`template-swatch-${tmpl.id}`}
              >
                <div className="swatch-thumbnail-box">
                  <img 
                    src={tmpl.thumbnail} 
                    alt={`${tmpl.name} template`} 
                    className="swatch-img" 
                  />
                </div>
                <span className="swatch-label">{tmpl.name}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Mode 2: BLANK (Pure serene writing surface) */}
      {letterMode === 'BLANK' && (
        <div className="blank-mode-banner">
          <span className="blank-banner-title">CLEAN STATIONERY SURFACE</span>
          <p className="blank-banner-desc">Decorative etchings muted for uninterrupted personal expression.</p>
        </div>
      )}

      {/* Mode 3: AI ASSIST (Luxury editorial prompt starters based on bouquet flowers) */}
      {letterMode === 'AI ASSIST' && (
        <div className="ai-assist-container">
          <div className="ai-assist-header">
            <span className="ai-header-tag">BOTANICAL INSPIRATIONS</span>
            <span className="ai-header-hint">
              {bouquetItems.length > 0 ? `Paired with your ${bouquetItems[0]?.name || 'bouquet'}` : 'Curated starters'}
            </span>
          </div>
          <div className="ai-starters-scroll">
            {BOTANICAL_LETTER_STARTERS.map(starter => (
              <div 
                key={starter.id} 
                className="ai-starter-chip"
                onClick={() => applyStarter(starter)}
                role="button"
                tabIndex={0}
                title="Click to insert this letter starter"
              >
                <div className="starter-chip-top">
                  <span className="starter-title">{starter.title}</span>
                  <span className="starter-tone">{starter.tone}</span>
                </div>
                <p className="starter-snippet">“{starter.bodySnippet.slice(0, 68)}...”</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
