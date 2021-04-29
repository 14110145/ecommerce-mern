const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentController.getPayment)
  .post(auth, paymentController.createPagement);

module.exports = router;
