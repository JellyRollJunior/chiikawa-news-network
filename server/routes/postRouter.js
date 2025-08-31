import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateToken } from '../middleware/handleVerifyToken.js';

const postRouter = Router();

postRouter.get('/', authenticateToken, postController.getPosts);
postRouter.post('/', authenticateToken, postController.createPost);

// likes
postRouter.post('/:postId/likes', authenticateToken, postController.likePost);
postRouter.delete(
    '/:postId/likes',
    authenticateToken,
    postController.unlikePost
);

export { postRouter };
