const express = require("express");

const router = express.Router();

const { placeOrder, getMyOrders, cancelOrder } = require("../controllers/orderController");
const authUser = require("../middleware/authUser");

router.post("/place", authUser,placeOrder);
router.get("/my-orders",authUser,getMyOrders);
router.put("/:orderId/cancel", authUser, cancelOrder);

module.exports = router;