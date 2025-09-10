import { useCallback, useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchComments } from '../services/postApi.js';

const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const getComments = useCallback(
        async (signal) => {
            try {
                setIsLoading(true);
                const data = await fetchComments(signal, postId);
                setComments(data.comments);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch comments');
            } finally {
                setIsLoading(false);
            }
        },
        [postId, handleTokenErrors, toast]
    );

    useEffect(() => {
        const abortController = new AbortController();

        getComments(abortController.signal);

        return () => abortController.abort();
    }, [getComments]);

    return { comments, isLoading }
};

export { useComments };
