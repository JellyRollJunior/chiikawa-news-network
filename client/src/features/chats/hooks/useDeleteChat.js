import { deleteChat as requestDeleteChat } from '@/features/chats/api/chats.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

const useDeleteChat = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const deleteChat = async (chatId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const data = await handleApiCall(
            'Unable to delete chat',
            requestDeleteChat,
            abortController.signal,
            chatId
        );
        return data;
    };

    return { deleteChat, isLoading };
};

export { useDeleteChat };
