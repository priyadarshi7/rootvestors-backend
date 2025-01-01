import mongoose from 'mongoose';

async function connectDB(url: string){
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        throw error;  
    }
}

export { connectDB };
