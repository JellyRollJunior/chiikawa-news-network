const Notice = ({ className, title, footer, children }) => {
  return (
    <div
      className={`main-container flex w-full max-w-2xl gap-2 px-3 pt-3 pb-2.5 md:pt-3.5 ${className}`}
    >
      <div className="duckegg-block w-3.5 self-stretch" />
      <div className="flex flex-1 flex-col gap-2">
        <header className="yellow-block w-full pt-3 pb-2">
          <h2 className="text-shadow-wrap font-chiikawa text-center text-lg font-bold">
            {title}
          </h2>
        </header>
        <div className="duckegg-block h-4" />
        <main>{children}</main>
        <div className="duckegg-block h-4" />
        <footer className="yellow-block pt-3 pb-2">{footer}</footer>
      </div>
      <div className="duckegg-block w-3.5 self-stretch" />
    </div>
  );
};

export { Notice };
