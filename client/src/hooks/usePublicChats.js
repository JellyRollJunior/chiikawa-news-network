import { useCallback, useEffect, useState } from 'react';
import { fetchPublicChats } from '../services/chatApi.js';
import { useApiHandler } from './useApiHandler.js';

const usePublicChats = () => {
    const [publicChats, setPublicChats] = useState([]);
    const { handleApiCall, isLoading } = useApiHandler();

    const getPublicChats = useCallback(
        async (signal) => {
            const chats = await handleApiCall(
                'Unable to fetch public chats',
                fetchPublicChats,
                signal
            );
            setPublicChats(chats);
        },
        [handleApiCall]
    );

    const refetch = () => getPublicChats(null);

    useEffect(() => {
        const abortController = new AbortController();

        getPublicChats(abortController.signal);

        return () => abortController.abort();
    }, [getPublicChats]);

    return { publicChats, isLoading, refetch };
};

export { usePublicChats };
