import { Fragment } from 'react';
import { Link, useLocation } from 'react-router';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';

const NavButton = ({ link, label, src, srcWidth, selected = false }) => {
  return (
    <Link
      className={`hover:bg-dotted flex h-full w-full items-end justify-center pb-0.5 hover:bg-pink-200 md:h-fit md:items-center md:pt-3 lg:justify-start lg:pl-4 ${
        selected ? 'md:bg-dotted md:bg-pink-300 md:rounded-md hover:bg-pink-300' : ''
      }`}
      to={link}
    >
      <div
        className={`flex flex-col items-center justify-center lg:flex-row lg:gap-3 ${
          selected
            ? 'scale-115 -translate-y-3 duration-300 ease-in-out md:translate-y-0 md:scale-100'
            : ''
        }`}
      >
        <img
          style={{ width: srcWidth }}
          className="drop-shadow-pink-outline"
          src={src}
        />
        <h3 className="text-shadow-wrap text-center font-bold">{label}</h3>
      </div>
    </Link>
  );
};

const createNavButton = (link, label, src, srcWidth, selected) => {
  return {
    link,
    label,
    src,
    srcWidth,
    selected,
  };
};

const NavigationPageWrapper = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const navButtons = [
    createNavButton('/', 'Home', home, '43px', path == '/'),
    createNavButton(
      '/chats',
      'Chats',
      messages,
      '69px',
      path.includes('chats')
    ),
    createNavButton('/profile', 'Profile', profile, '56px', path == '/profile'),
    createNavButton('/users', 'Users', users, '60px', path.includes('users')),
    createNavButton(
      '/settings',
      'Settings',
      settings,
      '35px',
      path == '/settings'
    ),
  ];
  return (
    <>
      {/* mobile nav */}
      <nav className="border-y-3 bg-dotted-sm md:border-y-3 fixed bottom-0 grid h-20 w-full grid-cols-5 border-pink-200 bg-pink-100 md:hidden">
        {navButtons.map((button) => (
          <Fragment key={button.label}>
            <NavButton
              link={button.link}
              label={button.label}
              src={button.src}
              srcWidth={button.srcWidth}
              selected={button.selected}
            />
          </Fragment>
        ))}
      </nav>
      {/* desktop nav */}
      <nav className="border-y-3 bg-dotted-sm lg:w-47 fixed bottom-0 top-0 gap-2 hidden h-full w-20 flex-col border-x-4 border-pink-200 bg-pink-100 md:flex">
        <div className="mb-10 mt-5 w-full lg:hidden">
          <NavButton link="/" label="C.N.N" src={logo} srcWidth="43px" />
        </div>
        <div className="mb-10 mt-5 hidden w-full lg:block">
          <NavButton
            link="/"
            label="Chiikawa News Network"
            src={logo}
            srcWidth="43px"
          />
        </div>
        {navButtons.slice(0, navButtons.length - 1).map((button) => (
          <Fragment key={button.label}>
            <NavButton
              link={button.link}
              label={button.label}
              src={button.src}
              srcWidth={button.srcWidth}
              selected={button.selected}
            />
          </Fragment>
        ))}
        <div className="md:mt-10 md:w-full">
          <NavButton
            link="/profile"
            label="Settings"
            src={settings}
            srcWidth="35px"
            selected={path == '/settings'}
          />
        </div>
      </nav>
      <div className="lg:pl-47 h-screen pb-20 md:pb-0 md:pl-20">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
