import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getPosts = async () => {
    try {
        const data = await prisma.post.findMany();
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

const getPostsByAuthor = async (authorId) => {
    try {
        const data = await prisma.post.findMany({
            where: {
                authorId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

const createPost = async (authorId, title, content, media = null) => {
    try {
        const data = await prisma.post.create({
            data: {
                title,
                content,
                media,
                author: {
                    connect: {
                        id: authorId,
                    },
                },
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create post');
    }
};

export { getPosts, getPostsByAuthor, createPost };
