const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const categoryController = require("../controllers/categoryController");

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(auth, authAdmin, categoryController.createCategory);

module.exports = router;
