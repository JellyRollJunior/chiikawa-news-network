const formatUser = (user) => {
    const userFollowCounts = setStatistics(user);
    const userIsFollowing = setIsFollowing(userFollowCounts);
    return userIsFollowing;
};

const setStatistics = (user) => {
    const { _count: count, ...baseUser } = user;
    const formattedUser = {
        ...baseUser,
        followersCount: count.followers,
        followingCount: count.following,
        postCount: count.posts
    };
    return formattedUser;
};

const setIsFollowing = (user) => {
    // ID will be selected in followers if requesterId is a follower of User
    const { followers, ...baseUser } = user;
    if (followers) {
        baseUser.isFollowing = followers.length > 0 ? true : false;
    }
    return baseUser;
};

export { formatUser };
