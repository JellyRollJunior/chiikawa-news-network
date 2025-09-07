import { useCallback, useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchPostFeed } from '../services/postApi.js';

const usePostsFeed = (limit = 20) => {
    const [posts, setPosts] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const initFeed = useCallback(
        async (signal, cursor) => {
            try {
                setIsLoading(true);
                setPosts([]);
                const data = await fetchPostFeed(signal, cursor, limit);
                setPosts(data.posts);
                setHasNextPage(data.meta.hasNextPage);
                setEndCursor(data.meta.endCursor);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch feed');
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast, limit]
    );

    useEffect(() => {
        const abortController = new AbortController();

        initFeed(abortController.signal);

        return () => abortController.abort();
    }, [initFeed]);

    const fetchNextPage = async () => {
        try {
            setIsLoading(true);
            const data = await fetchPostFeed(null, endCursor, limit);
            setPosts((posts) => [...posts, ...data.posts]);
            setHasNextPage(data.meta.hasNextPage);
            setEndCursor(data.meta.endCursor);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to fetch feed');
        } finally {
            setIsLoading(false);
        }
    };

    // fetch all posts function

    // fetch next page all posts function

    let refreshAbortController = new AbortController(); 
    const refreshFeed = async () => {
        if (refreshAbortController) refreshAbortController.abort();
        refreshAbortController = new AbortController();
        initFeed(refreshAbortController.signal, null);
    };

    return { posts, hasNextPage, isLoading, fetchNextPage, refreshFeed };
};

export { usePostsFeed };
