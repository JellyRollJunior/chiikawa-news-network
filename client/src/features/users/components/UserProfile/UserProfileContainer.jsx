import { usePosts } from '@/features/posts/hooks/usePosts.js';
import { UserProfileView } from './UserProfileView.jsx';

const UserProfileContainer = ({ userId }) => {
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

  return (
    <UserProfileView
      userId={userId}
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
