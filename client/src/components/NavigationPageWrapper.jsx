import { Link, useLocation } from 'react-router';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';

const NavigationPageWrapper = ({ children }) => {
  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      <nav className="md:w-18 fixed bottom-0 grid h-18 w-full grid-cols-6 items-center justify-center bg-gray-300 md:top-0 md:flex md:h-full md:flex-col md:justify-start md:gap-7 md:pt-8">
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400">
          <img className="w-11" src={logo} />
        </button>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400 md:mt-9">
          <Link to="/">
            <img className="w-11" src={home} alt="Home icon" />
          </Link>
        </button>
        <div className="mx-auto flex w-fit justify-center">
          <Link to="/chats">
            <img className="w-15" src={messages} alt="Home icon" />
          </Link>
        </div>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400">
          <Link to="/profile">
            <img className="w-14" src={profile} alt="Profile icon" />
          </Link>
        </button>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400">
          <Link to="/">
            <img className="w-14" src={users} />
          </Link>
        </button>
        <button className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400">
          <Link to="/">
            <img className="w-11" src={settings} />
          </Link>
        </button>
      </nav>
      <div className="md:pl-18 h-screen pb-12 md:pb-0">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
