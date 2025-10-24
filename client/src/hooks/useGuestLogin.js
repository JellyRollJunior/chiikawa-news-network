import { useContext, useState } from 'react';
import { guestLogin as requestGuestLogin } from '../services/authApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useGuestLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);

    const loginGuest = async () => {
        setIsLoading(true);
        try {
            const data = await requestGuestLogin();
            return data;
        } catch (error) {
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { loginGuest, isLoading };
};

export { useGuestLogin };
