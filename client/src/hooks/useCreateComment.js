import { createComment } from '../services/postApi.js';
import { useApiHandler } from './useApiHandler.js';

const useCreateComment = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const postComment = async (postId, content) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const data = handleApiCall(
            'Unable to post comment',
            createComment,
            abortController.signal,
            postId,
            content
        );
        return data;
    };

    return { postComment, isLoading };
};

export { useCreateComment };
