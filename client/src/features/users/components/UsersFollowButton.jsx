import { useContext } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';

const FollowButton = ({
  className,
  userId,
  isFollowing,
  handleFollowUser,
  handleUnfollowUser,
  isLoadingFollow,
}) => {
  const { id } = useContext(CurrentContext);

  if (isFollowing) {
    return (
      <button
        className={`yellow-button self-center ${className}`}
        onClick={handleUnfollowUser}
        disabled={isLoadingFollow}
      >
        Unfollow
      </button>
    );
  }

  if (userId === id) {
    return (
      <div className="text-center text-sm text-gray-500">Hey it's me!</div>
    );
  }

  return (
    <button
      className={`pink-button self-center ${className}`}
      onClick={handleFollowUser}
      disabled={isLoadingFollow}
    >
      Follow
    </button>
  );
};

export { FollowButton };
