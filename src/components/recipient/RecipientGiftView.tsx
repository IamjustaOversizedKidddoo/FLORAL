import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSharedGift, SharedGiftData } from '../../services/giftService';
import { BOTANICAL_CATALOG, VASE_OPTIONS, WRAP_OPTIONS } from '../../data/botanicalCatalog';
import { LETTER_TEMPLATES } from '../../data/letterTemplates';
import { BotanicalItem } from '../../types/bouquet';
import { validateBouquetComposition } from '../../utils/compositionEngine';
import './RecipientGiftView.css';

export const RecipientGiftView: React.FC = () => {
  const { giftId } = useParams<{ giftId: string }>();
  
  const [gift, setGift] = useState<SharedGiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Stages: 0: loading, 1: teaser, 2: blooming & full presentation
  const [hasOpened, setHasOpened] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get('opened') === 'true';
    } catch {
      return false;
    }
  });
  const [bloomKey, setBloomKey] = useState(0);
  
  // Interactive flower selection for symbolic meanings
  const [selectedFlower, setSelectedFlower] = useState<{
    instanceId: string;
    botanical: BotanicalItem | null;
    name: string;
  } | null>(null);

  // Active view mode for mobile / smaller screens
  const [activeTab, setActiveTab] = useState<'ALL' | 'BOUQUET' | 'LETTER'>('ALL');

  // Validated bouquet items guaranteed to obey bouquet silhouette bounds
  const validatedBouquetItems = useMemo(() => {
    return gift?.bouquet?.items ? validateBouquetComposition(gift.bouquet.items) : [];
  }, [gift?.bouquet?.items]);

  useEffect(() => {
    let isMounted = true;
    async function loadGift() {
      if (!giftId) {
        setError('No gift identifier provided.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchSharedGift(giftId);
        if (!isMounted) return;
        if (data) {
          setGift(data);
          setError(null);
        } else {
          setError('We could not find this botanical creation. It may have expired or the link is incorrect.');
        }
      } catch (err) {
        if (!isMounted) return;
        setError('Unable to load gift. Please check your connection and try again.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadGift();
    return () => {
      isMounted = false;
    };
  }, [giftId]);

  // Trigger bloom animation
  const handleOpenGift = () => {
    setHasOpened(true);
    setBloomKey(prev => prev + 1);
  };

  const handleReplayBloom = () => {
    setBloomKey(prev => prev + 1);
    setSelectedFlower(null);
  };

  if (loading) {
    return (
      <div className="recipient-loading-screen">
        <div className="recipient-loader-content">
          <div className="recipient-loader-monogram">FLORÆ</div>
          <div className="recipient-loader-spinner" />
          <p className="recipient-loader-text">UNFOLDING A QUIET BOTANICAL GIFT...</p>
        </div>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="recipient-error-screen">
        <div className="recipient-error-content">
          <span className="recipient-error-eyebrow">FLORÆ ATELIER</span>
          <h1 className="recipient-error-title">THE GIFT COULD NOT BE FOUND</h1>
          <p className="recipient-error-desc">
            {error || 'This gift link may be private, expired, or mistyped.'}
          </p>
          <div className="recipient-error-action">
            <Link to="/" className="recipient-home-btn" id="error-return-home-btn">
              VISIT THE FLORÆ ATELIER →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { bouquet, letter } = gift;
  const currentTemplate = LETTER_TEMPLATES.find(t => t.id === letter.templateId) || LETTER_TEMPLATES[0];
  const currentVase = VASE_OPTIONS.find(v => v.id === bouquet.vaseId) || VASE_OPTIONS[0];
  const currentWrap = WRAP_OPTIONS.find(w => w.id === bouquet.wrapId) || WRAP_OPTIONS[0];

  const getFontFamily = (fontName?: string) => {
    switch (fontName) {
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

  // STAGE 1: Teaser Envelope / Card
  if (!hasOpened) {
    return (
      <div className="recipient-teaser-screen">
        <div className="recipient-teaser-ambient-bg" />
        <div className="recipient-teaser-card">
          <div className="teaser-monogram-seal">
            <span>FLORÆ</span>
          </div>

          <div className="teaser-header">
            <span className="teaser-eyebrow">A PRIVATE DIGITAL CREATION</span>
            <h1 className="teaser-title">SOMEONE MADE SOMETHING FOR YOU</h1>
            <p className="teaser-subtitle">
              A bespoke bouquet and personal letter, composed in the language of flowers.
            </p>
          </div>

          <div className="teaser-envelope-graphic">
            <div className="teaser-botanical-silhouette">
              <img src="/assets/botanical-sketch.png" alt="" className="teaser-sketch-img" />
            </div>
          </div>

          <button 
            className="recipient-open-gift-btn"
            onClick={handleOpenGift}
            id="recipient-open-gift-btn"
          >
            <span>OPEN YOUR GIFT</span>
            <span className="open-arrow">→</span>
          </button>

          <span className="teaser-tagline">No account required • Unfolds privately</span>
        </div>
      </div>
    );
  }

  // STAGE 2: Cinematic Bouquet & Letter Exhibition
  return (
    <div className="recipient-exhibition-root" onClick={() => setSelectedFlower(null)}>
      {/* Subtle floating ambient light */}
      <div className="recipient-ambient-glow" />

      {/* Recipient Top Minimal Header */}
      <header className="recipient-header" onClick={(e) => e.stopPropagation()}>
        <div className="recipient-header-left">
          <span className="recipient-brand">FLORÆ</span>
          <span className="recipient-header-divider">•</span>
          <span className="recipient-header-title">A Language Without Words</span>
        </div>

        {/* View Switcher on mobile/tablet */}
        <div className="recipient-tab-switch">
          <button 
            className={`recipient-tab-btn ${activeTab === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveTab('ALL')}
            id="tab-all-btn"
          >
            EXPERIENCE ALL
          </button>
          <button 
            className={`recipient-tab-btn ${activeTab === 'BOUQUET' ? 'active' : ''}`}
            onClick={() => setActiveTab('BOUQUET')}
            id="tab-bouquet-btn"
          >
            BOUQUET
          </button>
          <button 
            className={`recipient-tab-btn ${activeTab === 'LETTER' ? 'active' : ''}`}
            onClick={() => setActiveTab('LETTER')}
            id="tab-letter-btn"
          >
            LETTER
          </button>
        </div>

        <div className="recipient-header-actions">
          <button 
            className="replay-bloom-btn" 
            onClick={handleReplayBloom} 
            title="Replay Bouquet Bloom"
            id="replay-bloom-btn"
          >
            REPLAY BLOOM ↺
          </button>
        </div>
      </header>

      {/* Exhibition Showcase Container */}
      <main className="recipient-showcase-container">
        {/* LEFT COLUMN: Cinematic Living Bouquet */}
        <section 
          className={`recipient-bouquet-column ${activeTab === 'LETTER' ? 'hide-mobile' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="recipient-bouquet-card" key={`bloom-${bloomKey}`}>
            <div className="recipient-bouquet-backdrop" />

            {/* Tap instruction hint */}
            <div className="recipient-interaction-hint">
              <span className="hint-icon">✦</span>
              <span>Tap any flower to discover its hidden botanical meaning</span>
            </div>

            {/* Bouquet Stems Container with blooming stagger */}
            <div className="recipient-stems-container">
              {validatedBouquetItems.map((item, index) => {
                const catalogMeta = BOTANICAL_CATALOG.find(b => b.id === item.botanicalId);
                const isSelected = selectedFlower?.instanceId === item.instanceId;
                const delayMs = index * 80;

                return (
                  <div
                    key={item.instanceId}
                    className={`recipient-stem-layer ${isSelected ? 'is-selected' : ''}`}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      zIndex: isSelected ? 50 : item.zIndex,
                      transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale * 0.92}) ${item.flipX ? 'scaleX(-1)' : ''}`,
                      animationDelay: `${delayMs}ms`
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFlower({
                        instanceId: item.instanceId,
                        botanical: catalogMeta || null,
                        name: item.name
                      });
                    }}
                    title={`Click to read meaning of ${item.name}`}
                  >
                    <div className="recipient-stem-wrapper">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="recipient-stem-img" 
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vessel Anchor (Upright Luxury Vase or Physical Florist Wrap) */}
            <div className="recipient-vase-anchor" style={{ zIndex: 18 }}>
              {currentWrap.id !== 'wrap-none' ? (
                <img 
                  src={currentWrap.image} 
                  alt={currentWrap.name} 
                  className="recipient-vase-img recipient-wrap-img" 
                />
              ) : (
                <img 
                  src={currentVase.image} 
                  alt={currentVase.name} 
                  className="recipient-vase-img" 
                />
              )}
            </div>

            {/* Details badge bottom */}
            <div className="recipient-bouquet-meta-footer">
              <span className="bouquet-element-tally">
                {validatedBouquetItems.length} HAND-ARRANGED BOTANICALS
              </span>
              <span className="bouquet-vase-label">
                {currentWrap.id !== 'wrap-none' ? `WRAPPED IN ${currentWrap.name}` : `IN ${currentVase.name}`}
              </span>
            </div>

            {/* Flower Meaning Popover / Card */}
            {selectedFlower && (
              <div 
                className="flower-meaning-card animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flower-meaning-header">
                  <div className="flower-meaning-titles">
                    <span className="flower-common-name">{selectedFlower.name}</span>
                    {selectedFlower.botanical?.scientificName && (
                      <span className="flower-scientific-name">
                        ({selectedFlower.botanical.scientificName})
                      </span>
                    )}
                  </div>
                  <button 
                    className="close-meaning-btn"
                    onClick={() => setSelectedFlower(null)}
                    aria-label="Close details"
                  >
                    ✕
                  </button>
                </div>

                <p className="flower-description">
                  {selectedFlower.botanical?.description || 'A cherished botanical selection chosen especially for you.'}
                </p>

                {selectedFlower.botanical?.meanings && selectedFlower.botanical.meanings.length > 0 && (
                  <div className="flower-sentiments-list">
                    <span className="sentiment-label">FLORAL SENTIMENT:</span>
                    {selectedFlower.botanical.meanings.map(m => (
                      <span key={m} className="sentiment-tag">
                        {m.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Tactile Unfurled Letter */}
        <section 
          className={`recipient-letter-column ${activeTab === 'BOUQUET' ? 'hide-mobile' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="recipient-letter-sheet animate-unfurl"
            style={{
              backgroundColor: currentTemplate.bgColor,
              color: currentTemplate.textColor,
              borderColor: currentTemplate.borderColor
            }}
          >
            {/* Header / Brand on stationery */}
            {currentTemplate.showBrandHeader && (
              <div className="recipient-paper-brand">
                <span>FLORÆ ATELIER • PERSONAL CORRESPONDENCE</span>
              </div>
            )}

            {/* Watermark etching if enabled */}
            {currentTemplate.showWatermark && (
              <img 
                src="/assets/botanical-sketch.png" 
                alt="" 
                className="recipient-paper-watermark" 
              />
            )}

            {/* Letter Content */}
            <div 
              className="recipient-letter-body"
              style={{
                fontFamily: getFontFamily(letter.formatting?.font),
                textAlign: letter.formatting?.align || 'left',
                fontWeight: letter.formatting?.bold ? 700 : 400,
                fontStyle: letter.formatting?.italic ? 'italic' : 'normal',
                textDecoration: letter.formatting?.underline ? 'underline' : 'none'
              }}
            >
              <h2 className="recipient-salutation">
                {letter.recipient || 'Dear Someone,'}
              </h2>
              
              <div className="recipient-body-text">
                {letter.body ? (
                  letter.body.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>Thinking of you with this bouquet.</p>
                )}
              </div>

              <p className="recipient-valediction">
                {letter.closing || '— Yours always,'}
              </p>
            </div>

            {/* Letter tactile footer with wax seal */}
            <div className="recipient-paper-seal-strip">
              <div className="tactile-wax-seal">
                <span>FLORÆ</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Recipient Experience Footer CTA */}
      <footer className="recipient-experience-footer" onClick={(e) => e.stopPropagation()}>
        <div className="footer-left-info">
          <span className="footer-brand">FLORÆ</span>
          <span className="footer-desc">Created with care in the digital flower atelier</span>
        </div>

        <div className="footer-right-action">
          <Link to="/" className="recipient-create-own-btn" id="recipient-create-own-btn">
            CREATE YOUR OWN DIGITAL GIFT →
          </Link>
        </div>
      </footer>
    </div>
  );
};
