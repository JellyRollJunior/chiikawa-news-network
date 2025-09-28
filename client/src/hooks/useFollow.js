import { useContext, useState } from "react";
import { useTokenErrorHandler } from "./useTokenErrorHandler.js";
import { ToastContext } from "../contexts/ToastProvider.jsx";
import { postFollowing } from "../services/userApi.js";

const useFollow = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);

    let abortController = new AbortController();
    const followUser = async (userId) => {
        if (abortController) abortController.abort();
        abortController = new AbortController();
        try {
            setIsLoading(true);
            await postFollowing(
                abortController.signal,
                userId
            );
        } catch (error) {
            handleTokenErrors(error);
            toast('Unable to follow user');
        } finally {
            setIsLoading(false);
        }
    };

    return { followUser, isLoading };
};

export { useFollow };
