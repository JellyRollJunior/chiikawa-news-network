import { usePosts } from '@/features/posts/hooks/usePosts.js';
import { UserInfo } from './UserInfo.jsx';
import { Scrollable } from '@/shared/components/Scrollable.jsx';
import { UserPosts } from './UserPosts.jsx';

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

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex w-full flex-1 flex-col md:max-w-xl">
      <Scrollable
        className="px-3 pt-3 pb-2.5 md:pt-3.5"
        onScrollToBottom={fetchNextPage}
      >
        {children}
        <UserInfo userId={userId} />
        <div className="duckegg-block my-3.5 h-4" />
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
