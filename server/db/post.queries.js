import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getPosts = async () => {
    try {
        const data = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
                _count: {
                    select: { likes: true },
                },
            },
        });
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
                _count: {
                    select: { likes: true },
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

const likePost = async (postId, likerId) => {
    try {
        const data = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likes: {
                    connect: {
                        id: likerId,
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
        throw new DatabaseError('Unable to like post');
    }
};

export { getPosts, getPostsByAuthor, createPost, likePost };
