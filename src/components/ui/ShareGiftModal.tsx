import React, { useState } from 'react';
import { CrossIcon } from './Icons';
import './ShareGiftModal.css';

interface ShareGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftId: string;
  shareUrl: string;
  onEditGift: () => void;
}

export const ShareGiftModal: React.FC<ShareGiftModalProps> = ({
  isOpen,
  onClose,
  giftId,
  shareUrl,
  onEditGift
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      const input = document.getElementById('share-link-copy-field') as HTMLInputElement;
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    }
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Someone made something for you.',
          text: 'A bouquet and a personal letter, created especially for you.',
          url: shareUrl
        });
      } catch {
        // user cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const openRecipientPreview = () => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-container" onClick={(e) => e.stopPropagation()}>
        <button 
          className="share-close-btn" 
          onClick={onClose}
          aria-label="Close Share Modal"
          id="close-share-modal-btn"
        >
          <CrossIcon size={14} />
        </button>

        {/* Header Branding */}
        <div className="share-header">
          <span className="share-eyebrow">DIGITAL GIFT CREATED</span>
          <h2 className="share-title">YOUR GIFT IS READY</h2>
          <p className="share-subtitle">A language without words.</p>
        </div>

        {/* Gift Card Visual Summary */}
        <div className="share-gift-summary">
          <div className="summary-monogram">
            <span className="monogram-letter">FLORÆ</span>
          </div>
          <div className="summary-details">
            <span className="summary-label">PRIVATE ATELIER CREATION</span>
            <span className="summary-id">ID: #{giftId}</span>
            <span className="summary-notice">The recipient will open this without needing an account.</span>
          </div>
        </div>

        {/* Unique Link Input Box */}
        <div className="share-link-section">
          <label htmlFor="share-link-copy-field" className="share-link-label">
            SHAREABLE GIFT LINK
          </label>
          <div className="share-link-input-group">
            <input 
              id="share-link-copy-field"
              type="text" 
              readOnly 
              value={shareUrl} 
              className="share-link-input" 
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button 
              className={`copy-action-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyLink}
              id="share-modal-copy-btn"
            >
              {copied ? 'COPIED ✓' : 'COPY LINK'}
            </button>
          </div>
        </div>

        {/* Actions Row */}
        <div className="share-actions-row">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button 
              className="share-native-btn"
              onClick={handleWebShare}
              id="share-modal-native-btn"
            >
              SHARE VIA APP
            </button>
          )}

          <button 
            className="preview-recipient-btn"
            onClick={openRecipientPreview}
            id="share-modal-preview-btn"
          >
            EXPERIENCE AS RECIPIENT →
          </button>
        </div>

        {/* Creator Return Option */}
        <div className="creator-return-footer">
          <button 
            className="edit-gift-return-btn"
            onClick={onEditGift}
            id="share-modal-edit-btn"
          >
            ← EDIT GIFT (RETURN TO COMPOSER)
          </button>
        </div>
      </div>
    </div>
  );
};
