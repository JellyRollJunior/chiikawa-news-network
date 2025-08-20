import { Link, useLocation } from 'react-router';
import logo from '../assets/nav/chiikawa-glasses.png';
import home from '../assets/nav/chiikawa-book.png';
import messages from '../assets/nav/chii-hachi-hearts.png';
import profile from '../assets/nav/chii-usagi-silly.png';
import users from '../assets/nav/chii-kuri-drinks.png';
import settings from '../assets/nav/usagi-business.png';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';

const NavButton = ({ link, label, src, srcWidth, selected = false }) => {
  const selectedAnimation = selected
    ? {
        translateY: '-10px',
        scale: 1.1,
      }
    : null;

  return (
    <button className="hover:bg-dotted flex h-full w-full items-end justify-center pb-0.5 hover:bg-pink-200">
      <motion.div animate={selectedAnimation}>
        <Link
          className="flex flex-col items-center justify-center lg:flex-row"
          to={link}
        >
          <img
            style={{ width: srcWidth }}
            className="drop-shadow-pink-outline"
            src={src}
          />
          <h3 className="text-shadow-wrap font-bold">{label}</h3>
        </Link>
      </motion.div>
    </button>
  );
};

const NavigationPageWrapper = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <nav className="md:w-18 border-y-3 bg-dotted-sm fixed bottom-0 grid h-20 w-full grid-cols-5 border-pink-200 bg-pink-100 md:top-0 md:flex md:h-full md:flex-col md:justify-start md:gap-3">
        <div className="hidden h-full w-full md:block">
          <NavButton link="/" label="CNN" src={logo} srcWidth="43px" />
        </div>
        <NavButton
          link="/"
          label="Home"
          src={home}
          srcWidth="43px"
          selected={path == '/'}
        />
        <NavButton
          link="/chats"
          label="Chats"
          src={messages}
          srcWidth="69px"
          selected={path.includes('chats')}
        />
        <NavButton
          link="/profile"
          label="Profile"
          src={profile}
          srcWidth="56px"
          selected={path == '/profile'}
        />
        <NavButton
          link="/profile"
          label="Users"
          src={users}
          srcWidth="60px"
          selected={path.includes('users')}
        />
        <NavButton
          link="/profile"
          label="Settings"
          src={settings}
          srcWidth="35px"
          selected={path == '/settings'}
        />
      </nav>
      <div className="md:pl-18 h-screen pb-20 md:pb-0">{children}</div>
    </>
  );
};

export { NavigationPageWrapper };
