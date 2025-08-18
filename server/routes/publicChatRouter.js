import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as publicChatController from '../controllers/publicChatController.js';

const publicChatRouter = new Router();

publicChatRouter.get(
    '/',
    authenticateToken,
    publicChatController.getPublicChats
);

export { publicChatRouter };
