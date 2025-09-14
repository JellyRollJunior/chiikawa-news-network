import { useParams } from 'react-router';
import { UserProfile } from '../components/UserProfile.jsx';

const UserPage = () => {
  const { userId } = useParams();


  return (
    <div className="flex h-full w-full max-w-lg justify-center">
      <UserProfile userId={userId} />
    </div>
  );
};

export { UserPage };
