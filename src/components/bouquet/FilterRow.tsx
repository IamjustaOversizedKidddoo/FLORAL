import React, { useState } from 'react';
import { useAtelier } from '../../store/atelierStore';
import { BouquetCategory, FlowerColor, FlowerMeaning, FlowerRegion, FlowerSeason } from '../../types/bouquet';
import { SearchIcon, ChevronDownIcon } from '../ui/Icons';
import './FilterRow.css';

const CATEGORIES: BouquetCategory[] = ['FLOWERS', 'FOLIAGE', 'EXTRAS', 'RARE BOTANICALS', 'VASE & WRAP'];

export const FilterRow: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    filterColor,
    setFilterColor,
    filterMeaning,
    setFilterMeaning,
    filterSeason,
    setFilterSeason,
    filterRegion,
    setFilterRegion
  } = useAtelier();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <div className="filter-row-container">
      {/* Category Pills */}
      <div className="category-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`category-${cat.toLowerCase().replace(/[^a-z]/g, '-')}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Filters (only for botanical items) */}
      {activeCategory !== 'VASE & WRAP' && (
        <>
          {/* Search Input */}
          <div className="search-bar">
        <SearchIcon size={13} className="search-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search flowers (e.g. Rose, Tulip, Orchid...)"
          className="search-input"
          id="flower-search-input"
        />
        {searchQuery && (
          <button 
            className="search-clear" 
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Filter Dropdown Buttons */}
      <div className="filter-chips">
        {/* Color Filter */}
        <div className="filter-dropdown-wrapper">
          <button
            className={`filter-chip ${filterColor !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('color')}
            id="filter-color-btn"
          >
            <span>{filterColor !== 'all' ? `Color: ${filterColor}` : 'Color'}</span>
            <ChevronDownIcon size={10} />
          </button>
          {openDropdown === 'color' && (
            <div className="dropdown-menu">
              {(['all', 'red', 'pink', 'white', 'purple', 'yellow', 'blue'] as FlowerColor[]).map(c => (
                <button
                  key={c}
                  className={`dropdown-item ${filterColor === c ? 'selected' : ''}`}
                  onClick={() => {
                    setFilterColor(c);
                    setOpenDropdown(null);
                  }}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Meaning Filter */}
        <div className="filter-dropdown-wrapper">
          <button
            className={`filter-chip ${filterMeaning !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('meaning')}
            id="filter-meaning-btn"
          >
            <span>{filterMeaning !== 'all' ? `Meaning: ${filterMeaning}` : 'Meaning'}</span>
            <ChevronDownIcon size={10} />
          </button>
          {openDropdown === 'meaning' && (
            <div className="dropdown-menu">
              {(['all', 'love', 'gratitude', 'peace', 'admiration', 'joy', 'purity'] as FlowerMeaning[]).map(m => (
                <button
                  key={m}
                  className={`dropdown-item ${filterMeaning === m ? 'selected' : ''}`}
                  onClick={() => {
                    setFilterMeaning(m);
                    setOpenDropdown(null);
                  }}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Season Filter */}
        <div className="filter-dropdown-wrapper">
          <button
            className={`filter-chip ${filterSeason !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('season')}
            id="filter-season-btn"
          >
            <span>{filterSeason !== 'all' ? `Season: ${filterSeason}` : 'Season'}</span>
            <ChevronDownIcon size={10} />
          </button>
          {openDropdown === 'season' && (
            <div className="dropdown-menu">
              {(['all', 'spring', 'summer', 'autumn', 'winter'] as FlowerSeason[]).map(s => (
                <button
                  key={s}
                  className={`dropdown-item ${filterSeason === s ? 'selected' : ''}`}
                  onClick={() => {
                    setFilterSeason(s);
                    setOpenDropdown(null);
                  }}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Region Filter */}
        <div className="filter-dropdown-wrapper">
          <button
            className={`filter-chip ${filterRegion !== 'all' ? 'active' : ''}`}
            onClick={() => toggleDropdown('region')}
            id="filter-region-btn"
          >
            <span>{filterRegion !== 'all' ? `Region: ${filterRegion}` : 'Region'}</span>
            <ChevronDownIcon size={10} />
          </button>
          {openDropdown === 'region' && (
            <div className="dropdown-menu">
              {(['all', 'japan', 'france', 'mediterranean', 'netherlands'] as FlowerRegion[]).map(r => (
                <button
                  key={r}
                  className={`dropdown-item ${filterRegion === r ? 'selected' : ''}`}
                  onClick={() => {
                    setFilterRegion(r);
                    setOpenDropdown(null);
                  }}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};
