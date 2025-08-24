import { useContext } from 'react';
import { ToastContext } from '../contexts/ToastProvider.jsx';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react';

const Toaster = () => {
  const { toasts, deleteToast } = useContext(ToastContext);

  return (
    <ul className="z-1 absolute top-5 flex w-full flex-col items-center gap-2">
      <AnimatePresence>
        {toasts &&
          toasts.map((toast) => (
            <motion.li
              className={`flex items-center justify-center ${toast.isError ? `blue-button` : `pink-button`}`}
              key={toast.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="flex items-center gap-3 py-1 pl-7 pr-6"
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
