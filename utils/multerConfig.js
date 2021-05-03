const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const strPath = path.join(process.cwd(__dirname), "/uploads/");
    if (!fs.existsSync(strPath)) {
      fs.mkdirSync(strPath, {
        recursive: true,
      });
    }
    cb(null, strPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ message: "File is not support!" }, false);
  }
};

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 }, fileFilter: fileFilter });

module.exports = upload;
