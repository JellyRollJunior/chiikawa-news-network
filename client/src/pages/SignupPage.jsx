import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Signup } from '../components/Signup.jsx';

const SignupPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <FullPageFormWrapper>
        <Signup />
      </FullPageFormWrapper>
    </ToastProvider>
  );
};

export { SignupPage };
