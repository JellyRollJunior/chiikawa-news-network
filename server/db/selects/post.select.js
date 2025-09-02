const postSelect = (requesterId) => {
    return {
        id: true,
        title: true,
        content: true,
        media: true,
        createdAt: true,
        author: {
            select: {
                id: true,
                username: true,
                avatar: true,
            },
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

export { postSelect };
