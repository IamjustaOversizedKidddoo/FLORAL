import React from 'react';
import { useAtelier } from '../../store/atelierStore';
import { ProfileIcon } from '../ui/Icons';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const { activeNav, setActiveNav, setIsPreviewOpen, startNewCreation } = useAtelier();

  const handleNavClick = (nav: 'BOUQUET' | 'LETTER' | 'PREVIEW') => {
    setActiveNav(nav);
    if (nav === 'PREVIEW') {
      setIsPreviewOpen(true);
    }
  };

  return (
    <header className="app-header">
      <nav className="header-nav">
        <button
          className={`nav-item ${activeNav === 'BOUQUET' ? 'active' : ''}`}
          onClick={() => handleNavClick('BOUQUET')}
          id="nav-bouquet-btn"
        >
          <span>BOUQUET</span>
          {activeNav === 'BOUQUET' && <div className="nav-indicator" />}
        </button>

        <button
          className={`nav-item ${activeNav === 'LETTER' ? 'active' : ''}`}
          onClick={() => handleNavClick('LETTER')}
          id="nav-letter-btn"
        >
          <span>LETTER</span>
          {activeNav === 'LETTER' && <div className="nav-indicator" />}
        </button>

        <button
          className={`nav-item ${activeNav === 'PREVIEW' ? 'active' : ''}`}
          onClick={() => handleNavClick('PREVIEW')}
          id="nav-preview-btn"
        >
          <span>PREVIEW</span>
          {activeNav === 'PREVIEW' && <div className="nav-indicator" />}
        </button>
      </nav>

      <div className="header-right">
        <button
          className="header-start-fresh-btn"
          onClick={startNewCreation}
          id="header-start-fresh-btn"
          title="Reset to fresh canonical creation"
        >
          START FRESH
        </button>
        <span className="header-tagline">For a kinder world</span>
        <button className="profile-btn" aria-label="Account Profile" id="user-profile-btn">
          <ProfileIcon size={21} />
        </button>
      </div>
    </header>
  );
};
