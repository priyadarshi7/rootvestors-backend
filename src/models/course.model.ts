import mongoose, {Model, Schema} from "mongoose";

export interface ICourse extends Document {
    title: string;
    desc: string;
    educator: string;
    chapters: mongoose.Types.ObjectId[]; // Array of Chapter IDs
}

const courseSchema: Schema<ICourse> = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    educator: { type: String, required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
  });
  
export const Course = mongoose.model<ICourse>("Course", courseSchema);