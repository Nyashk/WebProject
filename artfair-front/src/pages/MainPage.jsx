import React from 'react';
import '../MainPage.css';

const MainPage = () => {
  return (
    <div className="main-container">
      <div className="filters">
        <div className="filter-item">Все</div>
        <div className="filter-item">AI рисунки</div>
        <div className="filter-item">Портреты</div>
        <div className="filter-item">Популярные</div>
        <div className="filter-item">Последние работы</div>
        <div className="filter-item">Аниме</div>
        <div className="filter-item">3D</div>
        <div className="filter-item">Раскадровка</div>
        <div className="filter-item">Пейзажи</div>
        <div className="filter-item">Графика</div>
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
