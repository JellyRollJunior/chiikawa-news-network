const setLikes = (post) => {
    const { likers, _count: count, ...formattedPost } = post;
    formattedPost.hasLiked = likers ? likers.length > 0 : false;
    formattedPost.likes = count ? count.likers : 0;
    return formattedPost;
};

export { setLikes };
