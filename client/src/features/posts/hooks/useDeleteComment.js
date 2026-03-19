import { useRef } from 'react';
import { deleteComment as requestDeleteComment } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useDeleteComment = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortControllerRef = useRef(null)
    const deleteComment = async (commentId) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        
        const data = await handleApiCall(
            'Unable to delete comment',
            requestDeleteComment,
            abortControllerRef.current.signal,
            commentId
        );
        return data;
    };

    return { deleteComment, isLoading };
};

export { useDeleteComment };
