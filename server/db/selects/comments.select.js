import { likesSelect } from './likes.select.js';
import { USER_SELECT_BASIC } from './user.select.js';

const commentsSelect = (requesterId) => {
    return {
        id: true,
        content: true,
        createdAt: true,
        authorId: true,
        author: {
            select: USER_SELECT_BASIC,
        },
        ...likesSelect(requesterId),
    };
};

export { commentsSelect };
