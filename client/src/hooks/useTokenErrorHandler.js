import { useCallback, useContext } from 'react';
import { TokenError } from '../errors/TokenError.js';
import { useLogout } from './useLogout.js';
import { ToastContext } from '../contexts/ToastProvider.jsx';

const useTokenErrorHandler = () => {
    const { logout } = useLogout();
    const { toast } = useContext(ToastContext);

    // handle token not found and token authentication errors
    const handleTokenErrors = useCallback(
        (error) => {
            if (
                error instanceof TokenError ||
                error.name == 'Authentication Error'
            ) {
                toast('Unable to authenticate. please log in again.');
                logout();
            }
        },
        [toast, logout]
    );

    return { handleTokenErrors };
};

export { useTokenErrorHandler };
