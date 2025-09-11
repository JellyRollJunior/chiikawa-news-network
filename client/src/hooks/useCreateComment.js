import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { createComment } from '../services/postApi.js';

const useCreateComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let abortController = new AbortController();
    const postComment = async (postId, content) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        try {
            setIsLoading(true);
            await createComment(
                abortController.signal,
                postId,
                content
            );
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to post comment');
        } finally {
            setIsLoading(false);
        }
    };

    return { postComment, isLoading };
};

export { useCreateComment };
