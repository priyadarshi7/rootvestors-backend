import mongoose, {Model, Schema, Document} from "mongoose";

export interface IChapter extends Document {
   _id: mongoose.Types.ObjectId;
    title: string;
    desc: string;
    sections: mongoose.Types.ObjectId[]; // Array of Section IDs
    assessment: mongoose.Types.ObjectId; // Single Assessment ID
}

const chapterSchema: Schema<IChapter> = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment" },
  });
  
export const Chapter = mongoose.model<IChapter>("Chapter", chapterSchema);