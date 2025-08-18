import { useContext } from 'react';
import { Profile } from '../components/Profile.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { HomeAsideLayout } from '../components/HomeAsideLayout.jsx';

const ProfilePage = () => {
  const { id, username, bio, avatar, isLoading } = useContext(CurrentContext);

  return (
    <HomeAsideLayout>
      <div className="mt-12 px-4">
        <Profile
          userId={id}
          username={username}
          bio={bio}
          avatar={avatar}
          isLoading={isLoading}
        />
      </div>
    </HomeAsideLayout>
  );
};

export { ProfilePage };
