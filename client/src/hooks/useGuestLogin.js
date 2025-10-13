import { useContext, useState } from 'react';
import { guestLogin as requestGuestLogin } from '../services/authApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useGuestLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();

    const guestLogin = async () => {
        setIsLoading(true);
        try {
            const data = await requestGuestLogin();
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { guestLogin, isLoading };
};

export { useGuestLogin };
