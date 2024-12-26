import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './connection/connectDB'; 
import {userRouter} from './routes/user'

const app = express();

//DBconnect
connectDB(process.env.MONGO_URL || "mongodb://localhost:27017/rootvestors");

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*", 
}));

//routes
app.use("/user",userRouter);


// Basic route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});


// Server start
const PORT = 8000;
app.listen(PORT, () => console.log(`Server connected to port ${PORT}`));