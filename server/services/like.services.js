const setLikes = (content) => {
    const { likers, _count: count, ...formattedContent } = content;
    formattedContent.hasLiked = likers ? likers.length > 0 : false;
    formattedContent.likes = count ? count.likers : 0;
    return formattedContent;
};

export { setLikes };
