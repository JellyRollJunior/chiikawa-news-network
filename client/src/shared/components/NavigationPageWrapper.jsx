import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';

import logo from '@/assets/nav/chiikawa-glasses.png';
import home from '@/assets/nav/chiikawa-book.png';
import messages from '@/assets/nav/chii-hachi-hearts.png';
import profile from '@/assets/nav/chii-usagi-silly.png';
import users from '@/assets/nav/chii-kuri-drinks.png';
import settings from '@/assets/nav/usagi-business.png';

const NavButton = ({
  className = '',
  link,
  label,
  src,
  srcWidth,
  isSelected = false,
  selectedStyling = 'md:bg-duckegg-dark md:bg-none'
}) => {
  return (
    <Link
      className={`flex h-full w-full items-end justify-center md:h-fit md:items-center ${className} ${
        isSelected && `underline underline-offset-3 decoration-dashed decoration-1.5 ${selectedStyling}`
      }`}
      to={link}
    >
      <div
        className={`flex flex-col items-center justify-center opacity-90 ${
          isSelected
            ? `-translate-y-3 scale-115 opacity-100 duration-300 ease-in-out md:translate-y-0 md:scale-110`
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
        className={button.className}
        link={button.link}
        label={button.label}
        src={button.src}
        srcWidth={button.srcWidth}
        isSelected={button.isSelected}
        selectedStyling={button.selectedStyling && button.selectedStyling}
      />
    </Fragment>
  ));
};

const NavigationPageWrapper = ({ children }) => {
  const { id } = useContext(CurrentContext);
  const location = useLocation();
  const path = location.pathname;

  // Nav buttons
  const cnnButton = { className: 'md:pink-block pb-1 md:pt-1.5', link: '/', label: 'CNN', src: logo, srcWidth: 'w-[43px]', isSelected: false, }
  const homeButton = { className: 'md:duckegg-block pb-1 md:pb-2.5 md:pt-2', link: '/', label: 'Home', src: home, srcWidth: 'w-[43px]', isSelected: path == '/', }
  const chatsButton = { className: 'md:duckegg-block pb-1 md:pb-2.5 md:pt-2', link: '/chats', label: 'Chats', src: messages, srcWidth: 'w-[69px]', isSelected: path.includes('chats'), }
  const profileButton = { className: 'md:duckegg-block pb-1 md:pb-2.5 md:pt-1', link: `/users/${id}`, label: 'Profile', src: profile, srcWidth: 'w-[56px]', isSelected: path == `/users/${id}`, }
  const usersButton = { className: 'md:duckegg-block pb-1 md:pb-2.5 md:pt-1.5', link: '/users', label: 'Users', src: users, srcWidth: 'w-[60px]', isSelected: path.includes('users') && path != `/users/${id}`, }
  const settingsButton = { className: 'md:yellow-block pb-1 md:pb-2 md:pt-1.5', link: '/settings', label: 'Edit', src: settings, srcWidth: 'w-[35px]', isSelected: path == '/settings', selectedStyling: 'md:yellow-gradient-dark' }

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
      <nav className="bg-dotted-sm fixed gap-2 top-0 bottom-0 isolate z-10 hidden h-full w-24 px-1.5 flex-col rounded-r-sm border-x-4 border-r-3 border-l-2 border-pink-200 bg-pink-100 md:flex">
        <div className='pink-block h-4 mt-2' />
        <RenderNavButtons buttonArray={[cnnButton]} />
        <div className='duckegg-block h-4 ' />
        <RenderNavButtons buttonArray={navButtonsDesktop} />
        <div className='yellow-block h-4 ' />
        <RenderNavButtons buttonArray={[settingsButton]} />
      </nav>
      <div className="h-[100svh] pb-20 md:pb-0 md:pl-24">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
