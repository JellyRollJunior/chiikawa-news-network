import { PrismaClient } from '@prisma/client';
import { commentsSelect } from './selects/comments.select.js';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

const getCommentById = async (commentId) => {
    try {
        const data = prisma.comment.findFirst({
            where: {
                id: commentId,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve comment');
    }
};

const getCommentsByPost = async (requesterId, postId) => {
    try {
        const data = prisma.comment.findMany({
            where: {
                postId,
            },
            select: commentsSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to retrieve comments');
    }
};

const createComment = async (requesterId, postId, content, media = null) => {
    try {
        const data = prisma.comment.create({
            data: {
                content,
                media,
                post: {
                    connect: {
                        id: postId,
                    },
                },
                author: {
                    connect: {
                        id: requesterId,
                    },
                },
            },
            select: commentsSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create comment');
    }
};

const deleteComment = async (requesterId, commentId) => {
    try {
        const data = prisma.comment.delete({
            where: {
                id: commentId,
            },
            select: commentsSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete comment');
    }
};

const likeComment = async (requesterId, commentId) => {
    try {
        const data = prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                likers: {
                    connect: {
                        id: requesterId,
                    },
                },
            },
            select: commentsSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to like comment');
    }
};

const unlikeComment = async (requesterId, commentId) => {
    try {
        const data = prisma.comment.update({
            where: {
                id: commentId,
            },
            data: {
                likers: {
                    disconnect: {
                        id: requesterId,
                    },
                },
            },
            select: commentsSelect(requesterId),
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to unlike comment');
    }
};

export {
    getCommentById,
    getCommentsByPost,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
};
