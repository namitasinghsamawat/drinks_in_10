const express = require("express");
const router = express.Router();

const { getProducts, addProducts , getProductById , updateProductById} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", addProducts);
router.get("/:id",getProductById);
router.post("/:id",updateProductById);

module.exports = router;