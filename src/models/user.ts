import mongoose from "mongoose";

//Schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
        select:false,
    },
    // salt:{
    //     type:String,
    //     select:false,
    // },
    // sessionToken:{
    //     type:String,
    //     select:false,
    // }
},{timestamps:true});

//model
export const UserModel = mongoose.model("user",UserSchema);