import { User } from "../model/userModel.js";
import { contactus } from "../model/contactUs.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../controller/jwtController.js";
import { v4 as uuidv4 } from "uuid";

// Generate a version 4 UUID
const uuid = uuidv4();

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const uuid = uuidv4();
    console.log(email, password);
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "User already exist",
        sucess: false,
      });
    }
    user = await User.create({
      _id: uuid,
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

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      // User not found
      return res
        .status(404)
        .json({ message: "Invalid email or password", success: false });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Passwords don't match
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // Password is correct, generate JWT token
    const token = generateToken({ email: user.email });

    // Send token in response
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle internal server error
    console.error("Error logging in:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getUserDataForDashboard = async (req, res, next) => {
  try {
    // Query the database for users with specific fields (name, email, domainname)
    const users = await contactus.find(
      {},
      { name: 1, email: 1, contactno: 1, message: 1 }
    );

    // Extract the required fields from each user and create a simplified data structure
    const userData = users.map((user) => ({
      name: user.name,
      email: user.email,
      contactno: user.contactno,
      message: user.message,
    }));

    // Send the user data for the dashboard as a response
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const forgotpassword = async (req, res) => {
  const userId = req.params.userId; // Use req.params.userId instead of req.params._id
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;
  console.log(newPassword);
  console.log(confirmPassword);

  // Validate input
  if (!newPassword || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "New password and confirm password do not match" });
  }

  try {
    // Fetch user from database
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    }); // Use findById to find user by ID
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

   

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
