import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AtelierProvider, useAtelier } from './store/atelierStore';
import { HeroPanel } from './components/layout/HeroPanel';
import { AppHeader } from './components/layout/AppHeader';
import { CenterPanel } from './components/layout/CenterPanel';
import { RightPanel } from './components/layout/RightPanel';
import { PreviewModal } from './components/ui/PreviewModal';
import { ShareGiftModal } from './components/ui/ShareGiftModal';
import { RecipientGiftView } from './components/recipient/RecipientGiftView';
import './App.css';

export const AtelierApp: React.FC = () => {
  const { 
    activeNav, 
    setActiveNav,
    isShareModalOpen, 
    setIsShareModalOpen, 
    currentGiftId, 
    currentShareUrl 
  } = useAtelier();

  return (
    <div className="atelier-app-root">
      {/* 1. Left Photographic Art Scene (approx 41.7% width) */}
      <HeroPanel />

      {/* 2. Right Interactive Atelier Workspace */}
      <div className="atelier-workspace-column">
        {/* Top Minimal Navigation spanning Center and Right panels */}
        <AppHeader />

        {/* Dual Panel Workspace */}
        <div className={`atelier-workspace-panels view-${activeNav.toLowerCase()}`}>
          <CenterPanel />
          <RightPanel />
        </div>
      </div>

      {/* Global Preview Modal */}
      <PreviewModal />

      {/* Global Share Gift Modal */}
      <ShareGiftModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        giftId={currentGiftId || ''}
        shareUrl={currentShareUrl || ''}
        onEditGift={() => {
          setIsShareModalOpen(false);
          setActiveNav('BOUQUET');
        }}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <AtelierProvider>
              <AtelierApp />
            </AtelierProvider>
          } 
        />
        <Route 
          path="/g/:giftId" 
          element={<RecipientGiftView />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
