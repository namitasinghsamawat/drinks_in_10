const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const authUser = require("../middleware/authUser");

router.post("/register",registerUser);
router.post("/login",loginUser);

router.get("/profile",authUser,(req,res) => {
    return res.status(200).json({
        message: "Customer is authorized",
        user: req.user
    });
});

module.exports = router;