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
  } = usePosts(5, userId);

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col">
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
    </div>
  );
};

export { UserProfile };
