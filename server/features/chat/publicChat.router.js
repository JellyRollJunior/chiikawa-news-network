import { Router } from 'express';
import { authenticateToken } from '#shared/middleware/handleVerifyToken.js';
import * as publicChatController from '#features/chat/publicChat.controller.js';

const publicChatRouter = new Router();

publicChatRouter.get(
    '/',
    authenticateToken,
    publicChatController.getPublicChats
);

export { publicChatRouter };
