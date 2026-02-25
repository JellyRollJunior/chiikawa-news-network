import { Link } from 'react-router';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { LoadingElement } from '@/shared/components/LoadingElement.jsx';
import { getBlockStyleByIndex } from '@/styles/blocks.js';

const UsersAsideList = ({ users, isLoadingUsers }) => {

  if (isLoadingUsers) {
    return (
      <ul className="flex flex-1 flex-col gap-2">
        {[...Array(14)].map((item, index) => (
          <li className="flex gap-2">
            <div className={`px-2 pt-2 pb-1.5 ${getBlockStyleByIndex(index)}`}>
              <LoadingElement className="size-[54px] rounded-full" />
            </div>
            <div
              className={`flex flex-1 items-center px-2 py-2 ${getBlockStyleByIndex(index)} `}
            >
              <LoadingElement className="ml-2 h-5 w-9/10 rounded-md" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-1 flex-col gap-2">
      {users.map((user, index) => (
        <li
          key={user.id}
          className="flex gap-1 md:flex-col lg:flex-row lg:gap-2"
        >
          {/* Avatar */}
          <div className={`px-2 pt-2 pb-1.5 ${getBlockStyleByIndex(index)}`}>
            <Avatar
              className="mx-auto size-[52px] border-1 border-yellow-500"
              avatar={user.avatar}
              size={1.75}
              secondaryStyling={true}
            />
          </div>

          {/* Username & link to profile */}
          <div
            className={`flex flex-1 items-center justify-center truncate px-2 py-2 lg:justify-start ${getBlockStyleByIndex(index)}`}
          >
            <h3 className="truncate font-semibold lg:ml-2">
              <Link
                className="hover:text-amber-900 hover:underline"
                to={`/users/${user.id}`}
                title={user.username}
              >
                {user.username}
              </Link>
            </h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { UsersAsideList };
