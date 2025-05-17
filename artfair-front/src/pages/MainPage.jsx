import React from 'react';
import '../MainPage.css';

const MainPage = () => {
  const filters = [
    "Все",
    "AI рисунки",
    "Портреты",
    "Популярные",
    "Последние работы",
    "Аниме",
    "3D",
    "Раскадровка",
    "Пейзажи",
    "Графика"
  ];

  return (
    <div className="main-container">
      <div className="filters">
        {filters.map((filter, index) => (
          <div key={index} className="filter-item">
            {filter}
          </div>
        ))}
      </div>

      <div className="gallery">
        <div className="gallery-item">
          <img src="https://via.placeholder.com/200" alt="Artwork 1" />
        </div>
        <div className="gallery-item">
          <img src="https://via.placeholder.com/200" alt="Artwork 2" />
        </div>
        <div className="gallery-item">
          <img src="https://via.placeholder.com/200" alt="Artwork 3" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
