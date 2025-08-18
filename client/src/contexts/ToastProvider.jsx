import { createContext, useCallback, useState } from 'react';

const ToastContext = createContext({
  toasts: [],
  toast: () => {},
  toastTemp: () => {},
  deleteToast: () => {},
});

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToastToList = useCallback((message, isError, isTemp = false) => {
    const toastObject = {
      id: crypto.randomUUID(),
      message,
      isError,
      isTemp,
    };
    setToasts((prev) => [...prev, toastObject]);
    return toastObject;
  }, []);

  const toast = useCallback((message, isError = true) => {
    return addToastToList(message, isError);
  }, [addToastToList])

  const toastTemp = useCallback(async (message, isError = false, ms = 2000) => {
    const toastObject = addToastToList(message, isError, true);

    await new Promise((resolve) => setTimeout(resolve, ms));
    deleteToast(toastObject.id);
  }, [addToastToList]);

  const deleteToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id != id));
  };

  return (
    <ToastContext.Provider value={{ toasts, toast, toastTemp, deleteToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
