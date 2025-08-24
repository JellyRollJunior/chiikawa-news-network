import { Toaster } from './Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import trioDrawing from '../assets/images/trio-drawing.png';
import kaniReading from '../assets/images/kani-reading.png';

const FullPageFormWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="main-container relatie relative mx-4 flex h-fit max-w-md flex-1 flex-col items-center px-2 py-3">
          <img
            className="absolute -top-[48px] right-1/2 w-[240px] translate-x-1/2"
            src={trioDrawing}
          />
          <img
            className="absolute -bottom-[24px] -right-[16px] w-[100px]"
            src={kaniReading}
          />
          <header className="yellow-block font-chiikawa w-full pb-3 pt-4">
            <h1 className="text-shadow-wrap text-center text-3xl font-extrabold italic">
              Chiikawa
              <br />
              News Network
            </h1>
          </header>
          {children}
        </div>
      </div>
    </ToastProvider>
  );
};

export { FullPageFormWrapper };
