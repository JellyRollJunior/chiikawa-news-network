import { deleteFollowing, postFollowing } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useFollow = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let followAbortController = new AbortController();
    const followUser = async (userId) => {
        if (followAbortController) followAbortController.abort();
        followAbortController = new AbortController();
        const data = await handleApiCall(
            'Unable to follow user',
            postFollowing,
            followAbortController.signal,
            userId
        );
        return data;
    };

    let unfollowAbortController = new AbortController();
    const unfollowUser = async (userId) => {
        if (unfollowAbortController) unfollowAbortController.abort();
        unfollowAbortController = new AbortController();
        const data = await handleApiCall(
            'Unable to unfollow user',
            deleteFollowing,
            followAbortController.signal,
            userId
        );
        return data;
    };

    return { followUser, unfollowUser, isLoading };
};

export { useFollow };
