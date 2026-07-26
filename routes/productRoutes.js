const express = require("express");
const router = express.Router();
const productController=require("../controllers/productController");
const checkSeller=require("../middleware/checkSeller");

router.get("/",productController.getProducts);
router.post("/",checkSeller,productController.addProducts);
module.exports = router;