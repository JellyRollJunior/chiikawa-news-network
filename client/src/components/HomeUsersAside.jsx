import { useUsers } from '../hooks/useUsers.js';
import { Avatar } from './Avatar.jsx';
const BLOCKS = ['duckegg-block', 'yellow-block', 'pink-block'];

const HomeUsersAside = () => {
  const { users, isLoading } = useUsers();

  return (
    <aside className="main-container mx-4 mt-3 mb-2 hidden w-xs flex-col gap-2 px-3 pt-3.5 pb-2.5 md:flex">
      <header className="flex items-center justify-center gap-2">
        <div className="yellow-block flex-1 pt-1 pb-0.5">
          <h2 className="font-chiikawa text-shadow-wrap px-2 pt-2 pb-1 text-center ">
            People you may know
          </h2>
        </div>
      </header>
      <div className="duckegg-block h-4" />
      <ul className="flex flex-1 flex-col gap-2">
        {users &&
          users.map((user, index) => (
            <li className="flex gap-2">
              <div className={`${BLOCKS[index % BLOCKS.length]} px-2 py-2`}>
                <Avatar
                  className="size-[42px] border-1 border-yellow-500"
                  avatar={user.avatar}
                  size={1.75}
                  secondaryStyling={true}
                />
              </div>
              <div
                className={`flex-1 px-2 py-2 ${BLOCKS[index % BLOCKS.length]} flex items-center`}
              >
                <h3 className="ml-2 font-semibold">{user.username}</h3>
              </div>
            </li>
          ))}
      </ul>
      <div className="duckegg-block h-4" />
    </aside>
  );
};

export { HomeUsersAside };
