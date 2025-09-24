import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUsers } from '../hooks/useUsers.js';
import { LogoTitle } from './LogoTitle.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import { UsersList } from './UsersList.jsx';

const UsersDisplay = ({ openViewProfile }) => {
  const { id } = useContext(CurrentContext);
  const { users, isLoading, refetch } = useUsers();
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
    <div className="scrollbar-thin flex h-full flex-col overflow-y-scroll px-3 pt-3 pb-2.5 md:pt-3.5 md:pr-1">
      <header className="flex items-center justify-center gap-2">
        <div className="yellow-block flex-1 pt-1 pb-0.5">
          <LogoTitle className="ml-2 text-lg md:text-2xl" text="Users" />
        </div>
        <div className="pink-block flex h-full items-center pt-1 pr-1.5 pl-2">
          <RefreshButton onclick={refetch} />
        </div>
      </header>
      <input
        className="block-shadow mt-2 h-11 shrink-0 rounded-lg bg-white pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <section className="mt-2 flex-1">
        <UsersList
          users={filteredUsers}
          openViewProfile={openViewProfile}
          isLoading={isLoading}
          refetchUsers={refetch}
        />
      </section>
    </div>
  );
};

export { UsersDisplay };
