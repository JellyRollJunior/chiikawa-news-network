import { Router } from 'express';
import { userValidation } from '../middleware/validations.js';
import * as authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', userValidation, authController.signup)
authRouter.post('/login', authController.login);

export { authRouter };
