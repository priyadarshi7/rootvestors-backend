import jwt from "jsonwebtoken"

//Generate Token
async function generateToken(id: string): Promise<string> {
    const jwtsecret = process.env.JWT_SECRET;

    if (!jwtsecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ id }, jwtsecret, {
        expiresIn: "7d",
    });

    return token;
}

//Verify Token
async function verifyToken(token: string): Promise<any> {
    const jwtsecret = process.env.JWT_SECRET;

    if (!jwtsecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    try {
        const payload = jwt.verify(token, jwtsecret);  
        return payload;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token");
        }
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired");
        }
        throw new Error("Token verification failed");
    }
}

export {
    generateToken,
    verifyToken
}