import React, { useState } from 'react';
import '../components/UploadArtPage.css';

const CATEGORIES = ['digital', 'traditional', '3d', 'photography', 'fanart'];

const UploadArtPage = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!image) {
      alert('Please upload an image before publishing.');
      return;
    }

    const tags = hashtags
      .split(',')
      .map(tag => tag.trim().toLowerCase().replace(/^#/, ''));

    const matchingCategories = tags.filter(tag => CATEGORIES.includes(tag));

    const newArt = {
      image,
      title,
      description,
      hashtags: tags,
      categories: matchingCategories,
      author: 'current_user', // replace with current user
      date: new Date().toISOString()
    };

    console.log('📦 Art Submitted:', newArt);

    // TODO: send to server and update feeds
  };

  return (
    <div className="upload-art-page">
      <h2>Upload Your Art</h2>

      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="preview" className="preview-image" />}
      </div>

      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea"
      />

      <input
        type="text"
        placeholder="Hashtags (e.g. #digital, #3d)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        className="input"
      />

      <button onClick={handleSubmit} className="publish-button">
        Publish
      </button>
    </div>
  );
};

export default UploadArtPage;
