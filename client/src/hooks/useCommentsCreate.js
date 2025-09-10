import { useContext, useState } from "react";
import { useTokenErrorHandler } from "./useTokenErrorHandler.js";
import { ToastContext } from "../contexts/ToastProvider.jsx";

const useCommentsCreate = (postId) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleTokenErrors } = useTokenErrorHandler();
    const { toast } = useContext(ToastContext);
};

export { useCommentsCreate };
