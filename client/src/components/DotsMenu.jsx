import {
  useEffect,
  useState,
  Children,
  isValidElement,
  cloneElement,
  useRef,
} from 'react';
import threeDots from '../assets/svgs/three-dots.svg';
import threeDotsHori from '../assets/svgs/three-dots-hori.svg';

const DotsMenu = ({ children, isVertical = true }) => {
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
    <div className="relative ml-auto" ref={menuRef}>
      <button
        className={`rounded-lg py-1 hover:bg-pink-200 ${!isVertical && 'px-2'}`}
        onClick={toggleMenu}
      >
        <img
          className={`${!isVertical && 'h-1'}`}
          src={isVertical ? threeDots : threeDotsHori}
        />
      </button>
      {isOpen && (
        <ul className="absolute top-1/1 right-0 overflow-clip rounded-md border-3 border-pink-200 bg-pink-50">
          {/* Pass close menu prop to children */}
          {Children.map(children, (child) =>
            isValidElement(child) ? cloneElement(child, { closeMenu }) : child
          )}
        </ul>
      )}
    </div>
  );
};

export { DotsMenu };
