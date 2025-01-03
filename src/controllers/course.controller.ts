/* TODO: Course Management Flow: @Priyadarshi
    create methods for 
    1. getCourseDetails(course id) -> all details of a course
    2. getChapter(course id) -> list of all chapters in a course
    3. getSection(course id, chapter id) -> list of all sections in a chapter

*/

import { Request, Response } from "express";
import { Course } from "../models/course.model";
import { Chapter } from "../models/chapter.model";
import { Section } from "../models/section.model";

//1.Get Course Details using CourseId 
async function getCourseDetails(req:Request, res:Response): Promise<void>{
    try{
        const {courseId} = req.params;
        const course = await Course.findById(courseId).populate("chapters");
        if(!course){
            res.status(404).json({message:"Course not found"});
            return;
        }

        res.status(200).json(course);

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//2.Get the list of all the Chapters in a Course using CourseId
async function getChapter(req:Request, res:Response): Promise<void>{
    try{
        const {courseId, chapterId} = req.params;
        const course = await Course.findById(courseId).populate("chapters");
        const chapter = await Chapter.findById(chapterId).populate("sections");
        
        if(!course){
            res.status(404).json({message:"Course not found"})
            return;
        }

        if(!chapter){
            res.status(404).json({message:"Course not found"})
            return;
        }

        res.status(200).json(chapter);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//3.Get the list of sections in a chapter of the respective course using chapterId and CourseId
async function getSection(req: Request, res: Response): Promise<void> {
    try {
        const { courseId, chapterId } = req.params;

        // const course = await Course.findById(courseId).populate({
        //     path: "chapters",
        //     match: { _id: chapterId },
        //     populate: { path: "sections" },
        // });

        // if (!course || !course.chapters.length) {
        //     res.status(404).json({ message: "Chapter not found in this course" });
        //     return;
        // }

        // const chapter = course.chapters[0];
        // console.log(chapter.sections);

        const chapter = await Chapter.findById(chapterId).populate("sections");

        if(!chapter){
            res.status(404).json({ message: "Chapter not found in this course" });
            return; 
        }

        res.status(200).json(chapter.sections);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//POST
//1.Create Course
async function createCourse(req:Request, res:Response):Promise<void>{
    try{
        const {title, desc, educator} = req.body;
        if(!title || !desc || !educator){
            res.status(404).json({message: "Fill the required fields"});
            return;
        }

        const newCourse = new Course({
            title,
            desc,
            educator,
            chapters: [],
        });
        await newCourse.save();
        res.status(200).json({message:"Course created successfully", course: newCourse});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}


//2.Create Chapters for Course
async function createChapter(req:Request, res: Response): Promise<void>{
    try{
        const {courseId} = req.params;
        const {title, desc} = req.body;

        if(!title || !desc){
            res.status(404).json({message:"Fill the required fields"});
            return;
        }

        const course = await Course.findById(courseId);
        if(!course){
            res.status(404).json({message:"Course not found"});
            return;
        }
        const newChapter = new Chapter({
            title,
            desc,
            sections:[],
            assignment: null,
        });
        await newChapter.save();

        course.chapters.push(newChapter._id);
        await course.save();

        res.status(201).json({message:"Chapter created successfully", chapter: newChapter});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

//3.Create Sections for chapters
async function createSection(req:Request, res:Response): Promise<void>{
    try{
        const {chapterId} = req.params;
        const {title, desc, videoUrl, summary} = req.body;

        if(!title || !videoUrl){
            res.status(404).json({message:"Fill the required fields"});
            return;
        }

        const chapter = await Chapter.findById(chapterId);
        
        if(!chapter){
            res.status(404).json({message:"Chapter not found"});
            return;
        }

        const newSection = new Section({
            title,
            desc,
            videoUrl,
            summary,
        });
        await newSection.save();

        chapter.sections.push(newSection._id);
        await chapter.save();

        res.status(201).json({message:"New section created", section: newSection});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export {
    getChapter,
    getCourseDetails,
    getSection,
    createChapter,
    createCourse,
    createSection
}