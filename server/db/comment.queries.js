import { PrismaClient } from '@prisma/client';
import { DatabaseError } from '../errors/DatabaseError.js';

const prisma = new PrismaClient();

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
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to create comment');
    }
};

const deleteComment = async (commentId) => {
    try {
        const data = prisma.comment.delete({
            where: {
                id: commentId,
            },
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
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to like comment');
    }
};

export { createComment, deleteComment, likeComment };
