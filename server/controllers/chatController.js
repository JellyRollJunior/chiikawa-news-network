import { validateInput } from '../middleware/validations.js';
import {
    formatChat,
    reorderChatsWithLatestMessageToFront,
} from '../services/formatChats.js';
import { isUserAuthorizedForChat } from '../services/chat.services.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import * as chatQueries from '../db/chat.queries.js';
import * as messageQueries from '../db/message.queries.js';

const getChats = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const chats = await chatQueries.getChats(userId);
        if (!chats) throw new DatabaseError('Unable to retrieve chats', 404);
        const orderedChats = reorderChatsWithLatestMessageToFront(chats);
        const formattedChats = orderedChats.map((chat) =>
            formatChat(chat, userId)
        );
        res.json({ chats: formattedChats });
    } catch (error) {
        next(error);
    }
};

const getChat = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const userId = req.user.id;
        const chat = await messageQueries.getChatMessages(chatId);
        if (!chat) throw new DatabaseError('Unable to retrieve chat', 404);
        if (!isUserAuthorizedForChat(chat, userId)) {
            throw new AuthorizationError('Unable to retrieve chat');
        }
        const formattedChat = formatChat(chat, userId);
        res.json(formattedChat);
    } catch (error) {
        next(error);
    }
};

const createChat = async (req, res, next) => {
    try {
        validateInput(req);
        const userIdArray = [...req.body.userIds, req.user.id];
        // if chat exists, return existing chat
        const existingChat = await chatQueries.getChatBySignature(userIdArray);
        if (existingChat) return res.json(existingChat);
        const name = req.body.name ? req.body.name : null;
        const chat = await chatQueries.createChat(name, userIdArray);
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const updateChatName = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const name = req.body.name ? req.body.name : null;
        const chat = await chatQueries.updateChatName(
            chatId,
            name,
            req.user.id
        );
        res.json(chat);
    } catch (error) {
        next(error);
    }
};

const deleteChat = async (req, res, next) => {
    try {
        validateInput(req);
        const { chatId } = req.params;
        const chat = await messageQueries.getChatMessages(chatId);
        if (!chat) throw new DatabaseError('Unable to delete chat', 404);
        if (!isUserAuthorizedForChat(chat, req.user.id)) {
            throw new AuthorizationError('Unable to delete chat');
        }
        const data = await chatQueries.deleteChat(chatId);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export { getChats, getChat, createChat, updateChatName, deleteChat };
