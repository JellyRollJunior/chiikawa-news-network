import { isUserAuthorizedForChat } from '#features/chat/chat.services.js';
import { textCensor, profanityMatcher} from '#shared/services/textCensor.js';
import { createSocketError } from '#shared/errors/SocketError.js';
import { AuthorizationError } from '#shared/errors/AuthorizationError.js';
import { DatabaseError } from '#shared/errors/DatabaseError.js';
import * as chatQueries from '#features/chat/chat.queries.js';

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
        const chat = await chatQueries.getChatMetadata(chatId);
        if (!chat) throw new DatabaseError('Unable to create message', 404);
        if (!isUserAuthorizedForChat(chat, socket.data.user.id)) {
            throw new AuthorizationError('Unable to create message');
        }
        // create message and emit
        const censoredContent = textCensor.applyTo(content.trim(), profanityMatcher.getAllMatches(content.trim()));
        const message = await chatQueries.createChatMessage(
            chatId,
            socket.data.user.id,
            censoredContent
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
