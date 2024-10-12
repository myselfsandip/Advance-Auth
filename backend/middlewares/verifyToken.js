import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";


export const verifyToken = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        if(!token) return res.status(400).json({success:false,msg:"Unauthorized - no token provided"});
        // JWT token verification
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({success:false,msg:"Unauthorized - invalid token"});
        // Saving userid in req
        req.userID = decoded.userID;
        next();
    } catch (error) {
        console.log("Error: ",error.message);
        res.status(400).json({success:false,msg:error.message});
    }
}