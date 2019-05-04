const express = require("express");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../static/images'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

const imgRoute = express.Router();


imgRoute.post("/uploading", upload.single('photo'), (req, res, next) => {
  // const files = req.files;
  const photoPath = `http://127.0.0.1:8080/static/images/${req.file.filename}`;
  res.send({
    message: '上传成功',
    errno: 0,
    status: 200,
    path:photoPath,
  });
});


module.exports = imgRoute;