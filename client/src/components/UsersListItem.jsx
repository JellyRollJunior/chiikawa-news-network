import { Avatar } from './Avatar.jsx';
import { FollowButton } from './UsersFollowButton.jsx';
import { LoadingElement } from './LoadingElement.jsx';

const UsersListItem = ({
  user,
  openViewProfile,
  refetchUsers,
  followUser,
  unfollowUser,
  isLoadingFollow = false,
  isLoading = false,
  blockStyle,
}) => {
  const handleFollowUser = async (userId) => {
    await followUser(userId);
    refetchUsers();
  };

  const handleUnfollowUser = async (userId) => {
    await unfollowUser(userId);
    refetchUsers();
  };

  return !isLoading ? (
    <li>
      <div className="flex gap-1">
        <div className={`flex flex-col ${blockStyle} items-center px-1 py-2`}>
          <Avatar
            className="mx-2 size-[74px] border-1 border-yellow-500 md:size-[86px]"
            avatar={user.avatar}
          />
          <div className="mt-2">
            <FollowButton
              className="mx-1 px-2 text-sm"
              userId={user.id}
              isFollowing={user.isFollowing}
              handleFollowUser={() => handleFollowUser(user.id)}
              handleUnfollowUser={() => handleUnfollowUser(user.id)}
              isLoadingFollow={isLoadingFollow}
            />
          </div>
        </div>
        <div
          className={`flex flex-1 flex-col justify-between truncate px-3 ${blockStyle}`}
        >
          <div className="mt-4">
            <h3
              className="font-chiikawa truncate text-center"
              title={user.username}
            >
              {user.username}
            </h3>
          </div>
          <div className="flex justify-around text-sm md:text-base">
            <div>{user && user.postCount ? user.postCount : 0} Posts</div>
            <div>
              {user && user.followersCount ? user.followersCount : 0} Followers
            </div>
          </div>
          <button
            className="blue-button mb-2 w-fit self-center px-5 py-0.5 text-sm"
            onClick={() => openViewProfile(user.id)}
          >
            View profile
          </button>
        </div>
      </div>
      <div className={`${blockStyle} mt-1 px-3 pt-2.5 pb-1.5`}>
        <p className="ml-1">{user.bio}</p>
      </div>
    </li>
  ) : (
    /* Loading Display */
    <li>
      <div className="flex gap-1">
        <div className={`flex flex-col ${blockStyle} items-center px-2 py-2`}>
          <LoadingElement className="size-[70px] shrink-0 rounded-full" />
          <LoadingElement className="mt-2 h-5 w-16 self-center rounded-lg" />
        </div>
        <div
          className={`flex flex-1 flex-col justify-between ${blockStyle} px-2 py-2`}
        >
          <LoadingElement className="mt-2 h-6 w-32 self-center rounded-lg" />
          <div className="flex justify-around">
            <div className="flex items-center gap-2">
              <LoadingElement className="h-4 w-7 rounded-full" /> Posts
            </div>
            <div className="flex items-center gap-2">
              <LoadingElement className="h-4 w-7 rounded-full" /> Followers
            </div>
          </div>
          <LoadingElement className="mt-2 h-5 w-32 self-center rounded-lg" />
        </div>
      </div>
      <div className={`${blockStyle} mt-1 px-3 pt-2.5 pb-1.5`}>
        <LoadingElement className="ml-1 h-12 rounded-lg" />
      </div>
    </li>
  );
};

export { UsersListItem };
