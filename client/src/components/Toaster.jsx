import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';

const Toaster = () => {
  const { toasts, deleteToast } = useContext(ToastContext);

  return (
    <ul className="absolute top-5 right-1/2 z-1 flex translate-x-1/2 flex-col items-center gap-2 md:items-end md:right-5 md:translate-x-0">
      <AnimatePresence>
        {toasts &&
          toasts.map((toast) => (
            <motion.li
              className={`flex items-center justify-center text-nowrap ${toast.isError ? `pink-button` : `pink-button`} rounded-lg shadow-pink-50/0`}
              key={toast.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="flex items-center gap-3 py-1 pr-6 pl-7"
                onClick={() => !toast.isTemp && deleteToast(toast.id)}
              >
                <p>{toast.message}</p>
                {!toast.isTemp && <span className="text-xl">×</span>}
              </button>
            </motion.li>
          ))}
      </AnimatePresence>
    </ul>
  );
};

export { Toaster };
