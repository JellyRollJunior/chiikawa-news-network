import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUser } from '../hooks/useUser.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserStatBlock = ({ count, label }) => {
  return (
    <div className="duckegg-block flex flex-col justify-end pt-2.5 pb-1 text-center">
      <span className="font-chiikawa text-xl">{count}</span>
      <br /> {label}
    </div>
  );
};

const UserStats = ({
  userId,
  followersCount,
  followingCount,
  postCount,
  isFollowing = false,
  handleFollowUser,
  isLoadingFollow,
}) => {
  const { id } = useContext(CurrentContext);

  return (
    <>
      <div className="hidden flex-1 flex-col md:flex">
        <div className="grid grid-cols-3 gap-2">
          <UserStatBlock count={followersCount} label="Followers" />
          <UserStatBlock count={followingCount} label="Following" />
          <UserStatBlock count={postCount} label="Posts" />
        </div>
        <div className="mt-2 flex gap-2">
          <div className="pink-block flex flex-1 justify-center items-center pt-1.5 pb-1">
            {isFollowing ? (
              <div className="text-center text-sm text-gray-500">
                — following —
              </div>
            ) : (
              userId != id && (
                <button
                  className="pink-button self-center px-7 text-base"
                  onClick={() => handleFollowUser(userId)}
                  disabled={isLoadingFollow}
                >
                  Follow
                </button>
              )
            )}
          </div>
          <div className="pink-block flex flex-1 justify-center pt-1.5 pb-1">
            <button className="pink-button self-center px-7 text-base">
              hi guys
            </button>
          </div>
        </div>
      </div>

      <div className="pink-block flex flex-1 flex-col items-center justify-around pt-1 text-sm md:hidden">
        <div>{followersCount} Followers</div>
        <div>{followingCount} Following</div>
        <div>{postCount} Posts</div>
        <div className="mx-2 mb-1">
          {isFollowing ? (
            <div className="text-center text-sm text-gray-500">
              — following —
            </div>
          ) : (
            userId != id && (
              <button
                className="pink-button self-center px-7 text-base"
                onClick={() => handleFollowUser(userId)}
                disabled={isLoadingFollow}
              >
                Follow
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

const UserInfo = ({ userId, followUser, isLoadingFollow }) => {
  const { id } = useContext(CurrentContext);
  const { user, isLoading, refetch } = useUser(userId);

  const handleFollowUser = async (userId) => {
    await followUser(userId);
    refetch();
  };

  return !isLoading && user ? (
    <header className="flex flex-col">
      <div className="yellow-block flex-1 pt-1 pb-0.5 md:pt-2">
        <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
          {user.username}
        </h2>
      </div>
      <div className="mt-2 flex gap-2">
        <div className="duckegg-block flex items-center p-2">
          <Avatar
            className="size-[100px] border-4 border-dashed border-white p-0.5 md:size-[90px]"
            avatar={user.avatar}
            background="none"
          />
        </div>
        {/* User stats */}
        <UserStats
          userId={user && user.id}
          followersCount={user && user.followersCount ? user.followersCount : 0}
          followingCount={user && user.followingCount ? user.followingCount : 0}
          postCount={user && user.postCount ? user.postCount : 0}
          isFollowing={user && user.isFollowing}
          handleFollowUser={handleFollowUser}
          isLoadingFollow={isLoadingFollow}
        />
      </div>
      <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
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
          <LoadingElement className="size-[90px] shrink-0 rounded-full" />
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
        <div className="duckegg-block hidden p-2 md:block">
          <LoadingElement className="size-[90px] shrink-0 rounded-full" />
        </div>
      </div>
      <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
        <LoadingElement className="h-12 w-full rounded-sm" />
      </div>
    </header>
  );
};

export { UserInfo };
