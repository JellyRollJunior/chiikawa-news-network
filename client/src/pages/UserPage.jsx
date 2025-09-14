import { useParams } from 'react-router';
import { UserProfile } from '../components/UserProfile.jsx';

const UserPage = () => {
  const { userId } = useParams();


  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex max-w-xl">
        <UserProfile userId={userId} />
      </div>
    </div>
  );
};

export { UserPage };
