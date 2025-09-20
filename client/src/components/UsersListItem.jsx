import { Avatar } from './Avatar.jsx';

const UsersListItem = ({ user, openViewProfile }) => {
  return (
    <li className="yellow-block flex flex-col px-2 pt-3 pb-2">
      <div className="ml-2 flex justify-around md:text-lg">
        <Avatar className="size-[70px]" avatar={user.avatar} />
        <div className="mt-2 flex flex-col gap-2">
          <div className="font-chiikawa text-center">{user.username}</div>
          <div className="grid w-full grid-cols-2 text-sm md:text-base">
            <div>{user && user.postCount ? user.postCount : 0} Posts</div>
            <div>
              {user && user.followersCount ? user.followersCount : 0} Followers
            </div>
          </div>
        </div>
      </div>
      <p className="mt-2 ml-2">{user.bio}</p>
      <div className="mt-2 grid grid-cols-2 items-center gap-3">
        <button
          className="pink-button flex-1 px-3 py-0.5 text-sm"
          onClick={() => openViewProfile(user.id)}
        >
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
  );
};

export { UsersListItem };
