import { patchChat } from '../services/chatApi.js';
import { useApiHandler } from './useApiHandler.js';

const useRenameChat = (chatId) => {
    const { handleApiCall, isLoading } = useApiHandler();

    const renameChat = async (name) => {
        const data = await handleApiCall(
            'Unable to rename chat',
            patchChat,
            chatId,
            name
        );
        return data;
    };

    return { renameChat, isLoading };
};

export { useRenameChat };
