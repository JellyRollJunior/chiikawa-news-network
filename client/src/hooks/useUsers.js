import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchUsers } from '../services/userApi.js';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const abortController = new AbortController();
        const getUsers = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUsers(abortController.signal);
                setUsers(data.users);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        getUsers();

        return () => abortController.abort();
    }, [handleTokenErrors, toast]);

    return { users, isLoading };
};

export { useUsers };
