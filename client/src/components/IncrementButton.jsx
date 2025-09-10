const IncrementButton = ({ src, count, onClick, isDisabled = false }) => {
  return (
    <button
      className="flex h-fit items-center gap-1 rounded-xl border-1 border-pink-200 py-1 pr-4 pl-2.5 disabled:bg-gray-100"
      onClick={onClick}
      disabled={isDisabled}
    >
      <img className="w-4.5" src={src} />
      <div className="text-sm">{count}</div>
    </button>
  );
};

export { IncrementButton };
