import { useContext, useEffect, useState } from 'react';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { fetchCurrent } from '../services/userApi.js';

const useCurrent = () => {
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        const abortController = new AbortController();
        const getCurrent = async () => {
            setIsLoading(true);
            try {
                const current = await fetchCurrent(abortController.signal);
                setId(current.id);
                setUsername(current.username);
                setBio(current.bio);
                setAvatar(current.avatar);
            } catch (error) {
                handleTokenErrors(error);
                toast('unable to fetch user data');
            } finally {
                setIsLoading(false);
            }
        };

        getCurrent();

        return () => abortController.abort();
    }, [handleTokenErrors, toast]);

    return { id, username, bio, avatar, isLoading, setBio, setAvatar };
};

export { useCurrent };
