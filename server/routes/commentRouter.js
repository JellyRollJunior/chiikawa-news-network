import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.delete(
    '/:commentId',
    authenticateToken,
    commentController.deleteComment
);

export { commentRouter };
