const IncrementButton = ({ className, src, count, onClick, isDisabled = false }) => {
  return (
    <button
      className={`flex h-fit items-center disabled:bg-gray-100 ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <img className="w-4.5" src={src} />
      <div className="text-sm">{count}</div>
    </button>
  );
};

export { IncrementButton };
