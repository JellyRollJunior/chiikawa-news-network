import { useCallback, useContext } from 'react';
import { TokenError } from '@/shared/errors/TokenError.js';
import { useLogout } from '../../features/auth/hooks/useLogout.js';
import { ToastContext } from '../providers/ToastProvider.jsx';

const useTokenErrorHandler = () => {
    const { logout } = useLogout();
    const { toastTemp } = useContext(ToastContext);

    // handle token not found and token authentication errors
    const handleTokenErrors = useCallback(
        (error) => {
            if (
                error instanceof TokenError ||
                error.name == 'Authentication Error'
            ) {
                toastTemp('Session expired. Please log in again', true);
                logout();
            }
        },
        [toastTemp, logout]
    );

    return { handleTokenErrors };
};

export { useTokenErrorHandler };
