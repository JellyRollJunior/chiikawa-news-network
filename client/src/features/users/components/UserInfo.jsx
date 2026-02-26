import { Link } from 'react-router';
import { FollowButton } from '@/features/users/components/FollowButton.jsx';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { LoadingElement } from '@/shared/components/LoadingElement.jsx';

const UserStatBlock = ({ className, count, label, isLoading = false }) => {
  return (
    <div
      className={`duckegg-block flex flex-col justify-end pt-2 pb-1.5 text-center md:pt-3 md:pb-1.5 ${className}`}
    >
      {!isLoading ? (
        <span className="font-chiikawa text-xl">{count}</span>
      ) : (
        <LoadingElement className="h-6 w-1/2 self-center rounded-md" />
      )}
      {label}
    </div>
  );
};

const UserInfo = ({
  user,
  isLoadingUser,
  handleFollowUser,
  handleUnfollowUser,
  isLoadingFollow,
}) => {
  if (isLoadingUser || !user) {
    return (
      <header className="flex flex-col">
        <div className="yellow-block flex-1 pt-1 pb-0.5 md:pt-2">
          <LoadingElement className="mx-auto h-7 w-46 rounded-md" />
        </div>
        <div className="mt-2 flex gap-2">
          <div className="grid w-full grid-cols-6 gap-2 md:grid-cols-8 md:gap-1">
            <div className="duckegg-block col-span-3 flex items-center justify-center py-2 md:col-span-2 md:row-span-3">
              <LoadingElement className="size-[90px] shrink-0 rounded-full" />
            </div>
            <div className="pink-block col-span-3 flex flex-col items-center justify-center gap-2 md:hidden">
              <LoadingElement className="h-6 w-3/5 rounded-md" />
              <LoadingElement className="h-6 w-3/5 rounded-md" />
            </div>
            <UserStatBlock
              className="col-span-2 md:row-span-2"
              label="Followers"
              isLoading={true}
            />
            <UserStatBlock
              className="col-span-2 md:row-span-2"
              label="Following"
              isLoading={true}
            />
            <UserStatBlock
              className="col-span-2 md:row-span-2"
              label="Posts"
              isLoading={true}
            />
            <div className="pink-block hidden flex-1 items-center justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
              <LoadingElement className="h-4 w-7 rounded-full" />
            </div>
            <div className="pink-block hidden flex-1 justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
              <LoadingElement className="h-4 w-7 rounded-full" />
            </div>
          </div>
        </div>
        <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
          <LoadingElement className="h-12 w-full rounded-md" />
        </div>
      </header>
    );
  }

  return (
    <header className="flex flex-col">
      {/* Username */}
      <div className="yellow-block flex-1 pt-1 pb-0.5 md:pt-2">
        <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
          {user.username}
        </h2>
      </div>

      {/* Info section */}
      <div className="mt-2 flex gap-2">
        <div className="grid w-full grid-cols-6 gap-2 md:grid-cols-8 md:gap-1">
          {/* Avatar */}
          <div className="duckegg-block col-span-3 flex items-center justify-center py-2 md:col-span-2 md:row-span-3">
            <Avatar
              className="size-[100px] border-4 border-dashed border-white p-0.5"
              avatar={user.avatar}
              background="none"
            />
          </div>

          {/* Mobile buttons */}
          <div className="pink-block col-span-3 flex flex-col items-center justify-center gap-2 md:hidden">
            <FollowButton
              className="px-6"
              userId={user.id}
              isFollowing={user.isFollowing}
              handleFollowUser={() => handleFollowUser(user.id)}
              handleUnfollowUser={() => handleUnfollowUser(user.id)}
              isLoadingFollow={isLoadingFollow}
            />
            <Link className="pink-button self-center px-6" to="/chats">
              Message
            </Link>
          </div>

          {/* User stats */}
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

          {/* Desktop follow button */}
          <div className="pink-block hidden flex-1 items-center justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
            <FollowButton
              className="px-6"
              userId={user.id}
              isFollowing={user.isFollowing}
              handleFollowUser={() => handleFollowUser(user.id)}
              handleUnfollowUser={() => handleUnfollowUser(user.id)}
              isLoadingFollow={isLoadingFollow}
            />
          </div>
          
          {/* Desktop send message button */}
          <div className="pink-block hidden flex-1 justify-center pt-1.5 pb-1 md:col-span-3 md:flex">
            <Link className="pink-button self-center px-6" to="/chats">
              Send message
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bio */}
      <div className="yellow-block mt-2 flex flex-col p-2 pb-1">
        <p className="ml-2 text-start">{user && user.bio}</p>
      </div>
    </header>
  );
};

export { UserInfo };
