import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import "dotenv/config";

const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers["authorization"];
    const token = tokenHeader && tokenHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token as string, process.env.SECRET as string, (err, decoded) => {
        if (err) return res.status(401).end();
        next();
    });
}

export default verifyTokenMiddleware;