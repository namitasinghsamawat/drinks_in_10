function getProducts(req, res) {
    res.send("products from controller");
}
function addProducts(req, res) {
    const product = req.body;

    if (!product.name) {
        return res.status(400).send("Product name is required");
    }

    if (!product.price<=0) {
        return res.status(400).send("Product price must be greater than 0 ");
    }

    if (!product.stock<0) {
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
    addProducts.push(product);

    res.status(201).send("product addded successfully");
}
module.exports = {
    getProducts,
    addProducts,
};