const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");

async function registerSeller(req, res) {
    try {
        // read data
        console.log(req.body);

        const {
            name,
            email,
            password,
            phone,
            licenseNumber,
            shopName,
            address,
            role
        } = req.body;
        // validate fields
        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !licenseNumber ||
            !shopName ||
            !address
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //check email 
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(409).json({
                message: "email already registered"
            });
        }
        // hash password
        const hashPassword = await bcrypt.hash(password,10);

        // create user
        const seller = await Seller.create({
            name,
            email,
            password: hashPassword,
            phone,
            licenseNumber,
            shopName,
            address,
            role
            });
        return res.status(201).json({
        message: "Seller registered successfully",
        seller
        });
       

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    registerSeller
};