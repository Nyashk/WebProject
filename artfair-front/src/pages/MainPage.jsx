import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/MainPage.css';
import ArtworksList from '../components/ArtworksList';
import { fetchArtworks } from '../api/art';

import article1 from '../assets/images/article1.png';
import article2 from '../assets/images/article2.png';
import article3 from '../assets/images/article3.png';
import article4 from '../assets/images/article4.png';
import article5 from '../assets/images/article5.png';

const articles = [
  {
    id: 1,
    title: "Article 1",
    summary: "Summary of article 1",
    image: article1,
    link: "#"
  },
  {
    id: 2,
    title: "Article 2",
    summary: "Summary of article 2",
    image: article2,
    link: "#"
  },
  {
    id: 3,
    title: "Article 3",
    summary: "Summary of article 3",
    image: article3,
    link: "#"
  },
  {
    id: 4,
    title: "Article 4",
    summary: "Summary of article 4",
    image: article4,
    link: "#"
  },
  {
    id: 5,
    title: "Article 5",
    summary: "Summary of article 5",
    image: article5,
    link: "#"
  }
];

const MainPage = () => {
  const [artworks, setArtworks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtworks('created_at')
      .then(data => {
        const fixed = data.map(art => ({
          ...art,
          imageUrl: `http://localhost:5000${art.imageUrl}`
        }));
        setArtworks(fixed);
      })
      .catch(err => console.error("Ошибка при загрузке артов:", err));
  }, []);

  const handleArtworkClick = (id) => {
    navigate(`/art/${id}`);
  };

  return (
    <div className="main-container">
      <div className="filters-wrapper">
        <ArtworksList activeFilter={"All"} onFilterClick={() => {}} />
      </div>

      <div className="articles-row">
        {articles.slice(0, 3).map(article => (
          <a href={article.link} key={article.id} className="article-block" tabIndex={0}>
            <div
              className="article-bg"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.05)), url(${article.image})`
              }}
            />
            <h3 className="article-title">{article.title}</h3>
            <p className="article-summary">{article.summary}</p>
          </a>
        ))}
      </div>

      <div className="gallery">
        {artworks.map(art => (
          <div
            key={art.id}
            className="gallery-item"
            onClick={() => handleArtworkClick(art.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') handleArtworkClick(art.id); }}
          >
            <img
              src={art.imageUrl}
              alt={art.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-image.png'; 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
