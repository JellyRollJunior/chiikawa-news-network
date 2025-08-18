import { useContext, useState } from 'react';
import { deleteChat as requestDeleteChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useDeleteChat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const deleteChat = async (chatId) => {
        setIsLoading(true);
        try {
            const data = await requestDeleteChat(chatId);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to delete chat');
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteChat, isLoading };
};

export { useDeleteChat };
