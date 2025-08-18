import { useContext, useState } from 'react';
import { patchChat } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useRenameChat = (chatId) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const renameChat = async (name) => {
        setIsLoading(true);
        try {
            const data = await patchChat(chatId, name);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to rename chat');
        } finally {
            setIsLoading(false);
        }
    };

    return { renameChat, isLoading };
};

export { useRenameChat };
