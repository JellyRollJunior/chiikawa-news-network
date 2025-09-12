import logo from '../assets/nav/chiikawa-glasses.png';

const HomeHeader = ({ className }) => {
  return (
    <header className={`flex items-center gap-2 ${className}`}>
      <img
        className="w-[43px]"
        src={logo}
        alt="Chiikawa with glasses (CNN Logo)"
      />
      <h1 className="text-shadow-wrap font-chiikawa text-center text-[15px]">
        Chiikawa News Network
      </h1>
    </header>
  );
};

export { HomeHeader };
