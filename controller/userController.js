import { User } from "../model/userModel.js";
import { contactus } from "../model/contactUs.js"
import bcrypt from "bcrypt";
import {generateToken,verifyToken} from "../controller/jwtController.js"

export const signup = async (req, res, next) => {
  try {
    const {email, password } =
      req.body;
    console.log(email, password);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "User already exist",
        sucess: false,
      });
    }
    user = await User.create({
     
      email,
      password,
    });
    return res.status(200).send({
      message: `successful signup`,
      success: true,
    });
    
  } catch (error) {
    return res.status(500).send({
      message: `InternalServer error:${error}`,
      success: false,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).send({
        message: "User not found:${error}",
        success: "true",
      });
    }

    if (!password) {
        return res.status(400).send({
          message: "Password is required",
          success: false,
        });
      }
  
      // Check if user.password is defined and not null
      if (!user.password) {
        return res.status(500).send({
          message: "User password is missing",
          success: false,
        });
      }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Your email or password is wrong",
        success: false,
      });
    }
    user.password = "";
   
    const token=generateToken({
        username:user.username

    });
    console.log("login Successful",token);
    res.status(200).json({
        message:"Login Succesfullll",
        token
    })


  } catch (err) {
    console.log("Error", err);
    return res.status(501).json({
      success: "false",
      message: "Internal Server",
    });
  }
};



export const getUserDataForDashboard = async (req, res, next) => {
  try {
    // Query the database for users with specific fields (name, email, domainname)
    const users = await contactus.find({}, { name: 1, email: 1, contactno: 1,message:1 });

    // Extract the required fields from each user and create a simplified data structure
    const userData = users.map(user => ({
      name: user.name,
      email: user.email,
      contactno: user.contactno,
      message:user.message
    }));

    // Send the user data for the dashboard as a response
    return res.status(200).json({
      success: true,
      data: userData
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


















