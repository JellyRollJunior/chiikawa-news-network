import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';

const NavButton = ({
  className = '',
  link,
  label,
  src,
  srcWidth,
  translateX = '0',
  isSelected = false,
}) => {
  return (
    <Link
      className={`hover:bg-dotted flex h-full w-full items-end justify-center pb-1 hover:bg-pink-200 md:h-fit md:items-center md:pt-3 md:pb-3 ${className} ${
        isSelected && 'md:bg-dotted hover:bg-pink-300 md:bg-pink-300'
      }`}
      to={link}
    >
      <div
        className={`flex flex-col items-center justify-center opacity-90 ${
          isSelected
            ? `-translate-y-3 scale-115 opacity-100 duration-300 ease-in-out md:translate-y-0 md:translate-x-${translateX} md:scale-110`
            : ''
        }`}
      >
        <img className={`drop-shadow-pink-outline ${srcWidth}`} src={src} />
        <h3
          className={`text-shadow-wrap font-chiikawa mt-1 text-center text-xs ${isSelected && 'font-bold'}`}
        >
          {label}
        </h3>
      </div>
    </Link>
  );
};

const RenderNavButtons = ({ buttonArray = [] }) => {
  if (!Array.isArray(buttonArray)) return;
  return buttonArray.map((button) => (
    <Fragment key={button.label}>
      <NavButton
        link={button.link}
        label={button.label}
        src={button.src}
        srcWidth={button.srcWidth}
        isSelected={button.isSelected}
      />
    </Fragment>
  ));
};

const NavigationPageWrapper = ({ children }) => {
  const { id } = useContext(CurrentContext);
  const location = useLocation();
  const path = location.pathname;

  // Nav buttons
  const cnnButton = { className: '', link: '/', label: 'CNN', src: logo, srcWidth: 'w-[43px]', translateX: '0', isSelected: false, }
  const homeButton = { className: '', link: '/', label: 'Home', src: home, srcWidth: 'w-[43px]', translateX: '0', isSelected: path == '/', }
  const chatsButton = { className: '', link: '/chats', label: 'Chats', src: messages, srcWidth: 'w-[69px]', translateX: '0', isSelected: path.includes('chats'), }
  const profileButton = { className: '', link: `/users/${id}`, label: 'Profile', src: profile, srcWidth: 'w-[56px]', translateX: '0', isSelected: path == `/users/${id}`, }
  const usersButton = { className: '', link: '/users', label: 'Users', src: users, srcWidth: 'w-[60px]', translateX: '0', isSelected: path.includes('users') && path != `/users/${id}`, }
  const settingsButton = { className: '', link: '/settings', label: 'Edit', src: settings, srcWidth: 'w-[35px]', translateX: '0', isSelected: path == '/settings', }

  // Mobile + Desktop button display order
  const navButtonsMobile = [
    usersButton,
    chatsButton,
    homeButton,
    profileButton,
    settingsButton,
  ];
  const navButtonsDesktop = [
    homeButton,
    chatsButton,
    profileButton,
    usersButton,
  ];
  return (
    <>
      {/* mobile nav */}
      <nav className="bg-dotted-sm fixed bottom-0 isolate z-10 grid h-20 w-full grid-cols-5 rounded-t-md border-t-3 border-b-2 border-pink-200 bg-pink-100 md:hidden md:border-y-3">
        <RenderNavButtons buttonArray={navButtonsMobile} />
      </nav>
      {/* desktop nav */}
      <nav className="bg-dotted-sm fixed top-0 bottom-0 isolate z-10 hidden h-full w-21 flex-col rounded-r-sm border-x-4 border-r-3 border-l-2 border-pink-200 bg-pink-100 md:flex">
        <div className="mt-5 mb-10 w-full">
          <RenderNavButtons buttonArray={[cnnButton]} />
        </div>
        <RenderNavButtons buttonArray={navButtonsDesktop} />
        <div className="md:mt-10 md:w-full">
          <RenderNavButtons buttonArray={[settingsButton]} />
        </div>
      </nav>
      <div className="h-screen pb-20 md:pb-0 md:pl-21">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
