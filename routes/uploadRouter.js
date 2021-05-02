const express = require("express");
const route = express.Router();
const fs = require("fs");

const upload = require("../utils/multerConfig");
const cloudinary = require("../utils/cloudinaryConfig");
// const cloudinary = require("cloudinary").v2;

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

route.post("/upload", upload.array("image"), async (req, res) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "ecommerce-mern-multer");
    if (req.method == "POST") {
      const urls = [];
      const files = req.files;

      for (file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      res.status(200).json({ msg: "Images Uploaded Successfully!", data: urls });
    } else {
      res.status(400).json({ error: "Images not Uploaded Successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
  // try {
  //   if (!req.files || Object.keys(req.files).length === 0)
  //     return res.status(400).json({ msg: "No files were uploaded!" });
  //   const file = req.files.file;
  //   if (file.size > 1024 * 1024) {
  //     removeTmp(file.tempFilePath);
  //     return res.status(400).json({ msg: "Size too large!" });
  //   }
  //   if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
  //     removeTmp(file.tempFilePath);
  //     return res.status(400).json({ msg: "File format is incorrected!" });
  //   }
  //   cloudinary.uploader.upload(file.tempFilePath, { folder: "ecommerce-mern" }, (error, result) => {
  //     if (error) throw error;
  //     removeTmp(file.tempFilePath);
  //     return res.status(201).json(result);
  //   });
  // } catch (error) {
  //   return res.status(500).json({ msg: error.message });
  // }
});

route.post("/destroy", auth, authAdmin, (req, res) => {
  // try {
  //   const { public_id } = req.body;
  //   if (!public_id) return res.status(400).json({ msg: "No image selected!" });
  //   cloudinary.uploader.destroy(public_id, async (error, result) => {
  //     if (error) throw error;
  //     res.status(200).json({ msg: "Deleted image!" });
  //   });
  // } catch (error) {
  //   return res.status(500).json({ msg: error.message });
  // }
});

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};

module.exports = route;
