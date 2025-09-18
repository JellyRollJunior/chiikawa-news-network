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
        <h1 className="text-shadow-wrap font-chiikawa text-center text-xl">
          Users
        </h1>
      </header>
      <ul className="mx-2 mt-3 mb-2 flex flex-col gap-2 ">
        {users &&
          users.map((user) => (
            <li
              className="yellow-block flex flex-col px-2 pt-3 pb-2"
              key={user.id}
            >
              <div className="ml-2 flex gap-5 md:text-lg">
                <Avatar className="size-[70px]" avatar={user.avatar} />
                <div className="mt-2 flex flex-col gap-2">
                  <div className="font-chiikawa text-center">{user.username}</div>
                  <div className="grid w-full grid-cols-2 text-sm md:text-base">
                    <div>
                      {user && user.postCount ? user.postCount : 0} Posts
                    </div>
                    <div>
                      {user && user.followersCount ? user.followersCount : 0}{' '}
                      Followers
                    </div>
                  </div>
                </div>
              </div>
              <p className='ml-2 mt-1'>{user.bio}</p>
              <div className="mt-2 flex gap-3">
                <button className="blue-button flex-1 px-3 py-0.5 text-sm">
                  Follow
                </button>
                <button className="pink-button flex-1 px-3 py-0.5 text-sm">
                  View profile
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export { UsersDisplay };
