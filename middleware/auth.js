// import { User } from "../model/userModel.js";
// import jwt from "jsonwebtoken";

// export const isAuthenticatedUser=async(req,res,next)=>{
    
//     const { token }=req.cookies;
//     if(!token){
//         return res.status(404).json({message: "please login to access this resource"});
//     }
//     const decoded=jwt.verify(token,process.env.JWT_SECRET);
//     req.user=await User.findById(decoded._id);
//     next();
// }