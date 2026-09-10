const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function addToCart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (quantity <= 0 || quantity > product.stock) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const newCart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity
                    }
                ]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart: newCart
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                return res.status(400).json({
                    message: "Insufficient stock"
                });
            }

            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function getCart(req,res) {
    try{
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId })
        .populate("items.product");

        if(!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            cart
        });
    }catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function updateCart(req,res) {
    try {
        const { productId,quantity } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });

        if(!cart){
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if(!existingItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        
        if(quantity <=0 || quantity > product.stock) {
            return res.status(400).json({
                message: "invalid quantity or insufficient stock"
            })
        }
        existingItem.quantity = quantity;

        await cart.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            cart
        });


    }catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

async function removeFromCart(req,res) {
    try {
        const { productId } = req.body;
        const userId = req.user.id;

        const cart = await Cart.findOne({user: userId});
        
        if(!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if(!existingItem) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() != productId
        );

        await cart.save();

        return res.status(200).json({
            message: "Product removed from the cart"
        });

    }catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
    
}

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
};