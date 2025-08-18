import { Router } from "express";
import { authenticateToken } from "../middleware/handleVerifyToken.js";
import * as userQueries from '../controllers/userController.js';

const currentRouter = Router();

currentRouter.get('/', authenticateToken, userQueries.getCurrentUser)

export { currentRouter}