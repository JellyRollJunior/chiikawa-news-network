import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTokenErrorHandler } from '@/shared/hooks/useTokenErrorHandler.js';
import { ToastContext } from '@/shared/providers/ToastProvider.jsx';
import {
    createCommentLike,
    deleteCommentLike,
    fetchComments,
} from '@/features/posts/api/posts.api.js';

const useComments = (postId) => {
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();

    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingLike, setIsLoadingLike] = useState(false);

    const getComments = useCallback(
        async (signal, postId) => {
            try {
                setIsLoading(true);
                const { comments: data } = await fetchComments(signal, postId);
                setComments(data);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch comments');
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast]
    );

    useEffect(() => {
        const abortController = new AbortController();

        if (postId) {
            getComments(abortController.signal, postId);
        }

        return () => abortController.abort();
    }, [postId, getComments]);

    let likeAbortControllerRef = useRef(null);
    const toggleLike = async (commentId, hasLiked = false) => {
        if (likeAbortControllerRef.current) {
            likeAbortControllerRef.current.abort();
        }
        likeAbortControllerRef.current = new AbortController();

        setIsLoadingLike(true);
        try {
            const { comment: updatedComment } = !hasLiked
                ? await createCommentLike(
                      likeAbortControllerRef.current.signal,
                      commentId
                  )
                : await deleteCommentLike(
                      likeAbortControllerRef.current.signal,
                      commentId
                  );

            // update comment array with new data
            setComments((prevComments) => {
                const index = prevComments.findIndex(
                    (comment) => comment.id == updatedComment.id
                );
                if (index >= 0) {
                    const newComments = [...prevComments];
                    newComments[index] = updatedComment;
                    return newComments;
                }
                return prevComments;
            });
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to like/unlike comment');
        } finally {
            setIsLoadingLike(false);
        }
    };

    let refetchAbortControllerRef = useRef(null);
    const refetch = async () => {
        if (refetchAbortControllerRef.current) {
            refetchAbortControllerRef.current.abort();
        }
        refetchAbortControllerRef.current = new AbortController();

        getComments(refetchAbortControllerRef.current.signal, postId);
    };

    return { comments, isLoading, toggleLike, isLoadingLike, refetch };
};

export { useComments };
