import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { createPost as requestCreatePost } from '../services/postApi.js';

const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let abortController = new AbortController();
    const createPost = async (title, content, media = null) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        try {
            setIsLoading(true);
            await requestCreatePost(
                abortController.signal,
                title,
                content,
                media
            );
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return { createPost, isLoading };
};

export { useCreatePost };
