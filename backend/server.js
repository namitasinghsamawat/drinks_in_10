require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const sellerRoutes = require("./routes/sellerRoutes");

const adminRoutes = require("./routes/adminRoutes");

const userRoutes = require("./routes/userRoutes");

const cartRoutes = require("./routes/cartRoutes");

const orderRoutes = require("./routes/orderRoutes");

const sellerOrderRoutes = require("./routes/sellerOrderRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/products",productRoutes);
app.use("/seller",sellerRoutes);
app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.use("/cart",cartRoutes);
app.use("/order",orderRoutes);
app.use("/seller", sellerOrderRoutes);
    

app.listen(5000, () => {
    console.log("Server running on port 5000");
});