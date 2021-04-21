const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(productController.getProduct).post(productController.createProduct);

router.route("/products/:id").put(productController.updateProduct).delete(productController.deleteProduct);

module.exports = router;
