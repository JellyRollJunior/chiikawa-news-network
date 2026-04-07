import { Router } from 'express';
import { authenticateToken } from '../../shared/middleware/handleVerifyToken.js';
import {
    chatValidations,
    chatIdValidations,
    chatNameValidations,
} from '../../shared/middleware/validations.js';
import * as chatController from './chat.controller.js';

const chatRouter = Router();

/* /chats */
chatRouter.get('/', authenticateToken, chatController.getChats);
chatRouter.post(
    '/',
    authenticateToken,
    chatValidations,
    chatNameValidations,
    chatController.createChat
);

/* /chats/:chatId */
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

/* /chats/:chatId/messages */
chatRouter.get(
    '/:chatId/messages',
    authenticateToken,
    chatIdValidations,
    chatController.getChatMessages
)

export { chatRouter };
