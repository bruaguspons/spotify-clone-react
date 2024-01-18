import { type Response, type Request, type NextFunction } from 'express';
import jwt, { type VerifyCallback } from 'jsonwebtoken';
import { type UserToken } from '@/types';

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserToken
    }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined || authHeader === '') {
        res.sendStatus(401); // No Authorization header present
        return;
    }
    const token = authHeader?.split(' ')[1];

    if (token === undefined || token === '') {
        res.sendStatus(401); // No token found in Authorization header
        return;
    }

    const callbackFun: VerifyCallback = (error, decoded) => {
        if (error !== null || decoded === undefined) {
            res.sendStatus(403);
            return;
        }

        if (typeof decoded === 'string') {
            // something
        } else if ('payload' in decoded) {
            req.user = decoded.payload as UserToken;
        } else {
            req.user = decoded as UserToken;
        }

        next();
    };
    jwt.verify(token, process.env.SECRET_KEY ?? 'SECRET_KEY', { complete: true }, callbackFun);
};

export default authenticateToken;
