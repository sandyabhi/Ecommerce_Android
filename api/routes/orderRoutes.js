const express = require("express");
const { orderList, createOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.get("/:userId", orderList);

module.exports = router;
