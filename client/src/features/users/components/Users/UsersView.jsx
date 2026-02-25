import SimpleBar from 'simplebar-react';
import { useState } from 'react';
import { UserProfile } from '@/features/users/components/UserProfile/';
import { UsersList } from '@/features/users/components/UsersList.jsx';
import { LogoTitle } from '@/shared/components/LogoTitle.jsx';
import { RefreshButton } from '@/shared/components/RefreshButton.jsx';

import arrowBack from '@/assets/svgs/arrow-back.svg';

const UsersView = ({ users, isLoadingUsers, refetchUsers }) => {
  // open profile view
  const [profileUserId, setProfileUserId] = useState(null);
  const openViewProfile = (userId) => setProfileUserId(userId);
  const closeViewProfile = () => setProfileUserId(null);

  // search filter
  const [filter, setFilter] = useState('');
  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

  if (profileUserId) {
    return (
      <div className="grid h-full grid-rows-[65px_1fr]">
        {/* Return to Users button */}
        <div className="mx-3 mt-3 mb-2">
          <button
            className="font-chiikawa pink-block flex h-full w-full justify-start px-3 pt-2 pb-1 hover:border-pink-200 hover:bg-pink-200 hover:bg-none hover:inset-shadow-none"
            onClick={closeViewProfile}
          >
            <img className="w-[20px]" src={arrowBack} />
            Return to Users
          </button>
        </div>

        {/* User profile display */}
        <UserProfile userId={profileUserId} />
      </div>
    );
  }

  return (
    <SimpleBar className="h-full">
      <div className="flex flex-col px-3 pt-3 pb-2.5 md:pt-3.5">
        {/* Title and Refresh button */}
        <header className="flex gap-2">
          <div className="yellow-block flex-1 pt-1 pb-0.5">
            <LogoTitle
              className="justify-center text-lg md:text-2xl"
              text="Users"
            />
          </div>
          <div className="pink-block flex items-center justify-center self-stretch pt-1 pr-1.5 pl-2">
            <RefreshButton onclick={refetchUsers} />
          </div>
        </header>

        {/* Search bar */}
        <input
          className="block-shadow mt-2 h-11 shrink-0 rounded-lg bg-white pr-2 pl-3"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search"
        />

        {/* Users data */}
        <section className="mt-2 flex-1">
          <UsersList
            users={filteredUsers}
            openViewProfile={openViewProfile}
            isLoadingUsers={isLoadingUsers}
            refetchUsers={refetchUsers}
          />
        </section>
      </div>
    </SimpleBar>
  );
};

export { UsersView };
