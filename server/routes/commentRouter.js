import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.delete(
    '/:commentId',
    authenticateToken,
    commentController.deleteComment
);
commentRouter.post(
    '/:commentId/likes',
    authenticateToken,
    commentController.likeComment
);
commentRouter.delete(
    '/:commentId/likes',
    authenticateToken,
    commentController.unlikeComment
);

export { commentRouter };
