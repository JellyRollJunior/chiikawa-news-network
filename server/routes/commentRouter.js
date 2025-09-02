import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { commentIdValidations } from '../middleware/validations.js';
import * as commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.delete(
    '/:commentId',
    authenticateToken,
    commentIdValidations,
    commentController.deleteComment
);
commentRouter.post(
    '/:commentId/likes',
    authenticateToken,
    commentIdValidations,
    commentController.likeComment
);
commentRouter.delete(
    '/:commentId/likes',
    authenticateToken,
    commentIdValidations,
    commentController.unlikeComment
);

export { commentRouter };
