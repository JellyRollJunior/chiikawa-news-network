import trioDrawing from '../assets/images/trio-drawing.png';
import kaniReading from '../assets/images/kani-reading.png';
import { LogoTitle } from '../shared/components/LogoTitle.jsx';

const FullPageFormWrapper = ({ children }) => {
  return (
    <div className="main-container relatie relative mx-4 flex h-fit max-w-md flex-1 flex-col items-center gap-2 px-3 pt-3 pb-2.5 md:pt-3.5 md:max-w-md">
      <header className="yellow-block font-chiikawa w-full pt-4 pb-2">
        <LogoTitle className="justify-center text-[14px] md:text-lg" />
      </header>
      {children}
      <img
        className="absolute -top-[40px] right-1/2 w-[200px] translate-x-1/2 drop-shadow-pink-outline "
        src={trioDrawing}
      />
      <img
        className="absolute -right-[16px] -bottom-[24px] w-[85px] drop-shadow-pink-outline "
        src={kaniReading}
      />
    </div>
  );
};

export { FullPageFormWrapper };
