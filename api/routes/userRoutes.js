const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
  getAddress,
  userAddress,
  getProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);
router.post("/address", userAddress);
router.get("/address/:userId", getAddress);
router.get("/profile/:userId", getProfile);

module.exports = router;
