const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function placeOrder(req, res) {
    try {

        const userId = req.user.id;
        const cart = await Cart.findOne({ user: userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (item.quantity > product.stock) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}`
                });
            }
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
            totalAmount += product.price * item.quantity;

            // reduce stock
            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount
        });

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getMyOrders(req,res) {
    try{
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
        .populate("items.product");

        return res.status(200).json({
            message: "Orders fetched successfully",
            count: orders.length,
            orders
        });

    } catch(error) {
        return res.status(500).json ({
        message: "Server error",
        error: error.message
        });
    }
}

async function cancelOrder(req,res) {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        if(order.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: "you are not authorized to cancel the order"
            });
        }

        if(["shipped","delivered","cancelled"].includes(order.status)) {
            return res.status(400).json({
                message: `Order cannot be cancelled when status is ${order.status}`
            });
        }

        for(const item of order.items) {
            const product = await Product.findById(item.product);

            if(product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.status = "cancelled";

        await order.save();

        return res.status(200).json({
            message: "Order cancelled successfully",
            order
        });


    } catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    placeOrder,
    getMyOrders,
    cancelOrder
};