import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <FullPageFormWrapper>
        <Login />
      </FullPageFormWrapper>
    </ToastProvider>
  );
};

export { LoginPage };
