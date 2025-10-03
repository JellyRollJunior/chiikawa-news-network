import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import {
    commentValidations,
    postIdValidations,
    postQueryValidationsOptional,
    postValidations,
    userIdValidationsOptional,
} from '../middleware/validations.js';
import * as postController from '../controllers/postController.js';
import * as commentController from '../controllers/commentController.js';
import { retrieveMedia } from '../middleware/multer.js';

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
