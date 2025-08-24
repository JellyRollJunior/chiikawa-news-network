import { Toaster } from './Toaster.jsx';
import { ToastProvider } from '../contexts/ToastProvider.jsx';
import trioDrawing from '../assets/images/trio-drawing.png';

const FullPageFormWrapper = ({ children }) => {
  return (
    <ToastProvider>
      <Toaster />
      <div className="flex h-screen w-screen justify-center">
        <div className="main-container relatie relative mx-2 mt-36 flex h-fit max-w-md flex-1 flex-col items-center px-2 py-3">
          <img
            className="absolute -top-[42px] right-1/2 w-[200px] translate-x-1/2"
            src={trioDrawing}
          />
          <header className="yellow-block w-full py-2">
            <h1 className="text-shadow-wrap text-center text-3xl font-extrabold italic">
              Chiikawa News
              <br />
              Network
            </h1>
          </header>
          {children}
        </div>
      </div>
    </ToastProvider>
  );
};

export { FullPageFormWrapper };
