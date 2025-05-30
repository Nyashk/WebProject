import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/UploadArtPage.css';
import { uploadArt } from '../api/art';

const UploadArtPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select an image.');
      return;
    }
    try {
      await uploadArt(file, title, description);
      navigate('/me');
    } catch (err) {
      console.error('Error uploading art:', err);
      alert('Failed to publish art.');
    }
  };

  return (
    <div className="upload-art-page">
      <h2>Upload Your Art</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
        {preview && <img src={preview} alt="preview" className="preview-image" />}
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea"
        />
        <button type="submit" className="publish-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default UploadArtPage;
