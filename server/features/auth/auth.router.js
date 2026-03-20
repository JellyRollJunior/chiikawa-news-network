import { Router } from 'express';
import { userValidation } from '../../shared/middleware/validations.js';
import * as authController from './auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', userValidation, authController.signup)
authRouter.post('/login', authController.login);
authRouter.post('/guest-login', authController.loginGuest);

export { authRouter };
