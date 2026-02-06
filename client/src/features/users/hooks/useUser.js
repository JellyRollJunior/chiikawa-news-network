import { useCallback, useEffect, useState } from 'react';
import { fetchUser } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/hooks/useApiHandler.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const { handleApiCall, isLoading } = useApiHandler();

    const getUser = useCallback(
        async (signal) => {
            const data = await handleApiCall(
                'Unable to fetch user',
                fetchUser,
                signal,
                userId
            );
            setUser(data);
        },
        [handleApiCall, userId]
    );

    const refetch = async () => getUser(null);

    useEffect(() => {
        if (!userId) return;
        const abortController = new AbortController();

        getUser(abortController.signal);

        return () => abortController.abort();
    }, [userId, getUser]);

    return { user, isLoading, refetch };
};

export { useUser };
