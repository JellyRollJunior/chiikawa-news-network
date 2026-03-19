import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchUsers } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useUsers = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const [users, setUsers] = useState([]);
    
    const abortControllerRef = useRef(null);
    const getUsers = useCallback(async () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        const data = await handleApiCall(
            'Unabled to fetch user',
            fetchUsers,
            abortControllerRef.current.signal
        );
        setUsers(data.users);
    }, [handleApiCall]);

    const refetch = async () => getUsers();

    useEffect(() => {
        getUsers();

        return () => abortControllerRef.current?.abort();
    }, [getUsers]);

    return { users, isLoading, refetch };
};

export { useUsers };
