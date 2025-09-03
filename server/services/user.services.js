const setFollows = (user) => {
    const userFollowCounts = setFollowCounts(user);
    const userIsFollowing = setIsFollowing(userFollowCounts);
    return userIsFollowing;
};

const setFollowCounts = (user) => {
    const { _count: count, ...baseUser } = user;
    const formattedUser = {
        ...baseUser,
        followersCount: count.followers,
        followingCount: count.following,
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

export { setFollows };
