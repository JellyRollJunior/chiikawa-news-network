import { setLikes } from './like.services.js';

const setPostAndCommentLikes = (post) => {
    if (post.comments) {
        post.comments = post.comments.map((comment) => setLikes(comment));
    }
    return setLikes(post);
};

export { setPostAndCommentLikes };
