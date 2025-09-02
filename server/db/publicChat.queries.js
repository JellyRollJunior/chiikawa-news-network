import dotenv from 'dotenv';
import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import { CHATS_SELECT } from './selects/chats.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';
dotenv.config();

const prisma = new PrismaClient();

const getPublicChats = async () => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                type: CHAT_TYPE.PUBLIC,
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

const createPublicChat = async (name) => {
    try {
        const chat = await prisma.chat.create({
            data: {
                name,
                type: CHAT_TYPE.PUBLIC,
                avatar: process.env.SUPABASE_DEFAULT_GROUP_CHAT_AVATAR,
            },
            select: CHATS_SELECT,
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

export { getPublicChats, createPublicChat };
