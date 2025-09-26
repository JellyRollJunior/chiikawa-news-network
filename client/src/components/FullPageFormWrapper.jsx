import { Toaster } from './Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import trioDrawing from '../assets/images/trio-drawing.png';
import kaniReading from '../assets/images/kani-reading.png';
import { LogoTitle } from './LogoTitle.jsx';

const FullPageFormWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="main-container relatie relative mx-4 flex h-fit max-w-md flex-1 flex-col items-center gap-2 px-3 pt-3 pb-2.5 md:pt-3.5">
          <header className="yellow-block font-chiikawa w-full pt-4 pb-2">
            <LogoTitle className="justify-center text-[14px] md:text-lg" />
          </header>
          {children}
          <img
            className="absolute -top-[40px] right-1/2 w-[200px] translate-x-1/2"
            src={trioDrawing}
          />
          <img
            className="absolute -right-[16px] -bottom-[24px] w-[100px]"
            src={kaniReading}
          />
        </div>
      </div>
    </ToastProvider>
  );
};

export { FullPageFormWrapper };
