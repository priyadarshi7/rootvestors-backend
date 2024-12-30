import mongoose, { Schema } from "mongoose";

export interface ISection extends Document {
    title: string;
    desc: string;
    videoUrl: string;
    summary: string[];
}

const sectionSchema: Schema<ISection> = new Schema({
    title: { type: String, required: true },
    desc: { type: String },
    videoUrl: { type: String },
    summary: [{ type: String }],
  });
  
export const Section = mongoose.model<ISection>("Section", sectionSchema);