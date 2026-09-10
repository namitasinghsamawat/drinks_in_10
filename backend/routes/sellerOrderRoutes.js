const express = require("express");

const router = express.Router();

const { getSellerOrders, updateOrderStatus } = require("../controllers/sellerOrderController");

const authMiddleware = require("../middleware/authMiddleware");
const checkSeller = require("../middleware/checkSeller");

router.get("/orders", authMiddleware, checkSeller, getSellerOrders);
router.put("/orders/:orderId/status", authMiddleware, checkSeller, updateOrderStatus);

module.exports = router;