const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentController = {
  getPayment: async (req, res) => {
    try {
      const payment = await Payments.find({});
      return res.status(200).json({ payment });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createPagement: async (req, res) => {
    try {
      const user = await Users.findById({ _id: req.user.id }).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist!" });

      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      await newPayment.save();
      res.status(200).json({ msg: " Payment Successfully!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = paymentController;
