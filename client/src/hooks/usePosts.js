import { useCallback, useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchPostFeed, fetchPosts } from '../services/postApi.js';

const usePostsFeed = (limit = 20) => {
    const [isFeed, setIsFeed] = useState(false);
    const [posts, setPosts] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(false);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const fetchData = useCallback(
        async (signal, cursor, limit) => {
            return isFeed
                ? await fetchPostFeed(signal, cursor, limit)
                : await fetchPosts(signal, cursor, limit);
        },
        [isFeed]
    );

    const initPosts = useCallback(
        async (signal, cursor) => {
            try {
                setIsLoadingInit(true);
                setPosts([]);
                const data = await fetchData(signal, cursor, limit);
                setPosts(data.posts);
                setHasNextPage(data.meta.hasNextPage);
                setEndCursor(data.meta.endCursor);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch feed');
            } finally {
                setIsLoadingInit(false);
            }
        },
        [fetchData, handleTokenErrors, toast, limit]
    );

    const fetchNextPage = async () => {
        try {
            if (!hasNextPage) return;
            setIsLoadingNext(true);
            const data = await fetchData(null, endCursor, limit);
            setPosts((posts) => [...posts, ...data.posts]);
            setHasNextPage(data.meta.hasNextPage);
            setEndCursor(data.meta.endCursor);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to fetch feed');
        } finally {
            setIsLoadingNext(false);
        }
    };

    const setPostsToFeed = () => {
        setIsFeed(true);
    };

    const setPostsToAll = () => {
        setIsFeed(false);
    };

    let refreshAbortController = new AbortController();
    const refreshPosts = async () => {
        if (refreshAbortController) refreshAbortController.abort();
        refreshAbortController = new AbortController();
        initPosts(refreshAbortController.signal, null);
    };

    useEffect(() => {
        const abortController = new AbortController();

        initPosts(abortController.signal);

        return () => abortController.abort();
    }, [initPosts]);

    return {
        posts,
        hasNextPage,
        isLoadingInit,
        fetchNextPage,
        isLoadingNext,
        setPostsToAll,
        setPostsToFeed,
        refreshPosts,
    };
};

export { usePostsFeed };
