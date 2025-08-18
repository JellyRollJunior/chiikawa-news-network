import dotenv from 'dotenv';
import { PrismaClient, CHAT_TYPE } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';
import { CHATS_INCLUDE, USERS_INCLUDE } from './returnDataPresets.js';
dotenv.config();

const prisma = new PrismaClient();

const getPublicChats = async () => {
    try {
        const data = await prisma.chat.findMany({
            where: {
                type: CHAT_TYPE.PUBLIC,
            },
            include: CHATS_INCLUDE,
            orderBy: {
                latestMessage: {
                    sendTime: 'desc',
                },
            },
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
            include: {
                users: {
                    include: USERS_INCLUDE,
                },
            },
        });
        return chat;
    } catch (error) {
        throw new DatabaseError('Unable to create chat');
    }
};

export { getPublicChats, createPublicChat };
