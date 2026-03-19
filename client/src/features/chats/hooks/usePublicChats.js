import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPublicChats } from '@/features/chats/api/chats.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const usePublicChats = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const [publicChats, setPublicChats] = useState([]);
    
    const abortControllerRef = useRef(null);
    const getPublicChats = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const chats = await handleApiCall(
            'Unable to fetch public chats',
            fetchPublicChats,
            abortControllerRef.current.signal
        );
        setPublicChats(chats);
    }, [handleApiCall]);

    const refetch = getPublicChats;

    // Fetch public chats on load hook
    useEffect(() => {
        getPublicChats();

        return () => abortControllerRef.current?.abort();
    }, [getPublicChats]);

    return { publicChats, isLoading, refetch };
};

export { usePublicChats };
