import { patchUserBio } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

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
