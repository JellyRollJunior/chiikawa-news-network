import { useContext, useState } from 'react';
import { patchUserBio } from '../services/userApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useEditBio = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();

    const editBio = async (id, bio) => {
        setIsLoading(true);
        try {
            const data = await patchUserBio(id, bio);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to edit bio');
        } finally {
            setIsLoading(false);
        }
    };

    return { editBio, isLoading };
};

export { useEditBio };
