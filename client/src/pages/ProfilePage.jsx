import { useContext } from 'react';
import { Profile } from '../components/Profile.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const ProfilePage = () => {
  const { id, username, bio, avatar, isLoading } = useContext(CurrentContext);

  return (
    <div className="flex min-h-full justify-center">
      <Profile
        userId={id}
        username={username}
        bio={bio}
        avatar={avatar}
        isLoading={isLoading}
      />
    </div>
  );
};

export { ProfilePage };
