import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { retrieveAvatar } from '../middleware/multer.js';
import { resizeAvatar } from '../errors/Sharp.js';
import { bioValidations } from '../middleware/validations.js';
import * as userController from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, userController.getAllUsers);
userRouter.get('/:userId', authenticateToken, userController.getUser);
userRouter.patch('/:userId', authenticateToken, bioValidations, userController.patchBio);
userRouter.patch(
    '/:userId/avatar',
    authenticateToken,
    retrieveAvatar,
    resizeAvatar,
    userController.patchAvatar
);

export { userRouter };
