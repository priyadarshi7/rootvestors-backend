import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../service/auth';  // Import the verifyToken function

const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Extract the token from the cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Verify the token
        const decodedPayload = await verifyToken(token);

        // Attach user data (or token data) to request object for further use in the app
        req.user = decodedPayload;

        // Proceed to the next middleware or route handler
        next();
    } catch (error:any) {
        console.error("Token verification failed:", error.message);
        return res.status(401).json({ message: error.message });
    }
};

export default {
    authenticateUser
    }
