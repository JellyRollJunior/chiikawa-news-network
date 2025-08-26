import { Fragment, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';

const NavButton = ({ link, label, src, srcWidth, selected = false }) => {
  return (
    <Link
      className={`hover:bg-dotted font-chiikawa flex h-full w-full items-end justify-center pb-1 text-xs hover:bg-pink-200 md:h-fit md:items-center md:pt-3 ${
        selected
          ? 'md:bg-dotted hover:bg-pink-300 md:rounded-md md:bg-pink-300'
          : ''
      }`}
      to={link}
    >
      <div
        className={`flex flex-col items-center justify-center ${
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
        <h3 className="text-shadow-wrap mt-1 text-center font-bold">{label}</h3>
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
  const { id } = useContext(CurrentContext);
  const location = useLocation();
  const path = location.pathname;

  const usersButton = createNavButton(
    '/users',
    'Users',
    users,
    '60px',
    path.includes('users') && path != `/users/${id}`
  );
  const chatsButton = createNavButton(
    '/chats',
    'Chats',
    messages,
    '69px',
    path.includes('chats')
  );
  const homeButton = createNavButton('/', 'Home', home, '43px', path == '/');
  const profileButton = createNavButton(
    `/users/${id}`,
    'Profile',
    profile,
    '56px',
    path == `/users/${id}`
  );
  const settingsButton = createNavButton(
    '/settings',
    'Edit',
    settings,
    '35px',
    path == '/settings'
  );
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
      <nav className="border-t-3 bg-dotted-sm md:border-y-3 fixed bottom-0 grid h-20 w-full grid-cols-5 rounded-t-md border-b-2 border-pink-200 bg-pink-100 md:hidden">
        {navButtonsMobile.map((button) => (
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
      <nav className="border-r-3 bg-dotted-sm w-21 fixed bottom-0 top-0 hidden h-full flex-col rounded-r-sm border-x-4 border-l-2 border-pink-200 bg-pink-100 md:flex">
        <div className="mb-10 mt-5 w-full">
          <NavButton link="/" label="CNN" src={logo} srcWidth="43px" />
        </div>
        {navButtonsDesktop.map((button) => (
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
      <div className="md:pl-21 h-screen pb-20 md:pb-0">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
