const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4());
  },
});

const fileFilter = function (req, file, cb) {
  const allowTypes = /jpeg|jpg|png/;
  const valid = allowTypes.test(file.mimetype);

  if (valid) {
    cb(null, true);
  } else {
    cb({
      message: 'Unsupported format',
      statusCode: 400,
    });
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10000000 } });

module.exports = upload;
