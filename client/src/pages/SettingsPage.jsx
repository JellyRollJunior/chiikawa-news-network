import { SettingsUserInfo } from '../components/SettingsUserInfo.jsx';

const SettingsPage = () => {
  return (
    <div className="flex min-h-full justify-center">
      <div className="main-container mx-4 mb-2 mt-3 w-full max-w-md px-2 pb-3 pt-3">
        <SettingsUserInfo />
      </div>
    </div>
  );
};

export { SettingsPage };
