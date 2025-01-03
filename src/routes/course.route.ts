import { createChapter, createCourse, createSection, getChapter, getCourseDetails, getSection } from "../controllers/course.controller";
import express from "express"

const courseRouter = express.Router();

//Course related routes
courseRouter.post("/", createCourse);
courseRouter.get("/:courseId", getCourseDetails);

//Chapter related routes
courseRouter.post("/:courseId/chapters", createChapter);
courseRouter.get("/:courseId/chapters/:chapterId", getChapter);

//Sections related routed
courseRouter.post("/:courseId/chapters/:chapterId/sections", createSection);
courseRouter.get("/:courseId/chapters/:chapterId/sections", getSection);

export {
    courseRouter
}