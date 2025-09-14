import { usePosts } from '../hooks/usePosts.js';
import { PostList } from './PostsList.jsx';
import { Scrollable } from './Scrollable.jsx';

const UserPosts = ({ userId }) => {
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
    <Scrollable onScrollToBottom={fetchNextPage}>
      <PostList
        posts={posts}
        toggleLike={toggleLike}
        hasNextPage={hasNextPage}
        isLoadingInit={isLoadingInit}
        isLoadingNext={isLoadingNext}
        isLoadingLike={isLoadingLike}
        // openDeleteModal={openDeleteModal}
      />
    </Scrollable>
  );
};

export { UserPosts };
