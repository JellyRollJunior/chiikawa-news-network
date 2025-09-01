import { PrismaClient } from '@prisma/client';
import {
    CHAT_MESSAGES_SELECT,
    MESSAGE_SELECT,
} from './selects/message.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

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
        throw new DatabaseError('Unable to retrieve chat');
    }
};

const createMessage = async (chatId, senderId, content) => {
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

export { getChatMessages, createMessage };
