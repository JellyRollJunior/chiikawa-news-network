import { useContext, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { login as requestLogin } from '../services/authApi.js';

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

    return { login, isLoading };
};

export { useLogin };
