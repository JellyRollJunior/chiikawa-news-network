import chiiLaying from '../assets/images/chiikawa-laying.png';

const Notice = ({ title, src, alt, footer }) => {
  return (
    <div className="main-container relative h-fit max-w-lg flex-col items-center px-2 py-3 text-xl font-medium">
      <img
        className="absolute -bottom-[32px] -right-[12px] w-[100px]"
        src={chiiLaying}
      />
      <header className="text-shadow-wrap yellow-block py-2 text-center text-3xl font-bold">
        {title}
      </header>
      <main>
        <div className="pink-block mt-3 py-2 text-center text-3xl font-bold">
          <img
            className="drop-shadow-pink-outline m-auto"
            src={src}
            alt={alt}
          />
        </div>
        <p className="text-shadow-wrap yellow-block mt-3 px-4 py-3 text-center">
          {footer}
        </p>
      </main>
    </div>
  );
};

export { Notice };
