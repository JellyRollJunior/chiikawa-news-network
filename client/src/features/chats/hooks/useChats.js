import { useCallback, useEffect, useState } from 'react';
import { fetchChats } from '@/features/chats/api/chats.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

const useChats = () => {
    const [chats, setChats] = useState([]);
    const { handleApiCall, isLoading } = useApiHandler();

    const getChats = useCallback(
        async (signal) => {
            const chats = await handleApiCall(
                'Unable to fetch chats',
                fetchChats,
                signal
            );
            setChats(chats);
        },
        [handleApiCall]
    );

    const refetch = useCallback(() => getChats(null), [getChats]);

    useEffect(() => {
        const abortController = new AbortController();

        getChats(abortController.signal);

        return () => abortController.abort();
    }, [getChats]);

    return { chats, isLoading, refetch };
};

export { useChats };
