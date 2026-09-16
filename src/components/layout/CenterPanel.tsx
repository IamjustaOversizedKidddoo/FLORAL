import React, { useMemo } from 'react';
import { useAtelier } from '../../store/atelierStore';
import { BOTANICAL_CATALOG } from '../../data/botanicalCatalog';
import { BotanicalItem } from '../../types/bouquet';
import { FlowerCard } from '../bouquet/FlowerCard';
import { FilterRow } from '../bouquet/FilterRow';
import { BouquetTray } from '../bouquet/BouquetTray';
import { VaseWrapSelector } from '../bouquet/VaseWrapSelector';
import './CenterPanel.css';

export const CenterPanel: React.FC = () => {
  const { 
    activeCategory, 
    searchQuery, 
    filterColor, 
    filterMeaning, 
    filterSeason, 
    filterRegion,
    resetFilters,
    addBotanicalItem,
    bouquetItems,
    selectedInstanceId 
  } = useAtelier();

  // Filter flowers based on user search and filters
  const currentCatalogItems = useMemo(() => {
    if (activeCategory === 'VASE & WRAP') return [];

    const items = BOTANICAL_CATALOG.filter(item => {
      // Category match: if user has a search query on the default 'FLOWERS' tab, search across all botanical items
      const isSearching = searchQuery.trim() !== '';
      if (!isSearching || activeCategory !== 'FLOWERS') {
        if (item.category !== activeCategory) {
          return false;
        }
      }

      // Search (case-insensitive across name, scientific name, meanings, description, category, regions)
      if (isSearching) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSci = item.scientificName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesMeanings = item.meanings.some(m => m.toLowerCase().includes(q));
        const matchesRegions = item.regions.some(r => r.toLowerCase().includes(q));
        if (!matchesName && !matchesSci && !matchesDesc && !matchesCategory && !matchesMeanings && !matchesRegions) {
          return false;
        }
      }

      // Color filter
      if (filterColor !== 'all' && !item.colors.includes(filterColor) && !item.colors.includes('all')) {
        return false;
      }

      // Meaning filter
      if (filterMeaning !== 'all' && !item.meanings.includes(filterMeaning) && !item.meanings.includes('all')) {
        return false;
      }

      // Season filter
      if (filterSeason !== 'all' && !item.seasons.includes(filterSeason) && !item.seasons.includes('all')) {
        return false;
      }

      // Region filter
      if (filterRegion !== 'all' && !item.regions.includes(filterRegion) && !item.regions.includes('all')) {
        return false;
      }

      return true;
    });

    // Default FLOWERS view displays the 8 canonical flowers matching reference_1.png
    if (activeCategory === 'FLOWERS' && !searchQuery.trim() && filterColor === 'all' && filterMeaning === 'all' && filterSeason === 'all' && filterRegion === 'all') {
      return items.slice(0, 8);
    }

    return items;
  }, [activeCategory, searchQuery, filterColor, filterMeaning, filterSeason, filterRegion]);

  const hasActiveFilters = searchQuery !== '' || filterColor !== 'all' || filterMeaning !== 'all' || filterSeason !== 'all' || filterRegion !== 'all';

  return (
    <main className="center-panel" aria-label="Customize Your Bouquet">
      {/* Header section matching reference */}
      <div className="center-panel-header">
        <span className="step-label">01 / 02</span>
        <div className="title-row">
          <h2 className="section-title">CUSTOMIZE YOUR BOUQUET</h2>
          <div className="title-rule" />
        </div>
        <p className="section-subtitle">Choose. Arrange. Express.</p>
      </div>

      {/* Filter and category navigation controls */}
      <FilterRow />

      {/* Catalog Display Area */}
      <div className="flower-grid-container">
        {activeCategory === 'VASE & WRAP' ? (
          <VaseWrapSelector />
        ) : (
          <>
            <div className="flower-grid">
              {currentCatalogItems.map((botanical: BotanicalItem) => {
                const isSelected = bouquetItems.some(
                  i => i.botanicalId === botanical.id && i.instanceId === selectedInstanceId
                );

                return (
                  <FlowerCard
                    key={botanical.id}
                    flower={botanical}
                    onAdd={addBotanicalItem}
                    isSelected={isSelected}
                  />
                );
              })}
            </div>

            {currentCatalogItems.length === 0 && (
              <div className="empty-catalog-state">
                <p>No botanical varieties match your selection.</p>
                {hasActiveFilters && (
                  <button className="reset-filters-btn" onClick={resetFilters}>
                    Reset All Filters
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Tray of selected items and primary actions */}
      <BouquetTray />
    </main>
  );
};
