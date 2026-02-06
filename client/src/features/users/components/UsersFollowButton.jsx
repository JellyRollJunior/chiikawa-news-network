import { useContext } from 'react';
import { CurrentContext } from '@/contexts/CurrentProvider.jsx';

const FollowButton = ({
  className,
  userId,
  isFollowing,
  handleFollowUser,
  handleUnfollowUser,
  isLoadingFollow,
}) => {
  const { id } = useContext(CurrentContext);

  return isFollowing ? (
    <button
      className={`yellow-button self-center ${className}`}
      onClick={handleUnfollowUser}
      disabled={isLoadingFollow}
    >
      Unfollow
    </button>
  ) : userId != id ? (
    <button
      className={`pink-button self-center ${className}`}
      onClick={handleFollowUser}
      disabled={isLoadingFollow}
    >
      Follow
    </button>
  ) : (
    <div className="text-center text-sm text-gray-500">Hey it's me!</div>
  );
};

export { FollowButton };
