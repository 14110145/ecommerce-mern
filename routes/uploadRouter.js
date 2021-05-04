const express = require("express");
const route = express.Router();
const fs = require("fs");

const upload = require("../utils/multerConfig");
const cloudinary = require("../utils/cloudinaryConfig");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

route.post("/upload", auth, authAdmin, upload.array("image"), async (req, res) => {
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
      return res.status(200).json(urls);
    } else {
      return res.status(400).json({ error: "Images not Uploaded Successfully!" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

route.post("/destroy", auth, authAdmin, async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ msg: "No image selected!" });
    const result = await cloudinary.destroy(public_id);
    return res.status(200).json({ msg: "Deleted image", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = route;
