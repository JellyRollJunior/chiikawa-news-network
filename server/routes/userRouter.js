import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { postQueryValidationsOptional, userIdValidations } from '../middleware/validations.js';
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
userRouter.get(
    '/:userId/following',
    authenticateToken,
    userIdValidations,
    userController.getFollowing
);
userRouter.post(
    '/:userId/following',
    authenticateToken,
    userIdValidations,
    userController.followUser
);
userRouter.delete(
    '/:userId/following',
    authenticateToken,
    userIdValidations,
    userController.unfollowUser
);

/* Posts */
userRouter.get(
    '/:userId/posts',
    authenticateToken,
    userIdValidations,
    postQueryValidationsOptional,
    postController.getPosts
);

export { userRouter };
