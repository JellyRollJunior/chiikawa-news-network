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

const getPosts = async (
    requesterId,
    authorIds = null,
    cursor = null,
    limit = 20
) => {
    try {
        const data = await prisma.post.findMany({
            where: authorIds
                ? {
                      authorId: {
                          in: Array.isArray(authorIds)
                              ? authorIds
                              : [authorIds],
                      },
                  }
                : undefined,
            orderBy: [
                {createdAt: 'desc'},
                {id: 'desc'},
            ],
            take: limit + 1,
            cursor: cursor ? { id: cursor } : undefined,
            skip: cursor ? 1 : 0, // skip cursor if present
            select: postSelect(requesterId),
        });
        // if data has limit + 1 items, then there exists a next page
        const meta = {};
        meta.hasNextPage = data.length > limit;
        const posts = meta.hasNextPage ? data.slice(0, -1) : data;
        meta.endCursor = posts.length > 0 ? posts[posts.length - 1].id : null;
        return {
            posts,
            meta,
        };
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
    createPost,
    updatePostMedia,
    likePost,
    unlikePost,
    deletePost,
};
