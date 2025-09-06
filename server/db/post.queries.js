import { PrismaClient } from '@prisma/client';
import { postSelect } from './selects/post.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getPostById = async (requesterId, postId) => {
    try {
        const data = await prisma.post.findFirst({
            where: {
                id: postId,
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve post');
    }
};

const getPosts = async (requesterId) => {
    try {
        const data = await prisma.post.findMany({
            select: postSelect(requesterId),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

const getPostsByAuthor = async (requesterId, authorIds) => {
    try {
        const data = await prisma.post.findMany({
            where: {
                authorId: {
                    in: Array.isArray(authorIds) ? authorIds : [authorIds],
                },
            },
            select: postSelect(requesterId),
            orderBy: {
                createdAt: 'desc',
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve posts');
    }
};

const getFeed = async (requesterId, authorIds, cursor = null, limit = 20) => {
    try {
        const data = await prisma.post.findMany({
            where: {
                authorId: {
                    in: Array.isArray(authorIds) ? authorIds : [authorIds],
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0, // skip cursor if present
            select: postSelect(requesterId),
        });

        // if data has limit + 1 items, then there exists a next page
        const hasNextPage = data.length > limit;
        const posts = hasNextPage ? data.slice(0, -1) : data;
        const endCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
        return {
            posts,
            meta: {
                hasNextPage,
                endCursor,
            },
        };
    } catch (error) {
        throw new DatabaseError('Unable to retrieve feed');
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

const updatePostMedia = async (requesterId, postId, media) => {
    try {
        const data = await prisma.post.update({
            data: {
                media,
            },
            where: {
                id: postId,
            },
            select: postSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to update post media');
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
        throw new DatabaseError('Unable to unlike post');
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
    getPostById,
    getPosts,
    getPostsByAuthor,
    getFeed,
    createPost,
    updatePostMedia,
    likePost,
    unlikePost,
    deletePost,
};
