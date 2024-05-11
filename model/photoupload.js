import mongoose from "mongoose";

const userSchema3=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    caption:{
        type:String,
    },
   createdAt:{
    type:Date,
    default:Date.now
   }

})
export const photoupload=mongoose.model("photoupload",userSchema3);
