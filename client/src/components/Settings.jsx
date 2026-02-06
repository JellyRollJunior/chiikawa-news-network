import { useLogout } from '../hooks/useLogout.js';
import { LogoTitle } from '@/shared/components/LogoTitle.jsx';
import { SettingsEditAvatar } from './SettingsEditAvatar.jsx';
import { SettingsEditBio } from './SettingsEditBio.jsx';
import trioScouting from '../assets/images/trio-scouting.png';
import SimpleBar from 'simplebar-react';

const Settings = () => {
  const { logout } = useLogout();

  return (
    <div className="main-container mx-4 mt-3 mb-2 w-full max-w-lg">
      <SimpleBar className="h-full">
        <div className="relative px-3 pt-3 pb-2.5 md:pt-3.5">
          <header className="yellow-block flex justify-center pt-1 pb-0.5">
            <LogoTitle className="text-lg md:text-2xl" text="Edit Settings" />
          </header>
          <section className="mt-2">
            <SettingsEditAvatar />
          </section>
          <section className="mt-2">
            <SettingsEditBio />
          </section>
          <div className="yellow-block mt-2 ml-auto w-fit px-3 py-3.5">
            <button className="pink-button px-7 py-1" onClick={logout}>
              Logout
            </button>
          </div>
          <img
            className="drop-shadow-pink-outline absolute bottom-[6px] left-0 w-[100px]"
            src={trioScouting}
          />
        </div>
      </SimpleBar>
    </div>
  );
};

export { Settings };
