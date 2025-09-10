const likesSelect = (requesterId) => {
    return {
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
