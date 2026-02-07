import { useContext, useState } from 'react';
import { ToastContext } from '@/shared/providers/ToastProvider.jsx';
import {
    login as requestLogin,
    guestLogin as requestGuestLogin,
} from '@/features/auth/api/auth.api.js';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const data = await requestLogin(username, password);
            return data;
        } catch (error) {
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

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

    return { login, loginGuest, isLoading };
};

export { useLogin };
