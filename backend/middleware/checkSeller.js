const Seller = require("../models/Seller");

const checkSeller = async(req,res,next) => {
    try{
        const seller = await Seller.findById(req.user.id);

        if(!seller)
        {
            return res.status(404).json({
                message: "Seller not found"
            });
        }
        if(seller.status!== "approved"){
            return res.status(403).json({
                message: "Seller not approved"
            });
        }
        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = checkSeller;