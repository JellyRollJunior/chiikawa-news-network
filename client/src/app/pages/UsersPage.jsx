import { Users } from '@/features/users/components/Users.jsx';

const UsersPage = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="main-container mx-4 mt-3 mb-2 flex w-full flex-1 flex-col md:max-w-xl">
        <Users />
      </div>
    </div>
  );
};

export { UsersPage };
