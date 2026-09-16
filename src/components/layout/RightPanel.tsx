import React from 'react';
import { TemplateSelector } from '../letter/TemplateSelector';
import { LetterStationery } from '../letter/LetterStationery';
import { LetterToolbar } from '../letter/LetterToolbar';
import './RightPanel.css';

export const RightPanel: React.FC = () => {
  return (
    <section className="right-panel" aria-label="Write Your Letter">
      {/* Header section */}
      <div className="right-panel-header">
        <span className="step-label">02 / 02</span>
        <div className="title-row">
          <h2 className="section-title">WRITE YOUR LETTER</h2>
          <div className="title-rule" />
        </div>
        <p className="section-subtitle">Turn your feelings into words.</p>
      </div>

      {/* Template navigation and swatches */}
      <TemplateSelector />

      {/* Tactile luxury letter paper */}
      <LetterStationery />

      {/* Formatting tools & preview action */}
      <LetterToolbar />
    </section>
  );
};
