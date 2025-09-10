import { useCallback, useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import {
    fetchPostFeed,
    fetchPosts,
    createPostLike,
    deletePostLike,
} from '../services/postApi.js';

const usePostsFeed = (limit = 20) => {
    const [isFeed, setIsFeed] = useState(true);
    const [posts, setPosts] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoadingInit, setIsLoadingInit] = useState(false);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [isLoadingLike, setIsLoadingLike] = useState(false);
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

    let likeAbortController = new AbortController();
    const toggleLike = async (postId, hasLiked = false) => {
        try {
            setIsLoadingLike(true);
            if (likeAbortController) likeAbortController.abort();
            likeAbortController = new AbortController();
            const updatedPost = !hasLiked
                ? await createPostLike(likeAbortController.signal, postId)
                : await deletePostLike(likeAbortController.signal, postId);
            // update posts array with new data
            setPosts((prevPosts) => {
                const index = prevPosts.findIndex(
                    (post) => post.id == updatedPost.id
                );
                if (index >= 0) {
                    const updatedPosts = [...prevPosts];
                    updatedPosts[index] = updatedPost;
                    return updatedPosts;
                }
                return prevPosts;
            });
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to like post');
        } finally {
            setIsLoadingLike(false);
        }
    };

    return {
        posts,
        hasNextPage,
        isLoadingInit,
        fetchNextPage,
        isLoadingNext,
        isFeed,
        setPostsToAll,
        setPostsToFeed,
        refreshPosts,
        toggleLike,
    };
};

export { usePostsFeed };
