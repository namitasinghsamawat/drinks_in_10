const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getProducts, addProducts , getProductById , updateProductById , deleteProductById} = require("../controllers/productController");
const checkSeller = require("../middleware/checkSeller");

router.get("/", getProducts);
router.post("/add-product", authMiddleware, checkSeller, addProducts);
router.get("/:id",getProductById);
router.post("/:id",updateProductById);
router.delete("/:id",deleteProductById);

module.exports = router;