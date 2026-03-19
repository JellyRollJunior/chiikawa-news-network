import { useRef } from 'react';
import { createPost as requestCreatePost } from '@/features/posts/api/posts.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useCreatePost = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortControllerRef = useRef(null);
    const createPost = async (title, content, media = null) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const data = handleApiCall(
            'Unable to create post',
            requestCreatePost,
            abortControllerRef.current.signal,
            title,
            content,
            media
        );
        return data;
    };

    return { createPost, isLoading };
};

export { useCreatePost };
