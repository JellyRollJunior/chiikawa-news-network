import { useContext, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { deleteFollowing, postFollowing } from '../services/userApi.js';

const useFollow = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let followAbortController = new AbortController();
    const followUser = async (userId) => {
        if (followAbortController) followAbortController.abort();
        followAbortController = new AbortController();
        try {
            setIsLoading(true);
            await postFollowing(followAbortController.signal, userId);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to follow user');
        } finally {
            setIsLoading(false);
        }
    };

    let unfollowAbortController = new AbortController();
    const unfollowUser = async (userId) => {
        if (unfollowAbortController) unfollowAbortController.abort();
        unfollowAbortController = new AbortController();
        try {
            setIsLoading(true);
            await deleteFollowing(unfollowAbortController.signal, userId);
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to unfollow user');
        } finally {
            setIsLoading(false);
        }
    };

    return { followUser, unfollowUser, isLoading };
};

export { useFollow };
