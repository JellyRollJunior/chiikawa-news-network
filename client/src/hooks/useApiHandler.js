import { useCallback, useContext, useState } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
import { useTokenErrorHandler } from './useTokenErrorHandler.js';

const useApiHandler = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useContext(ToastContext);
    const { handleTokenErrors } = useTokenErrorHandler();

    const handleApiCall = useCallback(
        async (errorMessage, requestFunction, ...args) => {
            try {
                setIsLoading(true);
                const data = await requestFunction(...args);
                return data;
            } catch (error) {
                handleTokenErrors(error);
                toast(errorMessage);
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
        [handleTokenErrors, toast]
    );

    return { handleApiCall, isLoading };
};

export { useApiHandler };
