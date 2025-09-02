import { commentsSelect } from './comments.select.js';
import { likesSelect } from './likes.select.js';
import { USER_SELECT_BASIC } from './user.select.js';

const postSelect = (requesterId) => {
    return {
        id: true,
        title: true,
        content: true,
        media: true,
        createdAt: true,
        authorId: true,
        author: {
            select: USER_SELECT_BASIC,
        },
        ...likesSelect(requesterId),
        comments: {
            select: commentsSelect(requesterId),
            orderBy: {
                createdAt: 'asc',
            },
        },
    };
};

export { postSelect };
