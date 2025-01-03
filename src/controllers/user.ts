import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user';  
import jwt from "jsonwebtoken"

import { generateToken } from '../service/auth';

//Signup
async function handleUserSignUp(req: Request, res: Response): Promise<void> {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            res.status(400).json({ message: "Please add all fields" });
            return;
        }

        // Check if the user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            const token = await generateToken(user._id.toString());

            //cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            //signup successful
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token,
            });
        } else {
            res.status(400).json({ message: "Signup unsuccessful" });
        }
    } catch (error) {
        console.error("Error during user signup:", error);
        res.status(500).json({ message: "Server error" });
    }
}

//Login
async function handleUserLogin(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: "Please provide both email and password" });
            return;
        }

        // Check if the user exists
        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        // Validate password
        const validatePassword = await bcrypt.compare(password, user?.password);

        if (validatePassword) {
            const token = await generateToken(user._id.toString());

            //cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            // Successfully logged in
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token,
            });
        } else {
            // Invalid password
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export {
    handleUserSignUp,
    handleUserLogin,
};
