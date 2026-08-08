const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        licenseNumber: {
            type: String,
            required: true
        },
        licenseVerified: {
            type: Boolean,
            default: false
        },

        shopName: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        }


    }
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;