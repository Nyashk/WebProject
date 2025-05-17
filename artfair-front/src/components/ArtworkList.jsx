const ArtworkList = () => {
  // Здесь будет запрос к серверу для получения списка работ
  const artworks = [
    { id: 1, title: "Artwork 1", author: "Author 1" },
    { id: 2, title: "Artwork 2", author: "Author 2" },
    { id: 3, title: "Artwork 3", author: "Author 3" },
  ];

  return (
    <div className="artwork-list">
      {artworks.map((art) => (
        <div key={art.id} className="artwork-item">
          <h3>{art.title}</h3>
          <p>{art.author}</p>
        </div>
      ))}
    </div>
  );
};

export default ArtworkList;
