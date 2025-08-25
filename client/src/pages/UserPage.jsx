import { useParams } from 'react-router';
import { User } from '../components/User.jsx';

const UserPage = () => {
  const { userId } = useParams();

  return (
    <div className="flex min-h-full justify-center">
      <User userId={userId} />
    </div>
  );
};

export { UserPage };
