const Products = require("../models/productModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((ele) => delete queryObj[ele]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => "$" + match);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {}

  paginating() {}
}

const productController = {
  getProduct: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering();
      const products = await features.query;

      res.status(200).json({ products });
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
      const newProduct = new Products({
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
      await Products.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Deleted a Product!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload!" });

      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        { title: title.toLowerCase(), price, description, content, images, category }
      );

      return res.status(200).json({ msg: "Updated a Product!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
