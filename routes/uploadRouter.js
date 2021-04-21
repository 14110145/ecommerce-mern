const express = require("express");
const route = express.Router();
const cloudinary = require("cloudinary").v2;

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

route.post("/upload", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded!" });

    const file = req.files.file;
    if (file.size > 1024 * 1024) return res.status(400).json({ msg: "Size too large!" });
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png")
      return res.status(400).json({ msg: "File format is incorrected!" });

    cloudinary.uploader.upload(file.tempFilePath, { folder: "test" }, (error, result) => {
      if (error) throw error;
      return res.json({ result });
    });

    // return res.status(200).json({ msg: "File uploaded!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = route;
