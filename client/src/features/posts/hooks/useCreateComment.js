import { createComment } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';
import { useRef } from 'react';

const useCreateComment = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortControllerRef = useRef(null);
    const postComment = async (postId, content) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        
        const data = handleApiCall(
            'Unable to post comment',
            createComment,
            abortControllerRef.current.signal,
            postId,
            content
        );
        return data;
    };

    return { postComment, isLoading };
};

export { useCreateComment };
