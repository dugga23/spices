import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "please Enter a valid Email"],
    lowercase: true,
  },
 
  password: {
    type: String,
    required: [true, "Please Enter Your Pssword"],
    minlength: [8, "Password should be greater 8 character"],
    select: false,
  },
});
userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,12);
    next();
})

export const User=mongoose.model("User",userSchema);