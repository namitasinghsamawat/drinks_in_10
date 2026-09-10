const Seller = require("../models/Seller");

const getPendingSellers = async(req,res) => {
    try{
        const sellers = await Seller.find({
            role: "seller",
            status: "pending"
        });
        return res.status(200).json({
            message: "Pending seller fetched successfully",
            sellers
        });
    }catch(error)
    {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const approveSeller = async (req,res) =>{
    try{
        const seller = await Seller.findById(req.params.id);

        if(!seller){
            return res.status(404).json({
                message: "Seller not found"
            });
        }

        seller.licenseVerified = true;
        seller.status = "approved";

        await seller.save();

        return res.status(200).json({
            message: "Seller approved successfully",
            seller
        });
    }catch(error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const rejectSeller = async (req,res) => {
    try{
        const { reason } = req.body;

        if(!reason){
            return res.status(400).json({
                message: "Rejection reason is required"
            });
        }
        const seller = await Seller.findById(req.params.id);

        if(!seller){
            return res.status(404).json({
                message: "Seller not found"
            });
        }
        seller.status = "rejected";
        seller.licenseVerified = false;
        seller.rejectionReason = reason;

        await seller.save();

        return res.status(200).json({
            message: "Seller rejected successfully",
            seller
        });
    }catch(error){
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getPendingSellers ,
    approveSeller ,
    rejectSeller
};