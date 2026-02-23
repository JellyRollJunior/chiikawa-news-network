import { UserInfo } from '@/features/users/components/UserInfo.jsx';
import { UserPosts } from '@/features/users/components/UserPosts.jsx';
import { Scrollable } from '@/shared/components/Scrollable.jsx';

const UserProfileView = ({
  userId,
  posts,
  hasNextPage,
  isLoadingInit,
  fetchNextPage,
  isLoadingNext,
  refreshPosts,
  toggleLike,
  isLoadingLike,
}) => {
  return (
    <Scrollable
      className="px-3 pt-3 pb-2.5 md:pt-3.5"
      onScrollToBottom={fetchNextPage}
    >
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
  );
};

export { UserProfileView };
