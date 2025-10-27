import { postChats } from '../services/chatApi.js';
import { useApiHandler } from './useApiHandler.js';

const useCreateChat = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const createChat = async (name, chatters) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
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
