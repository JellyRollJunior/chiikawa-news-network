import { handleVerifyToken } from "../middleware/handleVerifyToken.js";
import { handleJoinRoom, handleSendMessage, handleDisconnecting, handleDisconnect } from "./socketListeners.js";

const attachSocketListeners = (io) => {
    io.use(handleVerifyToken);

    io.on('connection', (socket) => {
        console.log(`Connected with socket ID: ${socket.id}`);

        socket.on('send_message', (chatId, content, callback) => handleSendMessage(socket, chatId, content, callback));
        socket.on('join_room', (room, callback) => handleJoinRoom(socket, room, callback));
        socket.on('disconnecting', () => handleDisconnecting(socket));
        socket.on('disconnect', () => handleDisconnect(socket));
    });
};

export { attachSocketListeners };
