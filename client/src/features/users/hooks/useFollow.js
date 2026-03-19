import {
    deleteFollowing,
    postFollowing,
} from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';
import { useRef } from 'react';

const useFollow = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    let followAbortControllerRef = useRef(null);
    const followUser = async (userId) => {
        if (followAbortControllerRef.current) {
            followAbortControllerRef.current.abort();
        }
        followAbortControllerRef.current = new AbortController();

        const data = await handleApiCall(
            'Unable to follow user',
            postFollowing,
            followAbortControllerRef.current.signal,
            userId
        );
        return data;
    };

    let unfollowAbortControllerRef = useRef(null);
    const unfollowUser = async (userId) => {
        if (unfollowAbortControllerRef.current) {
            unfollowAbortControllerRef.current.abort();
        }
        unfollowAbortControllerRef.current = new AbortController();

        const data = await handleApiCall(
            'Unable to unfollow user',
            deleteFollowing,
            unfollowAbortControllerRef.current.signal,
            userId
        );
        return data;
    };

    return { followUser, unfollowUser, isLoading };
};

export { useFollow };
