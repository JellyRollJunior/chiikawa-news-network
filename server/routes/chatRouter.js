import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import {
    chatValidations,
    chatIdValidations,
    chatNameValidations,
} from '../middleware/validations.js';
import * as chatController from '../controllers/chatController.js';

const chatRouter = Router();

chatRouter.get('/', authenticateToken, chatController.getChats);
chatRouter.post(
    '/',
    authenticateToken,
    chatValidations,
    chatNameValidations,
    chatController.createChat
);
chatRouter.get(
    '/:chatId',
    authenticateToken,
    chatIdValidations,
    chatController.getChat
);
chatRouter.patch(
    '/:chatId',
    authenticateToken,
    chatIdValidations,
    chatNameValidations,
    chatController.updateChatName
);
chatRouter.delete(
    '/:chatId',
    authenticateToken,
    chatIdValidations,
    chatController.deleteChat
);

export { chatRouter };
