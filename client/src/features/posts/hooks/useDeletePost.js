import { deletePost as requestDeletePost } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

const useDeletePost = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const deletePost = async (postId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const data = await handleApiCall(
            'Unable to delete post',
            requestDeletePost,
            abortController.signal,
            postId
        );
        return data;
    };

    return { deletePost, isLoading };
};

export { useDeletePost };
