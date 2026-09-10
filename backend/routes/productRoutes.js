const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getProducts, getMyProducts, addProducts , getProductById , updateProductById , deleteProductById} = require("../controllers/productController");
const checkSeller = require("../middleware/checkSeller");

router.get("/", getProducts);
router.get("/my-products", authMiddleware, checkSeller, getMyProducts);
router.post("/add-product", authMiddleware, checkSeller, addProducts);
router.get("/:id", getProductById);
router.post("/:id",authMiddleware, checkSeller, updateProductById);
router.delete("/:id",authMiddleware, checkSeller, deleteProductById);

module.exports = router;