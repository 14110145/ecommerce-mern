const express = require("express");
const userCtrl = require("../controllers/userCtrl");
const router = express.Router();

router.post("/register", userCtrl.register);
router.get("/refresh_token", userCtrl.refreshToken);

module.exports = router;
