import express from 'express';
import cors from 'cors';
import { origin } from './middleware/corsOriginList.js';
import { authRouter } from './routes/authRouter.js';
import { currentRouter } from './routes/currentRouter.js';
import { userRouter } from './routes/userRouter.js';
import { chatRouter } from './routes/chatRouter.js';
import { publicChatRouter } from './routes/publicChatRouter.js';
import { postRouter } from './routes/postRouter.js';
import { commentRouter } from './routes/commentRouter.js';
import { error404Handler, errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(
    cors({
        origin: origin,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/current', currentRouter);
app.use('/users', userRouter);
app.use('/chats', chatRouter);
app.use('/chats-public', publicChatRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

// errors
app.use(/(.*)/, error404Handler);
app.use(errorHandler);

export { app };
