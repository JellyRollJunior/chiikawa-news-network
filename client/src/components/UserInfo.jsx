import { useUser } from '../hooks/useUser.js';
import { useFollow } from '../hooks/useFollow.js';
import { Avatar } from './Avatar.jsx';
import { FollowButton } from './UsersFollowButton.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UserStatBlock = ({ className, count, label }) => {
  return (
    <div
      className={`duckegg-block flex flex-col justify-end pt-2 pb-1.5 text-center md:pt-3 md:pb-1.5 ${className}`}
    >
      <span className="font-chiikawa text-xl">{count}</span>
      <br /> {label}
    </div>
  );
};

const UserInfo = ({ userId }) => {
  const { user, isLoading, refetch } = useUser(userId);
  const { followUser, unfollowUser, isLoading: isLoadingFollow } = useFollow();

  const handleFollowUser = async (userId) => {
    await followUser(userId);
    refetch();
  };

  const handleUnfollowUser = async (userId) => {
    await unfollowUser(userId);
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
        <div className="grid w-full grid-cols-6 gap-2 md:grid-cols-8 md:gap-1">
          <div className="duckegg-block col-span-3 flex items-center justify-center py-2 md:col-span-2 md:row-span-3">
            <Avatar
              className="size-[100px] border-4 border-dashed border-white p-0.5"
              avatar={user.avatar}
              background="none"
            />
          </div>
          <div className="pink-block col-span-3 flex flex-col items-center justify-center gap-2 md:hidden">
            <FollowButton
              className="px-6"
              userId={user.id}
              isFollowing={user.isFollowing}
              handleFollowUser={handleFollowUser}
              handleUnfollowUser={handleUnfollowUser}
              isLoadingFollow={isLoadingFollow}
            />
            <button className="pink-button self-center px-6">Message</button>
          </div>
          <UserStatBlock
            className="col-span-2 md:row-span-2"
            count={user.followersCount}
            label="Followers"
          />
          <UserStatBlock
            className="col-span-2 md:row-span-2"
            count={user.followingCount}
            label="Following"
          />
          <UserStatBlock
            className="col-span-2 md:row-span-2"
            count={user.postCount}
            label="Posts"
          />
          <div className="pink-block hidden flex-1 items-center justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
            <FollowButton
              className="px-6"
              userId={user.id}
              isFollowing={user.isFollowing}
              handleFollowUser={handleFollowUser}
              handleUnfollowUser={handleUnfollowUser}
              isLoadingFollow={isLoadingFollow}
            />
          </div>
          <div className="pink-block hidden flex-1 justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
            <button className="pink-button self-center px-6">
              Send message
            </button>
          </div>
        </div>
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
