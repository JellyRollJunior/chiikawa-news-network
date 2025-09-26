import { Toaster } from '../components/Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import { FullPageFormWrapper } from '../components/FullPageFormWrapper.jsx';
import { Login } from '../components/Login.jsx';

const LoginPage = () => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen">
        <aside className="mr-4 hidden flex-5 items-center justify-end md:flex">
          <div className="main-container mx-6 flex w-full max-w-2xl gap-2 px-3 pt-3 pb-2.5 md:pt-3.5">
            <div className="duckegg-block self-stretch w-3.5" />
            <div className='flex flex-col gap-2 flex-1'>
              <header className="yellow-block w-full pt-3 pb-2">
                <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
                  Dive into the world of Chiikawa!
                </h2>
              </header>
              <div className="duckegg-block h-4" />
              <main className="pink-block h-90"></main>
              <div className="duckegg-block h-4" />
              <footer className="yellow-block w-full pt-3 pb-2">
                <p className="text-shadow-wrap text-center">Hello everyNyan!</p>
              </footer>
            </div>
            <div className="duckegg-block self-stretch w-3.5" />
          </div>
        </aside>
        <div className="flex flex-4 justify-center self-center">
          <FullPageFormWrapper>
            <Login />
          </FullPageFormWrapper>
        </div>
      </div>
    </ToastProvider>
  );
};

export { LoginPage };
