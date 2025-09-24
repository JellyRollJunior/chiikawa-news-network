import { useLogout } from '../hooks/useLogout.js';
import { LogoTitle } from './LogoTitle.jsx';
import { SettingsEditAvatar } from './SettingsEditAvatar.jsx';
import { SettingsEditBio } from './SettingsEditBio.jsx';
import trioScouting from '../assets/images/trio-scouting.png';

const Settings = () => {
  const { logout } = useLogout();

  return (
    <div className="main-container relative mx-4 mt-3 mb-2 w-full max-w-lg">
      <div className="scrollbar-thin overflow-y-scroll px-3 pt-3 pb-2.5 md:pt-3.5 md:pr-1">
        <header className="yellow-block flex justify-center">
          <LogoTitle className="text-lg md:text-2xl" text="Edit Settings" />
        </header>
        <section className="mt-2">
          <SettingsEditAvatar />
        </section>
        <SettingsEditBio />
        <div className="yellow-block mt-2 ml-auto w-fit px-3 py-2">
          <button className="pink-button px-7 py-1" onClick={logout}>
            Logout
          </button>
        </div>
        <img
          className="drop-shadow-pink-outline absolute bottom-[6px] left-0 w-[100px]"
          src={trioScouting}
        />
      </div>
    </div>
  );
};

export { Settings };
