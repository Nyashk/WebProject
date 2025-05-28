import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/MainPage.css';
import ArtworksList from '../components/ArtworksList';
import { fetchArtworks } from '../api/art';

const articles = [
  { id: 1, title: "How to Improve Your Digital Art", summary: "Learn key tips and techniques to enhance your digital art skills effectively.", link: "#", filters: ["All", "Digital Painting", "Popular"] },
  { id: 2, title: "Top 10 AI Art Tools", summary: "Explore the best AI tools that can boost your creative process in 2025.", link: "#", filters: ["All", "AI Drawings", "Popular"] },
  { id: 3, title: "Creating Anime Characters", summary: "A step-by-step guide on designing engaging anime characters.", link: "#", filters: ["All", "Anime", "Portraits"] },
  { id: 4, title: "Landscape Painting Basics", summary: "Understand the fundamentals of painting breathtaking landscapes.", link: "#", filters: ["All", "Landscapes", "Traditional"] },
  { id: 5, title: "3D Modeling Tips", summary: "Improve your 3D modeling skills with these practical tips.", link: "#", filters: ["All", "3D"] },
];

const MainPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [artworks, setArtworks] = useState([]);
  const [errorImages, setErrorImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtworks()
      .then(data => setArtworks(data))
      .catch(err => console.error("Ошибка при загрузке артов:", err));
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleArtworkClick = (id) => {
    navigate(`/art/${id}`);
  };

  const visibleArtworks = artworks.filter(post =>
    (activeFilter === "All" || (Array.isArray(post.tags) && post.tags.includes(activeFilter))) &&
    !errorImages[post.id]
  );

  return (
    <div className="main-container">
      <div className="filters-wrapper">
        <ArtworksList activeFilter={activeFilter} onFilterClick={handleFilterClick} />
      </div>

      <div className="articles-row">
        {articles
          .filter(article => article.filters.includes(activeFilter))
          .slice(0, 3)
          .map(article => (
            <a href={article.link} key={article.id} className="article-block" tabIndex={0}>
              <div className="article-bg" />
              <h3 className="article-title">{article.title}</h3>
              <p className="article-summary">{article.summary}</p>
            </a>
        ))}
      </div>

      <div className="current-filter-label">
        Showing artworks for filter: <span className="filter-name">{activeFilter}</span>
      </div>

      <div className="gallery">
        {visibleArtworks.map(art => (
          <div
            key={art.id}
            className="gallery-item"
            onClick={() => handleArtworkClick(art.id)}
          >
            <img
              src={art.imageUrl}
              alt={art.title || "Artwork"}
              loading="lazy"
              onError={() => {
                setErrorImages(prev => ({ ...prev, [art.id]: true }));
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
