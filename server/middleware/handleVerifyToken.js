import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AuthenticationError } from '../errors/AuthenticationError.js';
dotenv.config();

const handleVerifyToken = (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new AuthenticationError());
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        socket.data.user = data; // attach user info to socket
        next();
    } catch (error) {
        console.log('JWT Error: ', error);
        return next(new AuthenticationError());
    }
};

const expressRetrieveToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        next(new AuthenticationError());
    }
};

const expressVerifyToken = (req, res, next) => {
    try {
        if (!req.token) throw new Error();
        const data = jwt.verify(req.token, process.env.TOKEN_SECRET);
        req.user = data;
        next();
    } catch {
        next(new AuthenticationError());
    }
};

const authenticateToken = [expressRetrieveToken, expressVerifyToken]

export { handleVerifyToken, authenticateToken };
