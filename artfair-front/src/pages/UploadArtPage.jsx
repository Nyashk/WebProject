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
      alert('Пожалуйста, выберите изображение.');
      return;
    }
    try {
      const post = await uploadArt(file, title, description);
      // после успешной загрузки — на свою страницу профиля
      navigate(`/user/${post.userId}`);
    } catch (err) {
      console.error('Ошибка при публикации арта:', err);
      alert('Не удалось опубликовать арт');
    }
  };

  return (
    <div className="upload-art-page">
      <h2>Загрузить арт</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="preview" className="preview-image" />}
        <input
          type="text"
          placeholder="Заголовок (необязательно)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Описание (необязательно)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea"
        />
        <button type="submit" className="publish-button">
          Опубликовать
        </button>
      </form>
    </div>
  );
};

export default UploadArtPage;
