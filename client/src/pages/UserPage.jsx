import { useParams } from 'react-router';
import { UserProfile } from '../components/UserProfile.jsx';

const UserPage = () => {
  const { userId } = useParams();

  return (
    <div className="flex min-h-full justify-center">
      <div className="main-container mx-4 mb-2 mt-3 w-full max-w-lg px-2 pb-3 pt-3">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
};

export { UserPage };
