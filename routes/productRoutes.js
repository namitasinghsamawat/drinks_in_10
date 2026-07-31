const express = require("express");
const router = express.Router();

const { getProducts, addProducts , getProductById , updateProductById , deleteProductById} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProducts);
router.get("/:id",getProductById);
router.post("/:id",updateProductById);
router.delete("/:id",deleteProductById);

module.exports = router;