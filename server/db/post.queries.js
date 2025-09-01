import { PrismaClient } from '@prisma/client';
import { postSelect } from './selects/post.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getPosts = async (requesterId) => {
    try {
        const data = await prisma.post.findMany({
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

const getPostsByAuthor = async (requesterId, authorId) => {
    try {
        const data = await prisma.post.findMany({
            where: {
                authorId,
            },
            select: postSelect(requesterId),
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
            select: postSelect(authorId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create post');
    }
};

const likePost = async (postId, likerId) => {
    try {
        const data = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likers: {
                    connect: {
                        id: likerId,
                    },
                },
            },
            select: postSelect(likerId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to like post');
    }
};

const unlikePost = async (postId, likerId) => {
    try {
        const data = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likers: {
                    disconnect: {
                        id: likerId,
                    },
                },
            },
            select: postSelect(likerId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to un-like post');
    }
};

export { getPosts, getPostsByAuthor, createPost, likePost, unlikePost };
