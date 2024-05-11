import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

const secretKey = process.env.secret_key;

export const generateToken = (userId) => {
    const payload = {
        userId: userId
        // Add other user-related data if needed
    };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
    // Token expires in 1 hour
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (error) {
        return null; // Token verification failed
    }
};