import { Users } from '../components/Users.jsx';

const UsersPage = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="flex w-full max-w-sm">
        <div className="main-container scrollbar-thin mx-4 mt-3 mb-2 flex flex-1 flex-col overflow-y-scroll">
          <Users />
        </div>
      </div>
    </div>
  );
};

export { UsersPage };
