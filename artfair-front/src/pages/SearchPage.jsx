import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/SearchPage.css';

const mockData = {
  accounts: [
    { id: 1, name: 'Alice Painter' },
    { id: 2, name: 'Bob Illustrator' },
    { id: 3, name: 'Charlie Digital' },
  ],
  articles: [
    { id: 1, title: 'How to Improve Your Digital Art' },
    { id: 2, title: 'Top 10 AI Art Tools' },
    { id: 3, title: 'Creating Anime Characters' },
  ],
  artworks: [
    { id: 1, title: 'Sunset Over Mountains' },
    { id: 2, title: 'Cyberpunk Cityscape' },
  ],
};

const SearchPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const q = new URLSearchParams(search).get('q') || '';
  const [activeFilter, setActiveFilter] = useState('all');
  const [results, setResults] = useState({});

  // При изменении q — фильтруем
  useEffect(() => {
    if (!q.trim()) {
      setResults({});
      return;
    }
    const filtered = {};
    Object.entries(mockData).forEach(([key, items]) => {
      filtered[key] = items.filter(i =>
        (i.name || i.title).toLowerCase().includes(q.toLowerCase())
      );
    });
    setResults(filtered);
    setActiveFilter('all');
  }, [q]);

  const filteredList = (key) =>
    activeFilter === 'all'
      ? results[key] || []
      : activeFilter === key
        ? results[key] || []
        : [];

  const anyFound = Object.values(results).some(arr => arr.length > 0);

  return (
    <div className="search-page-wrapper">
      <div className="search-page-container">
        <h2>Results for “{q}”</h2>

        <div className="filters-row">
          {['all', 'accounts', 'articles', 'artworks'].map(f => (
            <button
              key={f}
              className={activeFilter === f ? 'active' : ''}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="results-container">
          {!q.trim() ? (
            <p>Enter a search term above and press Enter.</p>
          ) : !anyFound ? (
            <p>No results found for “{q}”.</p>
          ) : (
            ['accounts', 'articles', 'artworks']
              .filter(key => filteredList(key).length > 0)
              .map(key => (
                <div key={key} className="result-group">
                  <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                  <ul>
                    {filteredList(key).map(item => (
                      <li key={item.id}>
                        {/* Кликабельная заглушка */}
                        <a href={`#/${key}/${item.id}`}>
                          {item.name || item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
