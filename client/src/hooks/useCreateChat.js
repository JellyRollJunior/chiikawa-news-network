import { useContext, useState } from 'react';
import { postChats } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useCreateChat = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const createChat = async (name, chatters) => {
        try {
            setIsLoading(true);
            const data = await postChats(name, chatters);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to create chat');
        } finally {
            setIsLoading(false);
        }
    };

    return { createChat, isLoading };
};

export { useCreateChat };
