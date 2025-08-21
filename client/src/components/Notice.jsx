const Notice = ({ title, src, alt, footer }) => {
  return (
    <div className="bg-dotted-sm border-5 h-fit flex-col items-center rounded-xl border-pink-200 bg-pink-100 px-2 py-3 text-xl font-medium">
      <header className="block-shadow text-shadow-wrap yellow-block rounded-lg py-2 text-center text-3xl font-bold">
        {title}
      </header>
      <main>
        <div className="pink-block block-shadow mt-3 rounded-lg py-2 text-center text-3xl font-bold">
          <img
            className="drop-shadow-pink-outline m-auto"
            src={src}
            alt={alt}
          />
        </div>
        <p className="block-shadow text-shadow-wrap yellow-block mt-3 rounded-lg px-4 py-3 text-center">
          {footer}
        </p>
      </main>
    </div>
  );
};

export { Notice };
