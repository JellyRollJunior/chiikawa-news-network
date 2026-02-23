import { usePosts } from '@/features/posts/hooks/usePosts.js';
import { UserProfileView } from './UserProfileView.jsx';
import { useUser } from '../../hooks/useUser.js';
import { useFollow } from '../../hooks/useFollow.js';

const UserProfileContainer = ({ userId }) => {
  const {
    user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useUser(userId);
  const { followUser, unfollowUser, isLoading: isLoadingFollow } = useFollow();

  const {
    posts,
    hasNextPage,
    isLoadingInit,
    fetchNextPage,
    isLoadingNext,
    refreshPosts,
    toggleLike,
    isLoadingLike,
  } = usePosts(3, userId);

  const handleFollowUser = async (userId) => {
    await followUser(userId);
    refetchUser();
  };

  const handleUnfollowUser = async (userId) => {
    await unfollowUser(userId);
    refetchUser();
  };

  return (
    <UserProfileView
      // User Info
      user={user}
      isLoadingUser={isLoadingUser}
      handleFollowUser={handleFollowUser}
      handleUnfollowUser={handleUnfollowUser}
      isLoadingFollow={isLoadingFollow}
      // User Posts
      posts={posts}
      hasNextPage={hasNextPage}
      isLoadingInit={isLoadingInit}
      fetchNextPage={fetchNextPage}
      isLoadingNext={isLoadingNext}
      refreshPosts={refreshPosts}
      toggleLike={toggleLike}
      isLoadingLike={isLoadingLike}
    />
  );
};

export { UserProfileContainer };
