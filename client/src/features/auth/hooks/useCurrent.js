import { useEffect, useState } from 'react';
import { fetchCurrent } from '@/features/users/api/user.api.js';
import { useApiHandler } from '@/shared/hooks/useApiHandler.js';

const useCurrent = () => {
    const { handleApiCall, isLoading } = useApiHandler();

    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [bio, setBio] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        const getCurrent = async () => {
            const current = await handleApiCall(
                'Unable to fetch user data',
                fetchCurrent,
                abortController.signal
            );
            setId(current.id);
            setUsername(current.username);
            setBio(current.bio);
            setAvatar(current.avatar);
        };

        getCurrent();

        return () => abortController.abort();
    }, [handleApiCall]);

    return { id, username, bio, avatar, isLoading, setBio, setAvatar };
};

export { useCurrent };
