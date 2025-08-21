const HeaderMenuItem = ({ onClick, label, closeMenu }) => {
  return (
    <li>
      <button
        className="w-full text-nowrap text-start px-3 py-1 hover:bg-emerald-200"
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
export { HeaderMenuItem };
