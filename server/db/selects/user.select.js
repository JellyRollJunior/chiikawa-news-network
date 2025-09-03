const userSelect = (requesterId) => {
    return {
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
        // ID will be selected if requesterId is a follower of User
        followers: {
            select: {
                id: true,
            },
            where: {
                id: requesterId,
            },
        },
    };
};

const USER_SELECT_BASIC = {
    id: true,
    username: true,
    avatar: true,
};

export { userSelect, USER_SELECT_BASIC };
