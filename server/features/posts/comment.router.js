import { Router } from 'express';
import { authenticateToken } from '../../shared/middleware/handleVerifyToken.js';
import { commentIdValidations } from '../../shared/middleware/validations.js';
import * as commentController from './comment.controller.js';

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
