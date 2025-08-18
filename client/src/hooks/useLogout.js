import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const useLogout = () => {
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    return { logout };
};

export { useLogout };
