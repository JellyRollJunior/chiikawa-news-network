import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';

const Toaster = () => {
  const { toasts, deleteToast } = useContext(ToastContext);

  return (
    <ul className="absolute z-1 right-7 top-5 flex flex-col items-end gap-2">
      <AnimatePresence>
        {toasts &&
          toasts.map((toast) => (
            <motion.li
              key={toast.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`flex items-center justify-between gap-3 rounded-2xl py-1 pl-4 pr-3 text-white ${toast.isError ? `bg-red-400` : `bg-gray-500`}`}
            >
              <p>{toast.message}</p>
              {!toast.isTemp && (
                <button onClick={() => deleteToast(toast.id)}>×</button>
              )}
            </motion.li>
          ))}
      </AnimatePresence>
    </ul>
  );
};

export { Toaster };
