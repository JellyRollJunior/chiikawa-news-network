import { isUserAuthorizedForChat } from '../services/chat.services.js';
import { createSocketError } from '../errors/SocketError.js';
import { AuthorizationError } from '../errors/AuthorizationError.js';
import { DatabaseError } from '../errors/DatabaseError.js';
import * as messageQueries from '../db/message.queries.js';

const handleJoinRoom = (socket, room, callback) => {
    if (!room)
        return callback(createSocketError(`Unable to join room id: ${room}`));
    // leave all rooms besides [room: socket.id]
    socket.rooms.forEach((room) => {
        if (room != socket.id) {
            socket.leave(room);
            console.log(`${socket.id} has left room: ${room}`);
        }
    });
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
};

const handleSendMessage = async (socket, chatId, content, callback) => {
    try {
        if (
            !chatId ||
            !content ||
            content.length > 250 ||
            content.trim().length <= 0
        ) {
            throw Error('Payload error');
        }
        // Verify user is authorized to post message in chat
        const chat = await messageQueries.getChatMessages(chatId);
        if (!chat) throw new DatabaseError('Unable to create message', 404);
        if (!isUserAuthorizedForChat(chat, socket.data.user.id)) {
            throw new AuthorizationError('Unable to create message');
        }
        // create message and emit
        const message = await messageQueries.createMessage(
            chatId,
            socket.data.user.id,
            content.trim()
        );
        socket.rooms.forEach((room) => {
            socket.to(room).emit('receive_message', message);
            console.log(`Emiting message to room: ${room}`);
        });
    } catch (error) {
        return callback(error);
    }
};

const handleDisconnecting = (socket) => {
    socket.rooms.forEach((room) => {
        socket.leave(room);
        console.log(`${socket.id} has left room: ${room}`);
    });
};

const handleDisconnect = (socket) => {
    console.log(`${socket.id} has disconnected`);
};

export {
    handleJoinRoom,
    handleSendMessage,
    handleDisconnecting,
    handleDisconnect,
};
