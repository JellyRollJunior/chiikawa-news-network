import { useRef } from 'react';
import { deletePost as requestDeletePost } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useDeletePost = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortControllerRef = useRef(null);
    const deletePost = async (postId) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const data = await handleApiCall(
            'Unable to delete post',
            requestDeletePost,
            abortControllerRef.current.signal,
            postId
        );
        return data;
    };

    return { deletePost, isLoading };
};

export { useDeletePost };
