import { Users } from '../components/Users.jsx';

const UsersPage = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-xl">
        <Users />
      </div>
    </div>
  );
};

export { UsersPage };
