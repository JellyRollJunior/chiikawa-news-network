const DotsMenuItem = ({ onClick, label, closeMenu }) => {
  return (
    <li>
      <button
        className="w-full text-nowrap px-3 py-1 text-start hover:bg-emerald-200"
        onClick={() => {
          onClick();
          closeMenu();
        }}
      >
        {label}
      </button>
    </li>
  );
};
export { DotsMenuItem };
