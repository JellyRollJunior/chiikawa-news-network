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

const createPost = async (requesterId, title, content, media = null) => {
    try {
        const data = await prisma.post.create({
            data: {
                title,
                content,
                media,
                author: {
                    connect: {
                        id: requesterId,
                    },
                },
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create post');
    }
};

const likePost = async (requesterId, postId) => {
    try {
        const data = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likers: {
                    connect: {
                        id: requesterId,
                    },
                },
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to like post');
    }
};

const unlikePost = async (requesterId, postId) => {
    try {
        const data = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likers: {
                    disconnect: {
                        id: requesterId,
                    },
                },
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to un-like post');
    }
};

const deletePost = async (requesterId, postId) => {
    try {
        const data = await prisma.post.delete({
            where: {
                id: postId,
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete post');
    }
};

export {
    getPosts,
    getPostsByAuthor,
    createPost,
    likePost,
    unlikePost,
    deletePost,
};
