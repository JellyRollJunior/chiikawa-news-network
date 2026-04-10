import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import {
    CHATS_SELECT,
    CHAT_META_DATA_SELECT,
    CHAT_MESSAGES_SELECT,
    MESSAGE_SELECT,
} from './chats.select.js';
import { DatabaseError } from '../../shared/errors/DatabaseError.js';
import dotenv from 'dotenv'
dotenv.config();

const prisma = new PrismaClient();

/* Chats */
const getChats = async (userId) => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                },
            },
            select: CHATS_SELECT,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chats');
    }
};

/* Chat */
const createChat = async (name, userIdArray) => {
    try {
        const sortedIds = userIdArray.sort();
        const signature = sortedIds.join(':');
        const userIdObjectArray = sortedIds.map((id) => ({ id }));
        const type =
            userIdArray.length > 2 ? CHAT_TYPE.GROUP : CHAT_TYPE.PRIVATE;
        // if groupchat, set default group chat avatar
        const avatar =
            userIdArray.length > 2
                ? process.env.SUPABASE_DEFAULT_GROUP_CHAT_AVATAR
                : null;
        const chat = await prisma.chat.create({
            data: {
                name,
                type,
                avatar,
                signature,
                users: {
                    connect: userIdObjectArray,
                },
            },
            select: CHATS_SELECT,
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

const getChatBySignature = async (userIdArray) => {
    try {
        if (!userIdArray || !Array.isArray(userIdArray)) return null;
        const signature = userIdArray.sort().join(':');
        const chat = await prisma.chat.findFirst({
            where: {
                signature,
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

const getChatMetadata = async (chatId) => {
    try {
        const data = await prisma.chat.findFirst({
            where: {
                id: chatId,
            },
            select: CHAT_META_DATA_SELECT,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chat meta data');
    }
};

const updateChatName = async (chatId, name, userId) => {
    try {
        const chat = await prisma.chat.update({
            where: {
                id: chatId,
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            data: {
                name,
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to update chat');
    }
};

const deleteChat = async (chatId) => {
    try {
        const data = await prisma.chat.delete({
            where: {
                id: chatId,
            },
            select: CHATS_SELECT,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete chat');
    }
};

/* Chat Messages */
const createChatMessage = async (chatId, senderId, content) => {
    try {
        const message = await prisma.message.create({
            data: {
                chatId,
                senderId,
                content,
                latestMessage: {
                    connect: {
                        id: chatId,
                    },
                },
            },
            select: MESSAGE_SELECT,
        });
        return message;
    } catch (error) {
        throw new DatabaseError('Unable to create message');
    }
};

const getChatMessages = async (chatId) => {
    try {
        const data = await prisma.chat.findFirst({
            where: {
                id: chatId,
            },
            select: CHAT_MESSAGES_SELECT,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve chat messages');
    }
};

export {
    getChats,
    getChatBySignature,
    createChat,
    getChatMetadata,
    updateChatName,
    deleteChat,
    createChatMessage,
    getChatMessages,
};
