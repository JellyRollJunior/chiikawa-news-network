import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchPublicChats } from '../services/chatApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const usePublicChats = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const getPublicChats = useCallback(
        async (signal) => {
            setIsLoading(true);
            try {
                const chats = await fetchPublicChats(signal);
                setPublicChats(chats);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch public chats');
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast]
    );

    const refetch = () => {
        const abortController = new AbortController();
        getPublicChats(abortController.signal);
    };

    useEffect(() => {
        const abortController = new AbortController();

        getPublicChats(abortController.signal);

        return () => abortController.abort();
    }, [getPublicChats]);

    return { publicChats, isLoading, refetch };
};

export { usePublicChats };
