const jwt = require("jsonwebtoken");

const authUser = (req , res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                message: "Authorization token is required"
            });
        }

        const token = authHeader.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message: "Token is needed"
            });
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role !== "customer") {
            return res.status(403).json({
                message: "Access denied"
            });
        }
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authUser;