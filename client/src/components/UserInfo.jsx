import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserInfo = ({ userId, followUser, isLoadingFollow }) => {
  const { id } = useContext(CurrentContext);
  const { user, isLoading, refetch } = useUser(userId);

  const handleFollowUser = async (userId) => {
    await followUser(userId);
    refetch();
  };

  return !isLoading ? (
    <header className="mx-4 mt-3 flex flex-col">
      <div className="yellow-block flex-1 pt-1 pb-0.5">
        <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
          {user && user.username}
        </h2>
      </div>
      <div className="mt-2 flex gap-2">
        <div className="duckegg-block p-2">
          <Avatar
            className="size-[100px] border-4 border-dashed border-white p-0.5 md:size-[90px]"
            avatar={user && user.avatar}
            background="none"
          />
        </div>
        <div className="pink-block flex flex-1 flex-col items-center justify-around pt-1 text-sm md:text-base">
          <div>
            {user && user.followersCount ? user.followersCount : 0} Followers
          </div>
          <div>
            {user && user.followingCount ? user.followingCount : 0} Following
          </div>
          <div>{user && user.postCount ? user.postCount : 0} Posts</div>
        </div>
      </div>
      <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
        {user &&
          (user.isFollowing ? (
            <div className="text-center text-sm text-gray-500">
              — following —
            </div>
          ) : (
            user.id != id && (
              <button
                className="pink-button w-full self-center text-base"
                onClick={() => handleFollowUser(user.id)}
                disabled={isLoadingFollow}
              >
                Follow
              </button>
            )
          ))}
        <p className="mt-1 ml-2 text-start">{user && user.bio}</p>
      </div>
    </header>
  ) : (
    /* Loading Display */
    <header className="mx-4 mt-3 flex flex-col">
      <div className="yellow-block flex-1 pt-2 pb-1">
        <LoadingElement className="mx-auto h-7 w-46 rounded-full" />
      </div>
      <div className="mt-2 flex gap-2">
        <div className="duckegg-block p-2">
          <LoadingElement className="size-[100px] shrink-0 rounded-full" />
        </div>
        <div className="pink-block flex flex-1 flex-col items-center justify-around pt-1 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <LoadingElement className="h-4 w-7 rounded-full" /> Followers
          </div>
          <div className="flex items-center gap-2">
            <LoadingElement className="h-4 w-7 rounded-full" /> Following
          </div>
          <div className="flex items-center gap-2">
            <LoadingElement className="h-4 w-7 rounded-full" /> Posts
          </div>
        </div>
      </div>
      <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
        <LoadingElement className="h-12 w-full rounded-sm" />
      </div>
    </header>
  );
};

export { UserInfo };
