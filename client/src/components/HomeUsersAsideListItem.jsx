import { Link } from 'react-router';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const HomeUsersAsideListItem = ({ blockStyle, user, isLoading = false }) => {
  return !isLoading ? (
    <li className="flex gap-1 lg:gap-2 md:flex-col lg:flex-row">
      <div className={`px-2 pt-2 pb-1.5 ${blockStyle}`}>
        <Avatar
          className="mx-auto size-[52px] border-1 border-yellow-500"
          avatar={user.avatar}
          size={1.75}
          secondaryStyling={true}
        />
      </div>
      <div
        className={`flex flex-1 truncate items-center px-2 py-2 ${blockStyle} justify-center lg:justify-start`}
      >
        <h3 className="font-semibold truncate lg:ml-2">
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

export { HomeUsersAsideListItem };
