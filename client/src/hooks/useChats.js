import { useCallback, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchChats } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const getChats = useCallback(
        async (signal) => {
            try {
                setIsLoading(true);
                const data = await fetchChats(signal);
                setChats(data);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch chats');
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast]
    );

    const refetch = async () => {
        const abortController = new AbortController();
        getChats(abortController.signal);
    };

    useEffect(() => {
        const abortController = new AbortController();

        getChats(abortController.signal);

        return () => abortController.abort();
    }, [getChats]);

    return { chats, isLoading, refetch };
};

export { useChats };
