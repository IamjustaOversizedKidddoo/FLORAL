import React, { useState, useMemo } from 'react';
import { useAtelier } from '../../store/atelierStore';
import { LETTER_TEMPLATES } from '../../data/letterTemplates';
import { VASE_OPTIONS, WRAP_OPTIONS } from '../../data/botanicalCatalog';
import { validateBouquetComposition } from '../../utils/compositionEngine';
import { createSharedGift } from '../../services/giftService';
import { CrossIcon } from './Icons';
import './PreviewModal.css';

export const PreviewModal: React.FC = () => {
  const { 
    isPreviewOpen, 
    setIsPreviewOpen, 
    setIsShareModalOpen,
    currentGiftId,
    setCurrentGiftId,
    setCurrentShareUrl,
    bouquetItems, 
    selectedVaseId,
    selectedWrapId,
    activeTemplateId,
    recipientText,
    bodyText,
    closingText,
    formatting 
  } = useAtelier();

  const [isCreatingGift, setIsCreatingGift] = useState(false);
  const validatedBouquetItems = useMemo(() => validateBouquetComposition(bouquetItems), [bouquetItems]);

  if (!isPreviewOpen) return null;

  const currentTemplate = LETTER_TEMPLATES.find(t => t.id === activeTemplateId) || LETTER_TEMPLATES[0];
  const currentVase = VASE_OPTIONS.find(v => v.id === selectedVaseId) || VASE_OPTIONS[0];
  const currentWrap = WRAP_OPTIONS.find(w => w.id === selectedWrapId) || WRAP_OPTIONS[0];

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

  const handleCreateGift = async () => {
    setIsCreatingGift(true);
    try {
      const result = await createSharedGift({
        bouquet: {
          items: validatedBouquetItems,
          vaseId: selectedVaseId,
          wrapId: selectedWrapId
        },
        letter: {
          templateId: activeTemplateId,
          recipient: recipientText,
          body: bodyText,
          closing: closingText,
          formatting
        },
        giftId: currentGiftId || undefined
      });

      if (result.success) {
        setCurrentGiftId(result.giftId);
        setCurrentShareUrl(result.shareUrl);
        setIsPreviewOpen(false);
        setIsShareModalOpen(true);
      }
    } catch (err) {
      console.error('Failed to create gift:', err);
    } finally {
      setIsCreatingGift(false);
    }
  };

  return (
    <div className="preview-modal-overlay" onClick={() => setIsPreviewOpen(false)}>
      <div className="preview-modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="preview-close-btn" 
          onClick={() => setIsPreviewOpen(false)}
          aria-label="Close Preview"
          id="close-preview-modal-btn"
        >
          <CrossIcon size={14} />
        </button>

        <div className="preview-header">
          <span className="preview-eyebrow">FLORÆ ATELIER DIGITAL GIFT</span>
          <h2 className="preview-title">YOUR COMPLETED CREATION</h2>
          <p className="preview-subtitle">A Language Without Words</p>
        </div>

        <div className="preview-duo-content">
          {/* Left: Dynamic Bouquet Art Scene */}
          <div className="preview-bouquet-scene">
            <div className="preview-scene-backdrop" />

            {/* Render Stems */}
            <div className="preview-stems-container">
              {validatedBouquetItems.map(item => (
                <div
                  key={item.instanceId}
                  className="preview-stem-layer"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    zIndex: item.zIndex,
                    transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale * 0.85}) ${item.flipX ? 'scaleX(-1)' : ''}`
                  }}
                >
                  <div className="preview-stem-wrapper">
                    <img src={item.image} alt={item.name} className="preview-stem-img" />
                  </div>
                </div>
              ))}
            </div>

            {/* Vessel Anchor (Upright Luxury Vase or Physical Florist Wrap) */}
            <div className="preview-vase-anchor" style={{ zIndex: 18 }}>
              {currentWrap.id !== 'wrap-none' ? (
                <img 
                  src={currentWrap.image} 
                  alt={currentWrap.name} 
                  className="preview-vase-img preview-wrap-img" 
                />
              ) : (
                <img 
                  src={currentVase.image} 
                  alt={currentVase.name} 
                  className="preview-vase-img" 
                />
              )}
            </div>

            <div className="preview-badge-layer">
              <span className="preview-item-count">
                {bouquetItems.length} BOTANICAL {bouquetItems.length === 1 ? 'ELEMENT' : 'ELEMENTS'} COMPOSED
              </span>
            </div>
          </div>

          {/* Right: The Crafted Physical Letter */}
          <div 
            className="preview-letter-sheet"
            style={{
              backgroundColor: currentTemplate.bgColor,
              color: currentTemplate.textColor,
              borderColor: currentTemplate.borderColor
            }}
          >
            {currentTemplate.showBrandHeader && (
              <div className="preview-paper-brand">
                <span>A LETTER FOR YOU</span>
              </div>
            )}

            {currentTemplate.showWatermark && (
              <img 
                src="/assets/botanical-sketch.png" 
                alt="" 
                className="preview-etching" 
              />
            )}

            <div 
              className="preview-letter-body"
              style={{
                fontFamily: getFontFamily(),
                textAlign: formatting.align,
                fontWeight: formatting.bold ? 700 : 400,
                fontStyle: formatting.italic ? 'italic' : 'normal',
                textDecoration: formatting.underline ? 'underline' : 'none'
              }}
            >
              <h3 className="preview-recipient">{recipientText || 'Dear Someone,'}</h3>
              <p className="preview-message">{bodyText || 'Write your heart here...'}</p>
              <p className="preview-closing">{closingText || '— Yours always,'}</p>
            </div>
          </div>
        </div>

        <div className="preview-footer-actions">
          <div className="shareable-link-box">
            <span className="link-label">RECIPIENT EXPERIENCE</span>
            <span className="link-note">Instant private link • No recipient account needed</span>
          </div>
          <button 
            className="copy-link-btn"
            onClick={handleCreateGift}
            disabled={isCreatingGift}
            id="create-gift-btn"
          >
            {isCreatingGift ? 'CREATING GIFT...' : 'CREATE GIFT & GET LINK →'}
          </button>
        </div>
      </div>
    </div>
  );
};
