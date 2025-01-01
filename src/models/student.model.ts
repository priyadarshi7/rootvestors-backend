import mongoose, {Schema, Document, Model} from "mongoose";

export interface IStudent extends Document {
    name: string;
    email: string;
    password: string;
    enrolledCourses: mongoose.Types.ObjectId[]; // Array of Course IDs
}

const studentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export const Student = mongoose.model<IStudent>("Student", studentSchema);
