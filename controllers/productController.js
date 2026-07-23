function getProducts(req,res)
{
    res.send("products from controller");
}
function addProducts(req,res)
{
    console.log(req.body);
    res.send("product added successfully");
}
module.exports={
    getProducts,
    addProducts,
};