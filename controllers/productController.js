const Product = require("../models/Product");

async function getProducts(req, res) {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully",
            count: products.length,
            products
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function addProducts(req, res) {
    try{
    console.log(req.body);
    const product = req.body;

    if (!product.name) {
        return res.status(400).send("Product name is required");
    }

    if (product.price<=0) {
        return res.status(400).send("Product price must be greater than 0 ");
    }

    if (product.stock<0) {
        return res.status(400).send("Product stock is required");
    }

    if (!product.category) {
        return res.status(400).send("Product category is required");
    }

    if (!product.brand) {
        return res.status(400).send("Product brand is required");
    }

    if (!product.volume) {
        return res.status(400).send("Product volume is required");
    }
   const savedProduct = await Product.create(product);

    res.status(201).json({
        message:"product added successfully",
        product: savedProduct
});
    }catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports = {
    getProducts,
    addProducts,
};