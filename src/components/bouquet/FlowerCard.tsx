import React from 'react';
import { Flower } from '../../types/bouquet';
import { PlusIcon } from '../ui/Icons';
import './FlowerCard.css';

interface FlowerCardProps {
  flower: Flower;
  onAdd: (flower: Flower) => void;
  isSelected?: boolean;
}

export const FlowerCard: React.FC<FlowerCardProps> = ({ flower, onAdd, isSelected = false }) => {
  return (
    <div 
      className={`flower-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onAdd(flower)}
      role="button"
      tabIndex={0}
      aria-label={`Add ${flower.name} to bouquet`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onAdd(flower);
        }
      }}
    >
      <div className="flower-card-media">
        <img 
          src={flower.image} 
          alt={flower.name}
          className="flower-card-img"
          loading="lazy"
        />
        <button 
          className="flower-add-btn" 
          aria-label={`Add ${flower.name}`}
          tabIndex={-1}
        >
          <PlusIcon size={11} />
        </button>
      </div>
      <div className="flower-card-label">
        {flower.name}
      </div>
    </div>
  );
};
