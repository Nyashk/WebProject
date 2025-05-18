import React from 'react';
import './ArtworksList.css';

const filters = [
  "All",
  "AI Drawings",
  "Portraits",
  "Popular",
  "Latest",
  "Anime",
  "3D",
  "Storyboard",
  "Landscapes",
  "Graphics",
  "Abstract",
  "Photography",
  "Digital Painting",
  "Traditional"
];

const ArtworksList = ({ activeFilter, onFilterClick }) => {
  return (
    <div className="filters-container">
      {filters.map((filter, index) => (
        <div
          key={index}
          className={`filter-item ${filter === activeFilter ? 'active' : ''}`}
          onClick={() => onFilterClick(filter)}
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') onFilterClick(filter); }}
          role="button"
          aria-pressed={filter === activeFilter}
        >
          {filter}
        </div>
      ))}
    </div>
  );
};

export default ArtworksList;
