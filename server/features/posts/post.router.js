import { Router } from 'express';
import { authenticateToken } from '#shared/middleware/handleVerifyToken.js';
import {
    commentValidations,
    postIdValidations,
    postQueryValidationsOptional,
    postValidations,
    userIdValidationsOptional,
} from '#shared/middleware/validations.js';
import { retrieveMedia } from '#shared/middleware/multer.js';
import * as postController from '#features/posts/post.controller.js';
import * as commentController from '#features/posts/comment.controller.js';

const postRouter = Router();

postRouter.get(
    '/',
    authenticateToken,
    userIdValidationsOptional,
    postQueryValidationsOptional,
    postController.getPosts
);
postRouter.post(
    '/',
    authenticateToken,
    retrieveMedia,
    postValidations,
    postController.createPost
);
postRouter.delete(
    '/:postId',
    authenticateToken,
    postIdValidations,
    postController.deletePost
);
postRouter.get(
    '/feed',
    authenticateToken,
    userIdValidationsOptional,
    postQueryValidationsOptional,
    postController.getFollowingPosts
);

// likes
postRouter.post(
    '/:postId/likes',
    authenticateToken,
    postIdValidations,
    postController.likePost
);
postRouter.delete(
    '/:postId/likes',
    authenticateToken,
    postIdValidations,
    postController.unlikePost
);

// comments
postRouter.get(
    '/:postId/comments',
    authenticateToken,
    postIdValidations,
    commentController.getComments
)
postRouter.post(
    '/:postId/comments',
    authenticateToken,
    postIdValidations,
    commentValidations,
    commentController.createComment
);

export { postRouter };
