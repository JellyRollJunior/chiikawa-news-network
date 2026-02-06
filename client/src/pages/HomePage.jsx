import { Home } from '@/components/Home.jsx';
import { HomeUsersAside } from '@/features/users/components/HomeUsersAside.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full w-full justify-between">
      <div className="flex flex-1 w-full justify-center">
        <Home />
      </div>
      <HomeUsersAside />
    </div>
  );
};

export { HomePage };
