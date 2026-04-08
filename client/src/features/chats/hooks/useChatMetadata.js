import { useCallback, useEffect, useRef, useState } from 'react';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';
import { fetchChatMetadata } from '@/features/chats/api/chats.api.js';

const useChatMetadata = (chatId) => {
    const { handleApiCall, isLoading } = useApiHandler();

    const [chat, setChat] = useState(null);

    const abortControllerRef = useRef(null);
    const getChatMetadata = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const chatMetadata = await handleApiCall(
            'Unable to fetch chat metadata',
            fetchChatMetadata,
            chatId,
            abortControllerRef.current.signal
        );
        setChat(chatMetadata);
    }, [handleApiCall, chatId]);

    const updateChatNameClientSide = (name) => {
        setChat((prev) => ({ ...prev, name: name }));
    };

    // configure socket on receive_message
    useEffect(() => {
        getChatMetadata();

        return () => abortControllerRef.current?.abort();
    }, [getChatMetadata]);

    return {
        chat,
        updateChatNameClientSide,
        isLoading,
    };
};

export { useChatMetadata };
