const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);

module.exports = router;
