function checkSeller(req,res,next)
{
    const isVerified=true;
    if(!isVerified)
    {
        return res.status(403).send("seller not verified");
    }
    next();
}
 module.exports=checkSeller;
