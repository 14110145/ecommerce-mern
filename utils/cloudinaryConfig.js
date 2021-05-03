const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { folder }, (error, result) => {
      resolve({ url: result.url, public_id: result.public_id });
    });
  });
};

exports.destroy = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, async (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};
