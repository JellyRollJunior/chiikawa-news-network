import { SettingsUserInfo } from '../components/SettingsUserInfo.jsx';
import trioScouting from '../assets/images/trio-scouting.png';
import momonga from '../assets/icons/momonga-icon.png';
import { useLogout } from '../hooks/useLogout.js';

const SettingsPage = () => {
  const { logout } = useLogout();

  return (
    <div className="flex min-h-full justify-center">
      <div className="main-container relative mx-4 mb-2 mt-3 w-full max-w-md px-2 pb-3 pt-3">
        <header className="yellow-block">
          <h2 className="font-chiikawa py-2 text-center text-lg">Edit Settings</h2>
        </header>
        <SettingsUserInfo />
        <section className='yellow-block px-4 py-2 mt-2 w-1/2 ml-auto'>
          <button className='pink-button px-7 py-1 w-full' onClick={logout}>Logout</button>
        </section>
        <img className="drop-shadow-pink-outline absolute bottom-[6px] left-0 w-[100px]" src={trioScouting} />
        <img className="drop-shadow-pink-outline absolute bottom-[8px] right-[8px] w-[50px]" src={momonga} />
      </div>
    </div>
  );
};

export { SettingsPage };
