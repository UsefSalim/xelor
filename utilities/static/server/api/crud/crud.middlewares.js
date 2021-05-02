const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/public/uploads');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname.split(' ').join('_'));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('type of image not supported'), false);
  }
};
// const upload = multer({storage: storage, limits: {fileSize:1024 *1024 * 5}});

module.exports = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
}).single('image');
