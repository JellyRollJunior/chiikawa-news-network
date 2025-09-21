import chiiLaying from '../assets/images/chiikawa-laying.png';

const Notice = ({ title, src, alt, footer }) => {
  return (
    <div className="main-container relative h-fit max-w-lg flex-col items-center px-3 pt-3.5 pb-2.5 text-xl font-medium">
      <header className="yellow-block">
        <h2 className="text-shadow-wrap py-2 text-center text-3xl font-bold">
          {title}
        </h2>
      </header>
      <main>
        <div className="pink-block mt-2 py-2 text-center text-3xl font-bold">
          <img
            className="drop-shadow-pink-outline m-auto"
            src={src}
            alt={alt}
          />
        </div>
        <p className="text-shadow-wrap yellow-block mt-2 px-4 py-3 text-center">
          {footer}
        </p>
      </main>
      <img
        className="absolute -right-[12px] -bottom-[32px] w-[100px]"
        src={chiiLaying}
      />
    </div>
  );
};

export { Notice };
