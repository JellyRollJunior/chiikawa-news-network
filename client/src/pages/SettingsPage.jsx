import { SettingsUserInfo } from '../components/SettingsUserInfo.jsx';
import trioScouting from '../assets/images/trio-scouting.png';
import { useLogout } from '../hooks/useLogout.js';

const SettingsPage = () => {
  const { logout } = useLogout();

  return (
    <div className="flex min-h-full justify-center">
      <div className="main-container relative mx-4 mb-2 mt-3 w-full max-w-lg px-2 pb-3 pt-3">
        <header className="yellow-block">
          <h2 className="font-chiikawa py-2 text-center text-lg md:text-2xl">Edit Settings</h2>
        </header>
        <SettingsUserInfo />
        <div className="yellow-block ml-auto mt-2 w-fit px-3 py-2">
          <button className="pink-button px-7 py-1" onClick={logout}>
            Logout
          </button>
        </div>
        <img className="drop-shadow-pink-outline absolute bottom-[6px] left-0 w-[100px]" src={trioScouting} />
      </div>
    </div>
  );
};

export { SettingsPage };
