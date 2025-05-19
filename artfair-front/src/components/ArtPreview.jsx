import React from 'react';
import { useParams } from 'react-router-dom';
import './ArtPreview.css';

const ArtPreview = () => {
  const { id } = useParams();
  const imageUrl = `https://picsum.photos/id/${parseInt(id) + 30}/800/600`;

  return (
    <div className="art-preview-page">
      <div className="art-wrapper">
        <div className="art-left">
          <img src={imageUrl} alt={`Artwork ${id}`} className="responsive-art" />
        </div>
        <div className="art-right">
          <div className="art-info">
            <h2>Artwork #{id}</h2>
            <p>Здесь может быть информация об авторе, описание, лайки и кнопка "в галерею".</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtPreview;
