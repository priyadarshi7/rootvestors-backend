import mongoose, {Schema, Document, Model} from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    enrolledCourses: mongoose.Types.ObjectId[]; // Array of Course IDs
}

//Schema
const UserSchema: Schema = new mongoose.Schema({
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
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
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
export const UserModel = mongoose.model<IUser>("user",UserSchema);