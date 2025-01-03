import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

import { connectDB } from './connection/connectDB'; 
import {userRouter} from './routes/user'
import { courseRouter } from './routes/course.route';

const app = express();

//DBconnect
connectDB(process.env.MONGO_URL || "mongodb://localhost:27017/rootvestors");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*", 
}));

//routes
app.use("/user",userRouter);
app.use("/courses", courseRouter)


// Basic route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});


// Server start
const PORT = 8000;
app.listen(PORT, () => console.log(`Server connected to port ${PORT}`));