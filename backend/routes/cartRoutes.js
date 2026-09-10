const express = require("express");

const router = express.Router();

const  { addToCart, getCart, updateCart, removeFromCart } = require("../controllers/cartController");
const authUser = require("../middleware/authUser");

router.post("/add",authUser,addToCart);
router.get("/",authUser,getCart);
router.put("/update",authUser,updateCart);
router.delete("/remove",authUser,removeFromCart);

module.exports = router;