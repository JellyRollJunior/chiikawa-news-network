import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import {
    postIdValidations,
    postValidations,
    userIdValidations,
} from '../middleware/validations.js';
import * as postController from '../controllers/postController.js';

const postRouter = Router();

postRouter.get(
    '/',
    authenticateToken,
    userIdValidations,
    postController.getPosts
);
postRouter.post(
    '/',
    authenticateToken,
    postValidations,
    postController.createPost
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

export { postRouter };
