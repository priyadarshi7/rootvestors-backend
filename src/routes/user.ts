import { handleUserSignUp } from "../controllers/user";
import express from "express"

const userRouter = express.Router();

//signup
userRouter.post("/signup",handleUserSignUp);

export {userRouter}