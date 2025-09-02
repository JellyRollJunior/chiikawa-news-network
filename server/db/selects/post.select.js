import { commentsSelect } from './comments.select.js';
import { USER_SELECT_BASIC } from './user.select.js';

const postSelect = (requesterId) => {
    return {
        id: true,
        title: true,
        content: true,
        media: true,
        createdAt: true,
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
        comments: {
            select: commentsSelect(requesterId),
            orderBy: {
                createdAt: 'asc',
            },
        },
    };
};

export { postSelect };
