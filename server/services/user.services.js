const setFollows = (user) => {
    const { _count: count, ...baseUser } = user;
    const formattedUser = { ...baseUser, ...count };
    return formattedUser;
};

export { setFollows };
