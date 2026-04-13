import { Router } from 'express';
import { authenticateToken } from '#shared/middleware/handleVerifyToken.js';
import { bioValidations } from '#shared/middleware/validations.js';
import { retrieveAvatar } from '#shared/middleware/multer.js';
import { formatAvatar } from '#shared/middleware/Sharp.js';
import * as userController from '#features/users/user.controller.js';

const currentRouter = Router();

currentRouter.get('/', authenticateToken, userController.getCurrentUser);
currentRouter.patch(
    '/bio',
    authenticateToken,
    bioValidations,
    userController.patchBio
);
currentRouter.patch(
    '/avatar',
    authenticateToken,
    retrieveAvatar,
    formatAvatar,
    userController.patchAvatar
);

export { currentRouter };
