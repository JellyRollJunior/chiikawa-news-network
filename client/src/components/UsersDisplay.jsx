import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUsers } from '../hooks/useUsers.js';
import { UsersList } from './UsersList.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

const UsersDisplay = ({ openViewProfile }) => {
  const { id } = useContext(CurrentContext);
  const { users, isLoading } = useUsers();
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
    <div className="scrollbar-thin scrollbar-track-yellow-50 flex h-full flex-col overflow-y-scroll">
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
      <section className="mx-2 mt-3 mb-2 flex-1">
        <UsersList
          users={filteredUsers}
          openViewProfile={openViewProfile}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export { UsersDisplay };
