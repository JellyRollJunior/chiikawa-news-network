import { useCallback, useEffect, useState } from 'react';
import { fetchUser } from '../services/userApi.js';
import { useApiHandler } from './useApiHandler.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const { handleApiCall, isLoading } = useApiHandler();

    const getUser = useCallback(
        async (signal) => {
            const data = await handleApiCall(
                'Unabled to fetch user',
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
