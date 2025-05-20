import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import '../components/ArtDetailPage.css';

const dummyArtworks = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/1011/800/600',
    title: 'Sunset in the Hills',
    author: 'ArtistName',
    avatar: 'https://i.pravatar.cc/100?img=15',
    description: 'A vibrant sunset view with dramatic shadows and rich colors.',
    hashtags: ['#landscape', '#sunset', '#digital'],
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/1012/800/600',
    title: 'Dreamscape AI',
    author: 'AIGen',
    avatar: 'https://i.pravatar.cc/100?img=20',
    description: 'An abstract dreamlike composition generated using AI.',
    hashtags: ['#ai', '#abstract', '#neural'],
  },
];

const ArtDetailPage = () => {
  const { id } = useParams();
  const artwork = dummyArtworks.find((a) => a.id === id);

  if (!artwork) {
    return <div style={{ padding: "2rem" }}>Artwork not found.</div>;
  }

  return (
    <div className="art-detail-page">
      <div className="art-container">
        <div className="art-left">
          <img src={artwork.imageUrl} alt={artwork.title} className="art-image" />
        </div>

        <div className="art-right">
          <div className="art-info">
            <div className="author-info">
              <img src={artwork.avatar} alt="avatar" className="author-avatar" />
              <p className="author">
                <Link to={`/user/${artwork.author}`}>{artwork.author}</Link>
              </p>
            </div>
            <h1>{artwork.title}</h1>
            <p className="description">{artwork.description}</p>

            <div className="hashtags">
              {artwork.hashtags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>

            <div className="icons">
              <FaHeart className="icon" />
              <FaStar className="icon" />
            </div>

            <hr className="section-divider" />
            <div className="comments-section">
              <h3>Comments</h3>
              <p>User comments will appear here...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetailPage;
