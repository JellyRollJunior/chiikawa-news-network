import SimpleBar from 'simplebar-react';
import { UsersAsideList } from './UsersAsideList.jsx';

const UsersAsideView = ({ users, isLoadingUsers }) => {
  return (
    <SimpleBar className="main-container mt-3 mr-4 mb-2 hidden md:flex md:w-[10rem] lg:w-xs">
      <aside className="flex flex-col gap-2 px-3 pt-3.5 pb-2.5">
        {/* Title */}
        <header className="flex shrink-0 items-center justify-center gap-2">
          <div className="yellow-block flex-1 pt-1 pb-0.5">
            <h2 className="font-chiikawa text-shadow-wrap px-2 pt-2 pb-1 text-center">
              People you may know
            </h2>
          </div>
        </header>
        <div className="duckegg-block h-4 shrink-0" />

        {/* Users list */}
        <section className="">
          <UsersAsideList users={users} isLoadingUsers={isLoadingUsers} />
        </section>
        <div className="duckegg-block h-4 shrink-0" />
      </aside>
    </SimpleBar>
  );
};

export { UsersAsideView };
