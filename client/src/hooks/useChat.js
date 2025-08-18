import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchChat } from '../services/chatApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { SocketContext } from '../contexts/SocketProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const createMessage = (content, id, username, avatar) => {
    const now = new Date().toISOString();
    return {
        id: now,
        content,
        sendTime: now,
        sender: {
            id,
            avatar: avatar,
            username: username,
        },
    };
};

const useChat = (chatId) => {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const { toast } = useContext(ToastContext);
    const { refetchChats } = useContext(ChatsContext);
    const { id, username, avatar } = useContext(CurrentContext);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);
    const { handleTokenErrors } = useTokenErrorHandler();

    // retrieve initial chat
    useEffect(() => {
        const abortController = new AbortController();
        const getChat = async () => {
            if (!chatId) return;
            try {
                setIsLoading(true);
                const chat = await fetchChat(chatId, abortController.signal);
                const { messages, ...chatData } = chat;
                setChat(chatData);
                setMessages(messages);
                setErrorStatus(null);
            } catch (error) {
                handleTokenErrors(error);
                setErrorStatus(error.status);
                toast('Unable to fetch chat');
            } finally {
                setIsLoading(false);
            }
        };

        getChat();

        return () => abortController.abort();
    }, [chatId, handleTokenErrors, toast]);

    // configure socket on receive_message
    useEffect(() => {
        if (!socket) return;
        socket.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => socket.off('receive_message');
    }, [socket, chatId]);

    const sendMessageErrors = {
        403: 'Chat is unavailable',
        404: 'Chat is unavailable and may have been deleted',
    }
    const sendMessage = (text) => {
        if (!socket) return;
        // emit message to server
        socket.emit('send_message', chatId, text, (error) => {
            if (sendMessageErrors[error.status]) {
                toast(sendMessageErrors[error.status]);
                refetchChats();
                navigate('/');
            } else {
                toast('Unable to send message. Please refresh and try again later');
            }
        });

        // display message on client
        const message = createMessage(text, id, username, avatar);
        setMessages((prev) => [...prev, message]);
    };

    const updateChatName = (name) => {
        setChat((prev) => {
            prev.name = name;
            return prev;
        });
    };

    return {
        chat,
        messages,
        sendMessage,
        updateChatName,
        isLoading,
        errorStatus,
    };
};

export { useChat };
