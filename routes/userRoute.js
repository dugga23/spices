import express from "express";
import { signup,login,getUserDataForDashboard,forgotpassword} from "../controller/userController.js";
import {contact} from "../controller/contactus.js"
import {jwtoken} from "../middleware/jwtMiddleware.js"
import {imageupload,deletePhoto,updateCaption} from "../controller/photoupload.js"
import { upload } from "../middleware/upload.js";
import { getproductDashboard } from "../controller/productDashboard.js";
import { generateotp, verifyotp } from "../controller/otp.js";

const router=express.Router();

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/contactus",contact);
router.get("/dashboard",jwtoken ,getUserDataForDashboard)
router.get("/productdashboard",jwtoken,getproductDashboard);
router.post("/otp", generateotp);
router.post("/verifyotp", verifyotp);
router.put("/forgotpassword/:userId",forgotpassword);
router.post("/photoupload", upload, imageupload);
router.delete("/photos/:photoId", deletePhoto);
router.put('/photos/:photoId', updateCaption);
export default router;
