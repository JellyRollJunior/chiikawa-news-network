import { Link, useLocation } from 'react-router';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';

const NavButton = ({ link, label, src, srcWidth = '2.75rem', style }) => {
  return (
    <button
      style={style}
      className="mx-auto flex w-fit justify-center rounded-2xl px-1 py-1 hover:bg-gray-400"
    >
      <Link
        className="flex flex-col items-center justify-center lg:flex-row"
        to={link}
      >
        <img style={{ width: srcWidth }} src={src} />
        <h3 className='hidden font-bold md:block'>{label}</h3>
      </Link>
    </button>
  );
};

const NavigationPageWrapper = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <nav className="md:w-18 h-18 fixed bottom-0 grid w-full grid-cols-6 items-center justify-center bg-gray-300 md:top-0 md:flex md:h-full md:flex-col md:justify-start md:gap-3 md:pt-8">
        <NavButton link="/" label="" src={logo} />
        <NavButton
          link="/"
          label="home"
          src={home}
          srcWidth="2.75rem"
          style={{ marginTop: '3.5rem' }}
        />
        <NavButton
          link="/chats"
          label="chats"
          src={messages}
          srcWidth="3.75rem"
        />
        <NavButton
          link="/profile"
          label="profile"
          src={profile}
          srcWidth="3.5rem"
        />
        <NavButton
          link="/profile"
          label="users"
          src={users}
          srcWidth="3.5rem"
        />
        <NavButton
          link="/profile"
          label="settings"
          src={settings}
          srcWidth="2.75rem"
        />
      </nav>
      <div className="md:pl-18 h-screen pb-12 md:pb-0">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
