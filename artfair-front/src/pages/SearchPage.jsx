import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/SearchPage.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const query = useQuery();
  const q = query.get('q') || '';
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState('all');
  const [results, setResults] = useState({ users: [], artworks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q.trim()) {
      setResults({ users: [], artworks: [] });
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(q)}`)
      .then(res => {
        if (!res.ok) throw new Error('Server error');
        return res.json();
      })
      .then(data => {
        setResults({
          users: data.users || [],
          artworks: data.artworks || []
        });
        setActiveFilter('all');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [q]);

  const filteredList = (key) =>
    activeFilter === 'all'
      ? results[key] || []
      : activeFilter === key
        ? results[key] || []
        : [];

  const anyFound = Object.values(results).some(arr => arr.length > 0);

  const onArtworkClick = (id) => {
    navigate(`/art/${id}`);
  };

  const onUserClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="search-page-wrapper">
      <div className="search-page-container">
        <h2>Search results for: “{q}”</h2>

        <div className="filters-row">
          {['all', 'users', 'artworks'].map(f => (
            <button
              key={f}
              className={activeFilter === f ? 'active' : ''}
              onClick={() => setActiveFilter(f)}
            >
              {f === 'all' ? 'All' : f === 'users' ? 'Users' : 'Artworks'}
            </button>
          ))}
        </div>

        <div className="results-container">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!loading && !error && (
            <>
              {!q.trim() ? (
                <p>Enter a search query above and press Enter.</p>
              ) : !anyFound ? (
                <p>No results found for “{q}”.</p>
              ) : (
                ['users', 'artworks']
                  .filter(key => filteredList(key).length > 0)
                  .map(key => (
                    <div key={key} className="result-group">
                      <h3>{key === 'users' ? 'Users' : 'Artworks'}</h3>
                      <ul>
                        {filteredList(key).map(item => (
                          <li key={item.id} className="result-item">
                            {key === 'artworks' ? (
                              <button
                                className="link-button no-hover"
                                onClick={() => onArtworkClick(item.id)}
                              >
                                {item.title}
                              </button>
                            ) : (
                              <button
                                className="link-button no-hover"
                                onClick={() => onUserClick(item.username)}
                              >
                                {item.username}
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
