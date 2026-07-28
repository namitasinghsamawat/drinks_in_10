require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use("/products",productRoutes);



app.listen(5000, () => {
    console.log("Server running on port 5000");
});