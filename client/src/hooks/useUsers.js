import { useCallback, useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchUsers } from '../services/userApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const getUsers = useCallback(
        async (signal) => {
            try {
                setIsLoading(true);
                const data = await fetchUsers(signal);
                setUsers(data.users);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch users');
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast]
    );

    const refetch = async () => {
        getUsers(null);
    }

    useEffect(() => {
        const abortController = new AbortController();
        
        getUsers(abortController.signal);

        return () => abortController.abort();
    }, [getUsers]);

    return { users, isLoading, refetch };
};

export { useUsers };
