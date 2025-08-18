import { useContext, useEffect, useState } from 'react';
import { fetchUser } from '../services/userApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useUser = (userId) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        if (!userId) return;
        const abortController = new AbortController();

        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchUser(abortController.signal, userId);
                setUser(data);
            } catch (error) {
                handleTokenErrors(error);
                toast('Unable to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();

        return () => abortController.abort();
    }, [userId, handleTokenErrors, toast]);

    return { user, isLoading };
};

export { useUser };
