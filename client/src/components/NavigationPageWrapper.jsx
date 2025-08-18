import { Link, useLocation } from 'react-router';
import { useLogout } from '../hooks/useLogout.js';
import logoutIcon from '../assets/svgs/logout.svg';
import homeIcon from '../assets/svgs/home.svg';
import homeFilledIcon from '../assets/svgs/home-filled.svg';
import accountIcon from '../assets/svgs/account.svg';
import accountFilledIcon from '../assets/svgs/account-filled.svg';
import messagesIcon from '../assets/svgs/messages.svg';
import messagesFilledIcon from '../assets/svgs/messages-filled.svg';

const NavigationPageWrapper = ({ children }) => {
  const { logout } = useLogout();
  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      <nav className="fixed bottom-0 grid h-12 w-full grid-cols-4 items-center justify-center bg-gray-300 md:top-0 md:flex md:h-full md:w-14 md:flex-col md:justify-start md:gap-11 md:pt-8">
        <button
          className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400"
          onClick={() => logout()}
        >
          <img className="w-9" src={logoutIcon} alt="Logout icon" />
        </button>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400 md:mt-5">
          <Link to="/">
            <img
              className="w-9"
              src={path == '/' ? homeFilledIcon : homeIcon}
              alt="Home icon"
            />
          </Link>
        </button>
        <div className="mx-auto flex w-fit justify-center">
          <img
            className="w-9"
            src={path.includes('chats') ? messagesFilledIcon : messagesIcon}
            alt="Home icon"
          />
        </div>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400">
          <Link to="/profile">
            <img
              className="w-9"
              src={path == '/profile' ? accountFilledIcon : accountIcon}
              alt="Profile icon"
            />
          </Link>
        </button>
      </nav>
      <div className="h-screen pb-12 md:pb-0 md:pl-14">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
