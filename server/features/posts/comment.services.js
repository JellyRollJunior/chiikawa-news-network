import { setLikes } from '#features/posts/like.services.js';

const formatCommentData = (post) => {
    const commentsWithLikes = setLikes(post);
    const { _count: count, ...formattedComments } = commentsWithLikes;
    return formattedComments;
};

export { formatCommentData };
