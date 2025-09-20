import { useUsers } from '../hooks/useUsers.js';
import { Avatar } from './Avatar.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';
import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';

const UsersDisplay = () => {
  const { id } = useContext(CurrentContext);
  const { users, loading } = useUsers();
  const [filter, setFilter] = useState('');
  const usersWithoutCurrent = users
    ? users.filter((user) => user.id != id)
    : [];

  // search filter
  const filteredUsers = usersWithoutCurrent
    ? usersWithoutCurrent.filter((user) =>
        user.username.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

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
      <input
        className="block-shadow mx-2 mt-3 h-9 shrink-0 rounded-lg bg-white pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <ul className="mx-2 mt-3 mb-2 flex flex-1 flex-col gap-2">
        {filteredUsers.map((user) => (
          <li
            className="yellow-block flex flex-col px-2 pt-3 pb-2"
            key={user.id}
          >
            <div className="ml-2 flex justify-around md:text-lg">
              <Avatar className="size-[70px]" avatar={user.avatar} />
              <div className="mt-2 flex flex-col gap-2">
                <div className="font-chiikawa text-center">{user.username}</div>
                <div className="grid w-full grid-cols-2 text-sm md:text-base">
                  <div>{user && user.postCount ? user.postCount : 0} Posts</div>
                  <div>
                    {user && user.followersCount ? user.followersCount : 0}{' '}
                    Followers
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 ml-2">{user.bio}</p>
            <div className="mt-2 grid grid-cols-2 items-center gap-3">
              <button className="pink-button flex-1 px-3 py-0.5 text-sm">
                View profile
              </button>
              {!user.isFollowing ? (
                <button className="blue-button flex-1 px-3 py-0.5 text-sm">
                  Follow
                </button>
              ) : (
                <div className="flex-1 text-center text-sm text-gray-500">
                  — following —
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { UsersDisplay };
