import {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
  useRef,
} from 'react';
import dotMenu from '../assets/svgs/three-dots.svg';

const HeaderMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const menuRef = useRef();

  // close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative ml-auto mt-1 self-center" ref={menuRef}>
      <button
        className="rounded-lg py-1 hover:bg-gray-200"
        onClick={toggleMenu}
      >
        <img src={dotMenu} />
      </button>
      {isOpen && (
        <ul className="top-1/1 border-1 absolute right-0 overflow-clip rounded-md border-gray-400">
          {/* Pass close menu prop to children */}
          {Children.map(children, (child) =>
            isValidElement(child) ? cloneElement(child, { closeMenu }) : child
          )}
        </ul>
      )}
    </div>
  );
};

export { HeaderMenu };
