import logo from '../assets/nav/chiikawa-glasses.png';

const LogoTitle = ({ className, text = 'Chiikawa News Network' }) => {
  return (
    <header
      className={`flex items-center gap-2 text-center ${className}`}
    >
      <img
        className="w-[43px]"
        src={logo}
        alt="Chiikawa with glasses (CNN Logo)"
      />
      <h1 className="text-shadow-wrap font-chiikawa md:my-2">
        {text}
      </h1>
    </header>
  );
};

export { LogoTitle };
