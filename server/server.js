import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { app } from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { origin } from './middleware/corsOriginList.js';
import { attachSocketListeners } from './sockets/attachSocketListeners.js';
import { instrument } from '@socket.io/admin-ui';
import { seedPublicChats } from './scripts/seedPublicChats.js';
import { seedSupabaseBuckets } from './scripts/seedSupabaseBuckets.js';
import { seedGuestAccount } from './scripts/seedGuestAccount.js';
dotenv.config();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [...origin, 'https://admin.socket.io'],
        credentials: true,
    },
});

instrument(io, {
    auth: {
        type: 'basic',
        username: process.env.SOCKET_ADMIN_USERNAME,
        password: await bcrypt.hash(process.env.SOCKET_ADMIN_PASSWORD, 10),
    },
    mode: 'development',
});

attachSocketListeners(io);

const PORT = 3000;
server.listen(PORT, '0.0.0.0', async () => {
    console.log(`Listening on port: ${PORT}`);
    // Server setup scripts
    await seedPublicChats();
    await seedSupabaseBuckets();
    await seedGuestAccount();
});
