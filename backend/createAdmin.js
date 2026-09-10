require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Seller = require("./models/Seller");

const createAdmin = async() => {
    try{
        await connectDB();

        const existingAdmin = await Seller.findOne({
            role: "Admin"
        });

        if(existingAdmin)
        {
            console.log("admin already exists");
            process.exit();
        }
        const hashedPassword = await bcrypt.hash("Admin@123",10);

        await Seller.create({
             name: "Admin",
            email: "admin@gmail.com",
            password: hashedPassword,
            phone: "9999999999",
            licenseNumber: "ADMIN",
            licenseVerified: true,
            shopName: "Admin",
            address: "Jaipur",
            role: "admin"
        });
        
        console.log("Admin created successfully");
        process.exit();
    }catch(error)
    {
        console.log("error creating admin:",error);
        process.exit(1);
    }
};

createAdmin();