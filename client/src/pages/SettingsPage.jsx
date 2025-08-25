import { useContext } from 'react';
import { SettingsUserInfo } from '../components/Profile.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const SettingsPage = () => {
  const { id, username, bio, avatar, isLoading } = useContext(CurrentContext);

  return (
    <div className="flex min-h-full justify-center">
      <div className="main-container mx-4 mb-2 mt-3 w-full max-w-md px-2 pb-3 pt-3">
        <SettingsUserInfo
          userId={id}
          username={username}
          bio={bio}
          avatar={avatar}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export { SettingsPage };
