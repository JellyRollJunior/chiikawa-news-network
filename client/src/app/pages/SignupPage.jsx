import { Toaster } from '@/shared/components/Toaster.jsx';
import { ToastProvider } from '@/shared/providers/ToastProvider.jsx';
import { AuthFormWrapper } from '@/features/auth/components/AuthFormWrapper.jsx';
import { Signup } from '@/features/auth/components/Signup.jsx';

const SignupPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen w-screen items-center justify-center">
        <AuthFormWrapper>
          <Signup />
        </AuthFormWrapper>
      </div>
    </ToastProvider>
  );
};

export { SignupPage };
