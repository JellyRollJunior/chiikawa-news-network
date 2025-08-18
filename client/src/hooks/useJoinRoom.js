import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useJoinRoom = (chatId) => {
    const socket = useContext(SocketContext);
    const { toast } = useContext(ToastContext);

    // Join chat room
    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', chatId, (error) => {
            toast(error.message);
        });
    }, [socket, chatId, toast]);
};

export { useJoinRoom };
