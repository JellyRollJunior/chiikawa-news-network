import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { patchUserAvatar } from '../services/userApi.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useUploadAvatar = () => {
    const { id, setAvatar } = useContext(CurrentContext);
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();
    const [isLoading, setIsLoading] = useState(false);

    const uploadAvatar = async (fileFormData) => {
        setIsLoading(true);
        try {
            const data = await patchUserAvatar(id, fileFormData);
            if (data.avatar) {
                setAvatar(data.avatar);
            }
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to upload image');
        } finally {
            setIsLoading(false);
        }
    };

    return { uploadAvatar, isLoading };
};

export { useUploadAvatar };
