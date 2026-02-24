import SimpleBar from 'simplebar-react';
import { Fragment } from 'react';
import { HomeUsersAsideListItem } from '@/features/users/components/HomeUsersAsideListItem.jsx';
import { BLOCKS } from '@/styles/blocks.js';

const UsersAsideView = ({ users, isLoadingUsers }) => {
  return (
    <SimpleBar className="main-container mt-3 mr-4 mb-2 hidden md:flex md:w-[10rem] lg:w-xs">
      <aside className="flex flex-col gap-2 px-3 pt-3.5 pb-2.5">
        <header className="flex shrink-0 items-center justify-center gap-2">
          <div className="yellow-block flex-1 pt-1 pb-0.5">
            <h2 className="font-chiikawa text-shadow-wrap px-2 pt-2 pb-1 text-center">
              People you may know
            </h2>
          </div>
        </header>
        <div className="duckegg-block h-4 shrink-0" />
        <ul className="flex flex-1 flex-col gap-2">
          {!isLoadingUsers
            ? users.map((user, index) => (
                <Fragment key={user.id}>
                  <HomeUsersAsideListItem
                    user={user}
                    blockStyle={BLOCKS[index % BLOCKS.length]}
                  />
                </Fragment>
              ))
            : [...Array(14)].map((item, index) => (
                <Fragment key={index}>
                  <HomeUsersAsideListItem
                    isLoading={true}
                    blockStyle={BLOCKS[index % BLOCKS.length]}
                  />
                </Fragment>
              ))}
        </ul>
        <div className="duckegg-block h-4 shrink-0" />
      </aside>
    </SimpleBar>
  );
};

export { UsersAsideView };
