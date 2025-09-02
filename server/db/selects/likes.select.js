const likesSelect = (requesterId) => {
    return {
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

export { likesSelect }