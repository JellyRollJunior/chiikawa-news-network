import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <aside className="mr-4 hidden flex-5 items-center justify-center md:flex">
          {/* slideshow of images + hero statement */}
        </aside>
        <div className="flex-4 self-center justify-center flex">
          <FullPageFormWrapper>
            <Login />
          </FullPageFormWrapper>
        </div>
      </div>
    </ToastProvider>
  );
};

export { LoginPage };
