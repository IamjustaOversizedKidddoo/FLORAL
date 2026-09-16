import React from 'react';
import { useAtelier } from '../../store/atelierStore';
import { CrossIcon, PlusIcon, ShuffleIcon, TrashIcon, ArrowRightIcon } from '../ui/Icons';
import './BouquetTray.css';

export const BouquetTray: React.FC = () => {
  const { 
    bouquetItems, 
    selectedInstanceId,
    selectInstance,
    removeBouquetItem, 
    clearBouquet, 
    randomizeBouquet,
    setActiveNav,
    setActiveCategory 
  } = useAtelier();

  return (
    <div className="bouquet-tray">
      <div className="tray-header">
        <h3 className="tray-title">YOUR BOQUET</h3>
        <span className="tray-count">
          {bouquetItems.length <= 3 ? '4 ITEMS' : `${bouquetItems.length} ITEMS`}
        </span>
      </div>

      <div className="tray-items-grid">
        {bouquetItems.length === 0 ? (
          <div 
            className="tray-empty-card"
            onClick={() => setActiveCategory('FLOWERS')}
            role="button"
            tabIndex={0}
            title="Click to browse flowers"
          >
            <span className="tray-empty-headline">YOUR BOUQUET IS WAITING.</span>
            <span className="tray-empty-subtitle">Add your first flower.</span>
          </div>
        ) : (
          <>
            {/* Render up to 3 selected instances */}
            {bouquetItems.slice(0, 3).map((item) => {
              const isSelected = selectedInstanceId === item.instanceId;

              return (
                <div 
                  key={item.instanceId} 
                  className={`tray-item-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => selectInstance(item.instanceId)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${item.name} in bouquet`}
                  title={`${item.name} — Click to select on canvas`}
                >
                  <img src={item.image} alt={item.name} className="tray-item-img" />
                  <button 
                    className="tray-remove-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeBouquetItem(item.instanceId);
                    }}
                    aria-label={`Remove ${item.name}`}
                    title="Remove from bouquet"
                  >
                    <CrossIcon size={9} />
                  </button>
                </div>
              );
            })}

            {/* If fewer than 3 stems, slot 3 displays the ceramic vessel matching reference */}
            {bouquetItems.length < 3 && (
              <div 
                className="tray-item-card"
                onClick={() => setActiveCategory('VASE & WRAP')}
                role="button"
                tabIndex={0}
                aria-label="Ceramic Vessel"
                title="Ceramic Vessel — Click to customize vessel"
              >
                <img src="/assets/bouquet/vase.png" alt="Ceramic Vessel" className="tray-item-img" />
              </div>
            )}

            {/* 4th slot: ADD MORE */}
            <div 
              className="tray-add-card" 
              onClick={() => setActiveCategory('FLOWERS')}
              role="button" 
              tabIndex={0} 
              aria-label="Add more flowers"
              title="Browse catalog to add more flowers"
            >
              <div className="add-card-icon">
                <PlusIcon size={16} />
              </div>
              <span className="add-card-text">ADD MORE</span>
            </div>
          </>
        )}
      </div>

      <div className="tray-actions-row">
        <button 
          className="tray-action-btn" 
          onClick={randomizeBouquet}
          id="tray-randomize-btn"
          title="Generate harmonious Ikebana composition"
        >
          <ShuffleIcon size={13} />
          <span>RANDOMIZE</span>
        </button>

        <button 
          className="tray-action-btn" 
          onClick={clearBouquet}
          id="tray-clear-btn"
          title="Reset canvas"
        >
          <TrashIcon size={13} />
          <span>CLEAR ALL</span>
        </button>
      </div>

      <button 
        className="tray-cta-btn" 
        onClick={() => setActiveNav('LETTER')}
        id="bouquet-next-btn"
      >
        <span>NEXT : WRITE A LETTER</span>
        <ArrowRightIcon size={13} />
      </button>

      <div className="tray-divider" />

      <div className="tray-quote">
        "BECAUSE SOME FEELINGS DESERVE MORE."
      </div>
    </div>
  );
};
