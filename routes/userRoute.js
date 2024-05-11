import express from "express";
import { signup,login,getUserDataForDashboard} from "../controller/userController.js";
import {contact} from "../controller/contactus.js"
import {jwtoken} from "../middleware/jwtMiddleware.js"
import {imageupload} from "../controller/photoupload.js"
import { upload } from "../middleware/upload.js";
const router=express.Router();

router.post("/sign-up",signup);
router.post("/login",login);
router.post("/contactus",contact);
router.get("/dashboard",getUserDataForDashboard)
router.post("/photoupload",upload, imageupload);

export default router;