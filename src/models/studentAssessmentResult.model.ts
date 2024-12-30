import mongoose, { Schema } from "mongoose";

export interface IStudentAssessmentResult extends Document {
    studentId: mongoose.Types.ObjectId; // Student ID
    assessmentId: mongoose.Types.ObjectId; // Assessment ID
    scores: Map<string, number>; // Map of questionId -> score
    answers: Map<string, any>; // Map of questionId -> studentAnswer
    totalPoints: number; // Total score for the assessment
    timeTaken: number; // Time taken to complete the assessment
  }
  
  const studentAssessmentResultSchema: Schema<IStudentAssessmentResult> = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true },
    scores: { type: Map, of: Number, default: {} },
    answers: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    totalPoints: { type: Number, default: 0 },
    timeTaken: { type: Number, default: 0 },
  });
  
  export const StudentAssessmentResult = mongoose.model<IStudentAssessmentResult>(
    "StudentAssessmentResult",
    studentAssessmentResultSchema
  );
  