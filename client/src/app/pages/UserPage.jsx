import { useParams } from 'react-router';
import { UserProfile } from '@/features/users/components/UserProfile.jsx';

const UserPage = () => {
  const { userId } = useParams();

  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-xl">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
};

export { UserPage };
