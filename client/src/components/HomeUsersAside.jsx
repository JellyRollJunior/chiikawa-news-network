import { Link } from 'react-router';
import { useUsers } from '../hooks/useUsers.js';
import { Avatar } from './Avatar.jsx';
import { Fragment, useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { LoadingElement } from './LoadingElement.jsx';
const BLOCKS = ['duckegg-block', 'yellow-block', 'pink-block'];

const HomeUserAsideListItem = ({ blockStyle, user, isLoading = false }) => {
  return !isLoading ? (
    <li className="flex gap-2">
      <div className={`px-2 pt-2 pb-1.5 ${blockStyle}`}>
        <Avatar
          className="size-[52px] border-1 border-yellow-500"
          avatar={user.avatar}
          size={1.75}
          secondaryStyling={true}
        />
      </div>
      <div className={`flex flex-1 items-center px-2 py-2 ${blockStyle} `}>
        <h3 className="ml-2 font-semibold">
          <Link
            className="hover:text-amber-900 hover:underline"
            to={`/users/${user.id}`}
          >
            {user.username}
          </Link>
        </h3>
      </div>
    </li>
  ) : (
    <li className="flex gap-2">
      <div className={`px-2 pt-2 pb-1.5 ${blockStyle}`}>
        <LoadingElement className="size-[54px] rounded-full" />
      </div>
      <div className={`flex flex-1 items-center px-2 py-2 ${blockStyle} `}>
        <LoadingElement className="ml-2 h-5 w-9/10 rounded-md" />
      </div>
    </li>
  );
};

const HomeUsersAside = () => {
  const { id } = useContext(CurrentContext);
  const { users, isLoading } = useUsers();
  const usersWithoutCurrent = users
    ? users.filter((user) => user.id != id)
    : [];

  return (
    <aside className="main-container scrollbar-thin mx-4 mt-3 mr-10 mb-2 hidden w-xs flex-col gap-2 overflow-y-scroll px-3 pt-3.5 pb-2.5 md:flex">
      <header className="flex shrink-0 items-center justify-center gap-2">
        <div className="yellow-block flex-1 pt-1 pb-0.5">
          <h2 className="font-chiikawa text-shadow-wrap px-2 pt-2 pb-1 text-center">
            People you may know
          </h2>
        </div>
      </header>
      <div className="duckegg-block h-4 shrink-0" />
      <ul className="flex flex-1 flex-col gap-2">
        {!isLoading
          ? usersWithoutCurrent.map((user, index) => (
              <Fragment key={user.id}>
                <HomeUserAsideListItem
                  user={user}
                  blockStyle={BLOCKS[index % BLOCKS.length]}
                />
              </Fragment>
            ))
          : [...Array(14)].map((item, index) => (
              <Fragment key={index}>
                <HomeUserAsideListItem
                  isLoading={true}
                  blockStyle={BLOCKS[index % BLOCKS.length]}
                />
              </Fragment>
            ))}
      </ul>
      <div className="duckegg-block h-4 shrink-0" />
    </aside>
  );
};

export { HomeUsersAside };
