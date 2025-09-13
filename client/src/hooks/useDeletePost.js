import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { deletePost as requestDeletePost } from '../services/postApi.js';

const useDeletePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let abortController = new AbortController();
    const deletePost = async (postId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        try {
            setIsLoading(true);
            await requestDeletePost(abortController.signal, postId);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to delete post');
        } finally {
            setIsLoading(false);
        }
    };

    return { deletePost, isLoading };
};

export { useDeletePost };
