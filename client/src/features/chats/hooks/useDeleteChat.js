import { deleteChat as requestDeleteChat } from '@/features/chats/api/chats.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useDeleteChat = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const deleteChat = async (chatId) => {
        const data = await handleApiCall(
            'Unable to delete chat',
            requestDeleteChat,
            chatId
        );
        return data;
    };

    return { deleteChat, isLoading };
};

export { useDeleteChat };
