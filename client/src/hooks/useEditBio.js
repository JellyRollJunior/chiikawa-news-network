import { patchUserBio } from '../services/userApi.js';
import { useApiHandler } from './useApiHandler.js';

const useEditBio = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const editBio = async (bio) => {
        const data = await handleApiCall(
            'Unable to edit bio',
            patchUserBio,
            bio
        );
        return data;
    };

    return { editBio, isLoading };
};

export { useEditBio };
