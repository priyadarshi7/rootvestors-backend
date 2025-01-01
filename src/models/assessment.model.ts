import mongoose, { Schema } from "mongoose";

export interface IAssessment extends Document {
    questions: mongoose.Types.ObjectId[]; // Array of Question IDs
    strategy: string; // Scoring strategy
    rewards: string[];
    totalTime: number;
  }
  
  const assessmentSchema: Schema<IAssessment> = new Schema({
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    strategy: { type: String, required: true },
    rewards: [{ type: String }],
    totalTime: { type: Number, required: true },
  });
  
export const Assessment = mongoose.model<IAssessment>("Assessment", assessmentSchema);
  