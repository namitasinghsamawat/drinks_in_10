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

async function loginSeller(req,res)
{
    const { email , password } = req.body;
    console.log(req.body);
    const seller = await Seller.findOne({email});

    if(!seller)
    {
        return res.status(401).json({
            message: "Invalid id or password"
        })
    }
    const isMatch = await bcrypt.compare(password,seller.password);
    
    if(!isMatch)
    {
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