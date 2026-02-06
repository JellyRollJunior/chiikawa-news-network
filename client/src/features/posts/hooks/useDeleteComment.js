import { deleteComment as requestDeleteComment } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

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
