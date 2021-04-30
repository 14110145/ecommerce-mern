const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/products").get(productController.getProduct).post(auth, authAdmin, productController.createProduct);

router
  .route("/products/:id")
  .put(auth, productController.updateProduct)
  .delete(auth, authAdmin, productController.deleteProduct);

module.exports = router;
