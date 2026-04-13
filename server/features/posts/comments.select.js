import { likesSelect } from '#features/posts/likes.select.js';
import { USER_SELECT_BASIC } from '#features/users/user.select.js';

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
        _count: {
            select: {
                likers: true,
            },
        },
    };
};

export { commentsSelect };
