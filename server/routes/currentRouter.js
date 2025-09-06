import { Router } from 'express';
import { authenticateToken } from '../middleware/handleVerifyToken.js';
import { bioValidations } from '../middleware/validations.js';
import { retrieveAvatar } from '../middleware/multer.js';
import { formatAvatar } from '../middleware/Sharp.js';
import * as userController from '../controllers/userController.js';

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
