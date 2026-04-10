import express from 'express';
import cors from 'cors';
import { origin } from './config/corsOriginList.js';
import { authRouter } from './features/auth/auth.router.js';
import { currentRouter } from './features/users/current.router.js';
import { userRouter } from './features/users/user.router.js';
import { chatRouter } from './features/chat/chat.router.js';
import { publicChatRouter } from './features/chat/publicChat.router.js';
import { postRouter } from './features/posts/post.router.js';
import { commentRouter } from './features/posts/comment.router.js';
import { error404Handler, errorHandler } from './shared/middleware/errorHandler.js';

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
