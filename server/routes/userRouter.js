import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { userIdValidations } from '../middleware/validations.js';
import * as userController from '../controllers/userController.js';
import * as postController from '../controllers/postController.js';

const userRouter = Router();

userRouter.get('/', authenticateToken, userController.getAllUsers);
userRouter.get('/:userId', authenticateToken, userController.getUser);

/* Follows */
userRouter.get(
    '/:userId/followers',
    authenticateToken,
    userIdValidations,
    userController.getFollowers
);
userRouter.post(
    '/:userId/followers',
    authenticateToken,
    userIdValidations,
    userController.followUser
);
userRouter.get(
    '/:userId/following',
    authenticateToken,
    userIdValidations,
    userController.getFollowing
);

/* Posts */
userRouter.get(
    '/:userId/posts',
    authenticateToken,
    userIdValidations,
    postController.getPosts
);

export { userRouter };
