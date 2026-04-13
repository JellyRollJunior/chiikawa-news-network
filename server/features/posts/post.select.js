import { likesSelect } from '#features/posts/likes.select.js';
import { USER_SELECT_BASIC } from '#features/users/user.select.js';

const postSelect = (requesterId) => {
    return {
        id: true,
        title: true,
        content: true,
        media: true,
        isSelfHosted: true,
        createdAt: true,
        authorId: true,
        author: {
            select: USER_SELECT_BASIC,
        },
        ...likesSelect(requesterId),
        _count: {
            select: {
                likers: true,
                comments: true,
            },
        },
    };
};

export { postSelect };
