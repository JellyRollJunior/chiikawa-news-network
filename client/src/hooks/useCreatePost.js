import { createPost as requestCreatePost } from '../services/postApi.js';
import { useApiHandler } from './useApiHandler.js';

const useCreatePost = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let abortController = new AbortController();
    const createPost = async (title, content, media = null) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const data = handleApiCall(
            'Unable to create post',
            requestCreatePost,
            abortController.signal,
            title,
            content,
            media
        );
        return data;
    };

    return { createPost, isLoading };
};

export { useCreatePost };
