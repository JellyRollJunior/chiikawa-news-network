const setLikes = (content) => {
    const { likers, ...formattedContent } = content;
    formattedContent.hasLiked = likers ? likers.length > 0 : false;
    formattedContent.likeCount = content._count.likers ? content._count.likers : 0;
    return formattedContent;
};

export { setLikes };
