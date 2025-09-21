import { useCallback, useContext, useEffect, useState } from 'react';
import { fetchUser } from '../services/userApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    const getUser = useCallback(
        async (signal) => {
            try {
                setIsLoading(true);
                const data = await fetchUser(signal, userId);
                setUser(data);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch users');
            } finally {
                setIsLoading(false);
            }
        },
        [userId, handleTokenErrors, toast]
    );

    const refetch = async () => {
        getUser(null);
    };

    useEffect(() => {
        if (!userId) return;
        const abortController = new AbortController();

        getUser(abortController.signal);

        return () => abortController.abort();
    }, [userId, getUser]);

    return { user, isLoading, refetch };
};

export { useUser };
