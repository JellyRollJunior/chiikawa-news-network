import { Link } from 'react-router';
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
      className="flex h-full w-full items-end justify-center pb-1 hover:bg-gray-400"
    >
      <Link
        className="flex flex-col items-center justify-center lg:flex-row"
        to={link}
      >
        <img style={{ width: srcWidth }} src={src} />
        <h3 className="text-shadow-wrap font-bold">{label}</h3>
      </Link>
    </button>
  );
};

const NavigationPageWrapper = ({ children }) => {
  return (
    <>
      <nav className="md:w-18 fixed bottom-0 grid h-20 w-full grid-cols-5 bg-gray-300 md:top-0 md:flex md:h-full md:flex-col md:justify-start md:gap-3">
        <div className="hidden h-full w-full md:block">
          <NavButton link="/" label="CNN" src={logo} />
        </div>
        <NavButton link="/" label="Home" src={home} srcWidth="2.5rem" />
        <NavButton
          link="/chats"
          label="Chats"
          src={messages}
          srcWidth="3.75rem"
        />
        <NavButton
          link="/profile"
          label="Profile"
          src={profile}
          srcWidth="3.5rem"
        />
        <NavButton
          link="/profile"
          label="Users"
          src={users}
          srcWidth="3.5rem"
        />
        <NavButton
          link="/profile"
          label="Settings"
          src={settings}
          srcWidth="2.2rem"
        />
      </nav>
      <div className="md:pl-18 h-screen pb-20 md:pb-0">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
