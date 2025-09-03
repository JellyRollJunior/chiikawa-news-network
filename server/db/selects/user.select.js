const USER_SELECT = {
    id: true,
    username: true,
    avatar: true,
    bio: true,
    _count: {
        select: {
            followers: true,
            following: true,
        },
    },
};

const USER_SELECT_BASIC = {
    id: true,
    username: true,
    avatar: true,
};

export { USER_SELECT, USER_SELECT_BASIC };
