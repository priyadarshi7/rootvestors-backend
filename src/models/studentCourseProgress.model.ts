import mongoose, { Schema, Document, Types, Model } from "mongoose";

// Interface for TestResult
export interface ITestResult {
    assessmentId: Types.ObjectId; // Reference to Assessment
    questionResults: Map<string, boolean>; // Question ID -> Is Correct
}

// Interface for ChapterProgress
export interface IChapterProgress {
    points: number; // Points earned in the chapter
    testResult: ITestResult; // Test result for the chapter
}

// Interface for StudentCourseProgress
export interface IStudentCourseProgress extends Document {
    studentId: Types.ObjectId; // Reference to Student
    courseId: Types.ObjectId; // Reference to Course
    totalPoints: number; // Total points earned in the course
    chapterProgress: Map<string, IChapterProgress>; // Chapter ID -> Chapter Progress
}

// Schema for TestResult
const testResultSchema: Schema<ITestResult> = new Schema({
    assessmentId: { type: Schema.Types.ObjectId, ref: "Assessment", required: true },
    questionResults: { type: Map, of: Boolean, required: true },
});

// Schema for ChapterProgress
const chapterProgressSchema: Schema<IChapterProgress> = new Schema({
    points: { type: Number, required: true },
    testResult: { type: testResultSchema, required: true },
});

// Schema for StudentCourseProgress
const studentCourseProgressSchema: Schema<IStudentCourseProgress> = new Schema({
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    totalPoints: { type: Number, required: true },
    chapterProgress: {
        type: Map,
        of: chapterProgressSchema,
        required: true,
    },
});

// Create the model
export const StudentCourseProgress: Model<IStudentCourseProgress> = mongoose.model<IStudentCourseProgress>(
    "StudentCourseProgress",
    studentCourseProgressSchema
);
