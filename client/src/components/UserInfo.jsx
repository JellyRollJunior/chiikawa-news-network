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
    <>
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
    </>
  ) : (
    /* Loading Display */
    <section className="yellow-block px-2 pt-3 pb-2">
      <header className="ml-2 flex">
        <LoadingElement className="size-20 shrink-0 rounded-full" />
        <div className="mt-2 flex w-full flex-col items-center justify-center">
          <h2 className="xxs:max-w-55 xs:max-w-64 -mt-2 max-w-45 shrink self-center border-5 border-dashed border-pink-300 px-2 py-2">
            <LoadingElement className="h-6 w-32 rounded-full" />
          </h2>
        </div>
      </header>
      <div className="mt-3 flex w-full justify-around gap-3">
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Posts
        </div>
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Followers
        </div>
        <div className="flex items-center gap-2">
          <LoadingElement className="h-4 w-7 rounded-full" /> Following
        </div>
      </div>
      <button className="blue-button mt-3 w-full px-7 py-0.5" disabled={true}>
        Follow
      </button>
      <LoadingElement className="mt-3 h-12 w-full rounded-sm" />
    </section>
  );
};

export { UserInfo };
