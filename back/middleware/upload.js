const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Убедимся, что путь существует
const ensureUploadPath = (folder) => {
  const dir = path.join(__dirname, '..', 'uploads', folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === 'art'
      ? 'arts'
      : file.fieldname === 'avatar'
        ? 'avatars'
        : file.fieldname === 'background'
          ? 'backgrounds'
          : 'others';
    cb(null, ensureUploadPath(folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

module.exports = upload;
