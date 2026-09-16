import React from 'react';
import { useAtelier } from '../../store/atelierStore';
import { VASE_OPTIONS, WRAP_OPTIONS } from '../../data/botanicalCatalog';
import './VaseWrapSelector.css';

export const VaseWrapSelector: React.FC = () => {
  const {
    selectedVaseId,
    setSelectedVaseId,
    selectedWrapId,
    setSelectedWrapId
  } = useAtelier();

  return (
    <div className="vase-wrap-selector-container">
      {/* Vases Section */}
      <div className="selector-group">
        <div className="selector-group-header">
          <h4 className="group-title">SELECT VESSEL</h4>
          <span className="group-hint">Glazed ceramics & handblown glass</span>
        </div>

        <div className="vases-grid">
          {VASE_OPTIONS.map(vase => {
            const isSelected = selectedVaseId === vase.id;

            return (
              <div
                key={vase.id}
                className={`vase-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedVaseId(vase.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${vase.name}`}
              >
                <div className="vase-card-media">
                  <img src={vase.image} alt={vase.name} className="vase-thumb-img" />
                </div>
                <div className="vase-card-info">
                  <span className="vase-name">{vase.name}</span>
                  <span className="vase-material">{vase.material}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wraps Section */}
      <div className="selector-group">
        <div className="selector-group-header">
          <h4 className="group-title">SELECT WRAP & SASH</h4>
          <span className="group-hint">Artisanal papers & natural raw silks</span>
        </div>

        <div className="wraps-list">
          {WRAP_OPTIONS.map(wrap => {
            const isSelected = selectedWrapId === wrap.id;

            return (
              <div
                key={wrap.id}
                className={`wrap-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedWrapId(wrap.id)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${wrap.name}`}
              >
                {wrap.image ? (
                  <div className="wrap-card-media">
                    <img src={wrap.image} alt={wrap.name} className="wrap-thumb-img" />
                  </div>
                ) : (
                  <div 
                    className="wrap-swatch-indicator" 
                    style={{ 
                      backgroundColor: wrap.color, 
                      border: `1px solid ${wrap.borderColor}` 
                    }} 
                  />
                )}
                <div className="wrap-details">
                  <span className="wrap-name">{wrap.name}</span>
                  <span className="wrap-desc">{wrap.texture}</span>
                </div>
                {isSelected && <span className="wrap-check">✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
