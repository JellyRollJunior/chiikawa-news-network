import { Toaster } from './Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';

const FullPageFormWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen flex-col items-center">
        <h1 className="mt-36 text-5xl font-extrabold italic">Socket Lovers</h1>
        {children}
      </div>
    </ToastProvider>
  );
};

export { FullPageFormWrapper };
