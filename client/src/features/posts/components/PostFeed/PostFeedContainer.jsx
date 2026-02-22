import { usePosts } from '@/features/posts/hooks/usePosts.js';
import { PostFeedView } from '@/features/posts/components/PostFeed/PostFeedView.jsx';

const PostFeedContainer = () => {
  const {
    posts,
    hasNextPage,
    isLoadingInit,
    fetchNextPage,
    isLoadingNext,
    isFeed,
    setPostsToAll,
    setPostsToFeed,
    refreshPosts,
    toggleLike,
    isLoadingLike,
  } = usePosts(5);

  return (
    <PostFeedView
      posts={posts}
      hasNextPage={hasNextPage}
      isLoadingInit={isLoadingInit}
      fetchNextPage={fetchNextPage}
      isLoadingNext={isLoadingNext}
      isFeed={isFeed}
      setPostsToAll={setPostsToAll}
      setPostsToFeed={setPostsToFeed}
      refreshPosts={refreshPosts}
      toggleLike={toggleLike}
      isLoadingLike={isLoadingLike}
    />
  );
};

export { PostFeedContainer };
