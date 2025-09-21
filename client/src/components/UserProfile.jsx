import { usePosts } from '../hooks/usePosts.js';
import { UserInfo } from './UserInfo.jsx';
import { Scrollable } from './Scrollable.jsx';
import { UserPosts } from './UserPosts.jsx';
import { useFollow } from '../hooks/useFollow.js';

const UserProfile = ({ userId, children }) => {
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
  const { followUser, isLoading: isLoadingFollow } = useFollow();

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col md:max-w-xl">
      <Scrollable onScrollToBottom={fetchNextPage}>
        {children}
        <UserInfo
          userId={userId}
          followUser={followUser}
          isLoadingFollow={isLoadingFollow}
        />
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
