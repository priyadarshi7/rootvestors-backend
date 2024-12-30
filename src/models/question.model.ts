import mongoose, { Schema } from "mongoose";

export interface IQuestion extends Document {
    type: string; // Quiz, CaseStudy, Subjective
  }
  
  const questionSchema: Schema<IQuestion> = new Schema({
    type: { type: String, required: true },
  });
  
  // Quiz Question
  export interface IQuiz extends IQuestion {
    statement: string;
    options: string[];
    answer: number;
    explanation: string;
  }
  
  const quizSchema: Schema<IQuiz> = new Schema({
    statement: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: Number, required: true },
    explanation: { type: String },
  });
  
  // Subjective Question
  export interface ISubjectiveQuestion extends IQuestion {
    statement: string;
  }
  
  const subjectiveQuestionSchema: Schema<ISubjectiveQuestion> = new Schema({
    statement: { type: String, required: true },
  });
  
  // Case Study Question
  export interface ICaseStudy extends IQuestion {
    story: string;
    questions: mongoose.Types.ObjectId[]; // Sub-questions
  }
  
  const caseStudySchema: Schema<ICaseStudy> = new Schema({
    story: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  });
  
  export const Quiz = mongoose.model<IQuiz>("Quiz", quizSchema);
  export const SubjectiveQuestion = mongoose.model<ISubjectiveQuestion>(
    "SubjectiveQuestion",
    subjectiveQuestionSchema
  );
  export const CaseStudy = mongoose.model<ICaseStudy>("CaseStudy", caseStudySchema);
  