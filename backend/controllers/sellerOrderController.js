const Order = require("../models/Order");
const Product = require("../models/Product");

async function getSellerOrders(req, res) {
    try {
        const sellerId = req.user.id;

        const sellerProducts = await Product.find({ seller: sellerId });

        const productIds = sellerProducts.map(product => product._id);

        const orders = await Order.find({
            "items.product": { $in: productIds }
        }).populate("items.product");

        return res.status(200).json({
            message: "Seller order fetched successfully",
            count: orders.length,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const sellerId = req.user.id;

        const sellerProducts = await Product.find({
            seller: sellerId
        });

        const productIds = sellerProducts.map(product => product._id);

        const sellerOwnsOrder = order.items.some(item =>
            productIds.some(productId =>
                productId.toString() === item.product.toString()
            )
        );

        if (!sellerOwnsOrder) {
            return res.status(403).json({
                message: "You are not authorized to update this order"
            });
        }

        const currentStatus = order.status;

        if (
            (currentStatus === "pending" && !["confirmed", "cancelled"].includes(status)) ||
            (currentStatus === "confirmed" && !["shipped", "cancelled"].includes(status)) ||
            (currentStatus === "shipped" && status !== "delivered") ||
            (currentStatus === "delivered" || currentStatus === "cancelled")
        ) {
            return res.status(400).json({
                message: `Cannot change order status from ${currentStatus} to ${status}`
            });
        }
        order.status = status;
        await order.save();

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    getSellerOrders,
    updateOrderStatus
}