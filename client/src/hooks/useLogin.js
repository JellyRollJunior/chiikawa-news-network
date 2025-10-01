import { useContext, useState } from 'react';
import { login as requestLogin } from '../services/authApi.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const data = await requestLogin(username, password);
            return data;
        } catch (error) {
            handleTokenErrors(error);
            toast(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading };
};

export { useLogin };
