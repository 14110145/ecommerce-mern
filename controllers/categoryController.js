const Category = require("../models/categoryModel");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = Category.find();
      res.json({ categories });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      res.send("checked");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryController;
