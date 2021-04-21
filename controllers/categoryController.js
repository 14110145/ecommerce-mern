const Category = require("../models/categoryModel");

const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json({ categories });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) return res.status(400).json({ msg: "This category already exist!" });
      const newCategory = new Category({ name });
      await newCategory.save();

      return res.status(201).json({ newCategory, msg: "Created a new category!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Deleted a category!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.status(200).json({ msg: "Updated a category!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = categoryController;
