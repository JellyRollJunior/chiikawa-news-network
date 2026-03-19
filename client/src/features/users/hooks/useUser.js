import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchUser } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useUser = (userId) => {
    const { handleApiCall, isLoading } = useApiHandler();

    const [user, setUser] = useState(null);

    const abortControllerRef = useRef(null);
    const getUser = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const data = await handleApiCall(
            'Unable to fetch user',
            fetchUser,
            abortControllerRef.current.signal,
            userId
        );
        setUser(data);
    }, [handleApiCall, userId]);

    const refetch = async () => getUser();

    useEffect(() => {
        if (!userId) return;

        getUser();

        return () => abortControllerRef.current?.abort();
    }, [userId, getUser]);

    return { user, isLoading, refetch };
};

export { useUser };
