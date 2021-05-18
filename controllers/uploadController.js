const fs = require("fs");
const upload = require("../utils/multerConfig");

exports.uploadCtr = async (req, res) => {
  //   try {
  //     const uploader = async (path) => await cloudinary.uploads(path, "ecommerce-mern-multer");
  //     if (req.method == "POST") {
  //       const urls = [];
  //       const files = req.files;
  //       for (file of files) {
  //         const { path } = file;
  //         const newPath = await uploader(path);
  //         urls.push(newPath);
  //         fs.unlinkSync(path);
  //       }
  //       return res.status(200).json(urls);
  //     } else {
  //       return res.status(400).json({ error: "Images not Uploaded Successfully!" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // });

  // route.post("/destroy", auth, authAdmin, async (req, res) => {
  //   try {
  //     const { public_id } = req.body;
  //     if (!public_id) return res.status(400).json({ msg: "No image selected!" });
  //     const result = await cloudinary.destroy(public_id);
  //     return res.status(200).json({ msg: "Deleted image", result });
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }

  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files!");
    error.httpStatusCode = 400;

    return next(error);
  }

  let imgArray = files.map((file) => {
    let img = fs.readFileSync(file.path);
    fs.unlinkSync(file.path);
    return img.toString("base64");
  });

  let result = imgArray.map(async (src, index) => {
    let finalImg = {
      fileName: files[index].filename,
      contentType: files[index].mimetype,
      imagesBase64: src,
    };

    const newUploads = new Uploads(finalImg);

    return await newUploads
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} Upload Successfully...!` };
      })
      .catch((error) => {
        if (error.name === "MongoError" && error.code === 11000) {
          return Promise.reject({ error: `Duplicate ${files[index].originalname}. File Already exists!` });
        }
        return Promise.reject({ error: error.message || `Cant upload ${files[index].originalname} file.` });
      });
  });

  Promise.all(result)
    .then((msg) => {
      return res.status(200).json({ msg: "Upload all images successfully!" });
    })
    .catch((error) => {
      return res.status(400).json({ msg: error });
    });
};
