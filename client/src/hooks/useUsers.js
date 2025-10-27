import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../services/userApi.js';
import { useApiHandler } from './useApiHandler.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const { handleApiCall, isLoading } = useApiHandler();

    const getUsers = useCallback(
        async (signal) => {
            const data = await handleApiCall(
                'Unabled to fetch user',
                fetchUsers,
                signal
            );
            setUsers(data.users);
        },
        [handleApiCall]
    );

    const refetch = async () => getUsers(null);

    useEffect(() => {
        const abortController = new AbortController();

        getUsers(abortController.signal);

        return () => abortController.abort();
    }, [getUsers]);

    return { users, isLoading, refetch };
};

export { useUsers };
