const express = require("express");
const route = express.Router();

const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

route.post("/register", userController.register);

route.post("/login", userController.login);

route.get("/logout", userController.logout);

route.get("/refresh_token", userController.refreshToken);

route.get("/info", auth, userController.getUser);

route.patch("/addcart", auth, userController.addCart);

route.get("/history", auth, userController.history);

module.exports = route;
