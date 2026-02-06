import { createComment } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

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
