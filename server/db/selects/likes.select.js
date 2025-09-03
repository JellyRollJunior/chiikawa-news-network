const likesSelect = (requesterId) => {
    return {
        _count: {
            select: {
                likers: true,
            },
        },
        // ID will be selected if requesterId likes post
        likers: {
            select: {
                id: true,
            },
            where: requesterId ? { id: requesterId } : undefined,
        },
    };
};

export { likesSelect };
