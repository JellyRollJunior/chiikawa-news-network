import { setLikes } from './like.services.js';

const formatPostData = (post) => {
    const postWithLikes = setLikes(post);
    const { _count: count, ...formattedPosts } = postWithLikes;
    formattedPosts.commentCount = count.comments ? count.comments : 0;
    return formattedPosts;
};

export { formatPostData };
