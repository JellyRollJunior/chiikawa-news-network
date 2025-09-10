import { useCallback, useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import {
    createCommentLike,
    deleteCommentLike,
    fetchComments,
} from '../services/postApi.js';

const useComments = (postId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingLike, setIsLoadingLike] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

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

    let likeAbortController = new AbortController();
    const toggleLike = async (commentId, hasLiked = false) => {
        try {
            setIsLoadingLike(true);
            if (likeAbortController) likeAbortController.abort();
            likeAbortController = new AbortController();
            const { comment: updatedComment } = !hasLiked
                ? await createCommentLike(likeAbortController.signal, commentId)
                : await deleteCommentLike(
                      likeAbortController.signal,
                      commentId
                  );
            // update comment arry with new data
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

    return { comments, isLoading, toggleLike, isLoadingLike };
};

export { useComments };
