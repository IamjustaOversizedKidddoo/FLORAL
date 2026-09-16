import React, { useState } from 'react';
import { BouquetCanvas } from '../bouquet/BouquetCanvas';
import './HeroPanel.css';

export const HeroPanel: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  return (
    <aside 
      className="hero-panel" 
      aria-label="FLORÆ Atelier Visual Scene"
      onMouseMove={handleMouseMove}
    >
      {/* Pristine high-fidelity studio background texture */}
      <div 
        className="hero-art-layer"
        style={{
          backgroundImage: 'url(/assets/hero/hero-backdrop.png)',
          transform: `scale(1.005) translate(${(mousePos.x - 0.5) * -4}px, ${(mousePos.y - 0.5) * -4}px)`
        }}
      />

      {/* Atmospheric dynamic lighting overlay */}
      <div 
        className="hero-ambient-light"
        style={{
          background: `radial-gradient(circle 380px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(215, 199, 176, 0.04) 0%, rgba(7, 6, 5, 0) 70%)`
        }}
      />

      {/* Editorial Branding Overlay matching reference */}
      <div className="hero-editorial-overlay">
        <div className="hero-brand-block">
          <span className="hero-logo">FLORÆ</span>
          <div className="hero-subtag">
            <span>A LANGUAGE</span>
            <span>WITHOUT WORDS.</span>
          </div>
        </div>

        <div className="hero-japanese-block">
          <div className="jp-vertical-text">
            <span>花</span>
            <span>を</span>
            <span>作</span>
            <span>る</span>
          </div>
          <div className="jp-divider-line" />
          <div className="jp-meaningful-tag">
            <span>CREATE</span>
            <span>SOMETHING</span>
            <span>MEANINGFUL.</span>
          </div>
        </div>

        <div className="hero-stories-tag">
          <span>SAME FLOWERS,</span>
          <span>DIFFERENT STORIES.</span>
        </div>

        <div className="hero-bottom-meta">
          <div className="bottom-hairline" />
          <span className="est-year">EST. 2025</span>
        </div>
      </div>

      {/* Interactive Bouquet Composition Canvas */}
      <BouquetCanvas />
    </aside>
  );
};
