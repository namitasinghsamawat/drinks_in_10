const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            address
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
        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        //check email 
        const existingSeller = await Seller.findOne({ email });

        if (existingSeller) {
            return res.status(409).json({
                message: "email already registered"
            });
        }

        //password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and contain uppercase, lowercase and a number"
            });
        }

        // phone validation 
        const phoneRegex = /^[6-9][0-9]{9}$/;

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: "Please enter a valid phone number"
            });
        }

        const licenseRegex = /^[A-Za-z0-9\/-]{5,50}$/;


        // license number validation
        if (!licenseRegex.test(licenseNumber)) {
            return res.status(400).json({
                message: "Please enter a valid license number"
            });
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create user
        const seller = await Seller.create({
            name,
            email,
            password: hashPassword,
            phone,
            licenseNumber,
            shopName,
            address,
            role: "seller",
            status: "pending"
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

async function loginSeller(req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const seller = await Seller.findOne({ email });

    if (!seller) {
        return res.status(401).json({
            message: "Invalid id or password"
        })
    }
    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({
        id: seller._id,
        role: seller.role
    },
        process.env.JWT_SECRET
    );

    return res.status(200).json({
        message: "login successfull",
        token: token
    })
}

module.exports = {
    registerSeller,
    loginSeller
};