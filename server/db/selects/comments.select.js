import { USER_SELECT_BASIC } from './user.select.js';

const commentsSelect = (requesterId) => {
    return {
        id: true,
        content: true,
        media: true,
        createdAt: true,
        authorId: true,
        author: {
            select: USER_SELECT_BASIC,
        },
        likers: {
            select: {
                id: true,
            },
            where: requesterId ? { id: requesterId } : undefined,
        },
        _count: {
            select: {
                likers: true,
            },
        },
    };
};

export { commentsSelect };
