import { Router } from 'express';
import * as postController from '../controllers/postController.js';
import { authenticateToken } from '../middleware/handleVerifyToken.js';

const postRouter = Router();

postRouter.get('/', authenticateToken, postController.getPosts);
postRouter.post('/:postId/likes', authenticateToken, postController.likePost);

export { postRouter };
