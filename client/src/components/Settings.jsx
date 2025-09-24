import { useLogout } from '../hooks/useLogout.js';
import { SettingsUserInfo } from './SettingsUserInfo.jsx';
import trioScouting from '../assets/images/trio-scouting.png';

const Settings = () => {
  const { logout } = useLogout();

  return (
    <div className="main-container relative mx-4 mt-3 mb-2 w-full max-w-lg px-2 pt-3 pb-3">
      <header className="yellow-block">
        <h2 className="font-chiikawa py-2 text-center text-lg md:text-2xl">
          Edit Settings
        </h2>
      </header>
      <SettingsUserInfo />
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
  );
};

export { Settings };
