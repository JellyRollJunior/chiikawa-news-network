import { usePosts } from '../hooks/usePosts.js';
import { UserInfo } from './UserInfo.jsx';
import { Scrollable } from './Scrollable.jsx';
import { UserPosts } from './UserPosts.jsx';

const UserProfile = ({ userId }) => {
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
    <Scrollable onScrollToBottom={fetchNextPage}>
      <UserInfo userId={userId} />
      <UserPosts
        posts={posts}
        hasNextPage={hasNextPage}
        isLoadingInit={isLoadingInit}
        isLoadingNext={isLoadingNext}
        refreshPosts={refreshPosts}
        toggleLike={toggleLike}
        isLoadingLike={isLoadingLike}
      />
    </Scrollable>
  );
};

export { UserProfile };
