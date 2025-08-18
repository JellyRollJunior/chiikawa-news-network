const HeaderMenuItem = ({ onClick, label, closeMenu }) => {
  return (
    <li>
      <button
        className="w-full text-nowrap text-start bg-white px-3 py-1 hover:bg-gray-200"
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
