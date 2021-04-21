const Product = require("../models/productModel");

const productController = {
  getProduct: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload!" });

      const product = await Product.findOne({ product_id });
      if (product) return res.status(400).json({ msg: "Product already exist!" });
      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      return res.status(201).json({ newProduct });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
