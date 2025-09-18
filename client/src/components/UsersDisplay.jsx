import { useUsers } from '../hooks/useUsers.js';
import { Avatar } from './Avatar.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

const UsersDisplay = () => {
  const { users, loading } = useUsers();

  console.log(users);
  return (
    <div className="main-container scrollbar-thin mx-4 mt-3 mb-2 flex flex-1 flex-col overflow-y-scroll">
      <header className="mt-3 flex items-center justify-center gap-2">
        <img
          className="w-[43px]"
          src={logo}
          alt="Chiikawa with glasses (CNN Logo)"
        />
        <h1 className="text-shadow-wrap font-chiikawa text-center text-xl md:my-2 md:text-lg">
          Users
        </h1>
      </header>
      <ul className="mx-2 mt-3 mb-2 flex flex-col gap-2">
        {users &&
          users.map((user) => (
            <li
              className="yellow-block flex flex-col px-2 pt-3 pb-2"
              key={user.id}
            >
              <div className="ml-2 flex md:text-lg">
                <Avatar
                  className="size-[80px] md:size-[90px]"
                  avatar={user.avatar}
                />
                <div className="flex flex-col gap-2">
                  <div>{user.username}</div>
                  <div>{user.bio}</div>
                  <button>View profile</button>
                </div>
              </div>
              <button>Follow</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { UsersDisplay };
