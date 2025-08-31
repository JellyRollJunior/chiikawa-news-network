const setLikes = (post) => {
    const { likers, _count: count, ...formattedPost } = post;
    formattedPost.hasLiked = likers.length > 0;
    formattedPost.likes = count.likers;
    return formattedPost;
};

export { setLikes };
