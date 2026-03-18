import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTokenErrorHandler } from '@/shared/hooks/useTokenErrorHandler.js';
import { ToastContext } from '@/shared/providers/ToastProvider.jsx';
import {
    fetchPostFeed,
    fetchPosts,
    createPostLike,
    deletePostLike,
} from '@/features/posts/api/posts.api.js';

const usePosts = (limit = 20, userId = null) => {
    const [isFeed, setIsFeed] = useState(true);
    const [posts, setPosts] = useState([]);
    const [endCursor, setEndCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    // Loading
    const loadingRef = useRef(false);
    const [isLoadingInit, setIsLoadingInit] = useState(false);
    const [isLoadingNext, setIsLoadingNext] = useState(false);
    const [isLoadingLike, setIsLoadingLike] = useState(false);

    const fetchData = useCallback(
        async (signal, cursor, limit, userId = null) => {
            if (userId) return await fetchPosts(signal, cursor, limit, userId);
            return isFeed
                ? await fetchPostFeed(signal, cursor, limit)
                : await fetchPosts(signal, cursor, limit);
        },
        [isFeed]
    );

    const initPosts = useCallback(
        async (signal, cursor) => {
            loadingRef.current = true;
            setIsLoadingInit(true);

            try {
                const data = await fetchData(signal, cursor, limit, userId);
                setPosts(data.posts);
                setHasNextPage(data.meta.hasNextPage);
                setEndCursor(data.meta.endCursor);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch feed');
            } finally {
                loadingRef.current = false;
                setIsLoadingInit(false);
            }
        },
        [fetchData, handleTokenErrors, toast, limit, userId]
    );

    useEffect(() => {
        const abortController = new AbortController();

        initPosts(abortController.signal, null);

        return () => abortController.abort();
    }, [initPosts]);

    const fetchNextPage = useCallback(async () => {
        if (!hasNextPage || isLoadingNext || loadingRef.current) return;

        loadingRef.current = true;
        setIsLoadingNext(true);

        try {
            const data = await fetchData(null, endCursor, limit, userId);
            setPosts((prev) => {
                // remove duplicates
                const updatedPosts = [...prev, ...data.posts];
                const uniquePosts = Array.from(
                    new Map(updatedPosts.map((p) => [p.id, p])).values()
                );
                return uniquePosts;
            });
            setHasNextPage(data.meta.hasNextPage);
            setEndCursor(data.meta.endCursor);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to fetch feed');
        } finally {
            loadingRef.current = false;
            setIsLoadingNext(false);
        }
    }, [
        hasNextPage,
        isLoadingNext,
        fetchData,
        endCursor,
        handleTokenErrors,
        toast,
        limit,
        userId,
    ]);

    const setPostsToFeed = () => {
        setIsFeed(true);
    };

    const setPostsToAll = () => {
        setIsFeed(false);
    };

    let refreshAbortController = useRef(null);
    const refreshPosts = async () => {
        if (refreshAbortController.current) {
            refreshAbortController.current.abort();
        }
        refreshAbortController.current = new AbortController();

        initPosts(refreshAbortController.current.signal, null);
    };

    let likeAbortController = useRef(null);
    const toggleLike = async (postId, hasLiked = false) => {
        if (likeAbortController.current) {
            likeAbortController.current.abort();
        }
        likeAbortController.current = new AbortController();
        setIsLoadingLike(true);

        try {
            const updatedPost = !hasLiked
                ? await createPostLike(likeAbortController.signal, postId)
                : await deletePostLike(likeAbortController.signal, postId);

            // update posts array with new data
            setPosts((prevPosts) => {
                const index = prevPosts.findIndex(
                    (post) => post.id == updatedPost.id
                );
                if (index >= 0) {
                    const newPosts = [...prevPosts];
                    newPosts[index] = updatedPost;
                    return newPosts;
                }
                return prevPosts;
            });
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to like/unlike post');
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
        setPostsToAll,
        setPostsToFeed,
        isFeed,
        refreshPosts,
        toggleLike,
        isLoadingLike,
    };
};

export { usePosts };
