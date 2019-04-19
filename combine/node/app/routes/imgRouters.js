const express = require("express");

const imgRoute = express.Router();


imgRoute.post("/uploading",(req, resp) => {
  const files = req.files;
  console.log(files);
});

module.exports = imgRoute;