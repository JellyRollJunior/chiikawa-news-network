import { useContext } from 'react';
import { patchUserAvatar } from '../services/userApi.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useApiHandler } from './useApiHandler.js';

const useUploadAvatar = () => {
    const { setAvatar } = useContext(CurrentContext);
    const { handleApiCall, isLoading } = useApiHandler();

    const uploadAvatar = async (fileFormData) => {
        const data = await handleApiCall(
            'Unable to upload image',
            patchUserAvatar,
            fileFormData
        );
        if (data.avatar) {
            setAvatar(data.avatar);
        }
    };

    return { uploadAvatar, isLoading };
};

export { useUploadAvatar };
