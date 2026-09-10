const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
    try {
        //read data
        console.log(req.body);

        const {
            name,
            email,
            password,
            phone,
            address,
        } = req.body;

        //validate fileds
        if (!name || !email || !password || !phone || !address) {
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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
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

        //password hashing
        const hashPassword = await bcrypt.hash(password,10);

        //create user
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            role: "customer"
        });
        return res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function loginUser(req,res){
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required"
            });
        }
        console.log(req.body);
        const user = await  User.findOne({ email });

        if(!user){
            return res.status(401).json({
                message: "Invalid id or password"
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid id or password"
            });
        }

        // console.log(process.env.JWT_SECRET);
        const token = jwt.sign({
            id: user._id,
            role: user.role
         },
         process.env.JWT_SECRET
    );
    return res.status(200).json({
        message: "User logged in successfully",
        token: token
    })
    }catch(error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

module.exports = {
    registerUser,
    loginUser
}