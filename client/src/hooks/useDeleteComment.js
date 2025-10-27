import { deleteComment as requestDeleteComment } from '../services/postApi.js';
import { useApiHandler } from './useApiHandler.js';

const useDeleteComment = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const deleteComment = async (commentId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const data = await handleApiCall(
            'Unable to delete comment',
            requestDeleteComment,
            abortController.signal,
            commentId
        );
        return data;
    };

    return { deleteComment, isLoading };
};

export { useDeleteComment };
