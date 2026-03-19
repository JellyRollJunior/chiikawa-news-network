import { postChats } from '@/features/chats/api/chats.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useCreateChat = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const createChat = async (name, chatters) => {
        const data = handleApiCall(
            'Unable to create chat',
            postChats,
            name,
            chatters
        );
        return data;
    };

    return { createChat, isLoading };
};

export { useCreateChat };
