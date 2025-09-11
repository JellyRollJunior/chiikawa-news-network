import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { deleteComment as requestDeleteComment } from '../services/postApi.js';

const useDeleteComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let abortController = new AbortController();
    const deleteComment = async (commentId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        try {
            setIsLoading(true);
            await requestDeleteComment(
                abortController.signal,
                commentId
            );
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to delete comment');
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteComment, isLoading };
};

export { useDeleteComment };
