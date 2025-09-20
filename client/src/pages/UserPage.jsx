import { useParams } from 'react-router';
import { UserProfile } from '../components/UserProfile.jsx';

const UserPage = () => {
  const { userId } = useParams();

  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-xl">
        <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col">
          <UserProfile userId={userId} />
        </div>
      </div>
    </div>
  );
};

export { UserPage };
