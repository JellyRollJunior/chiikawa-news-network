import { usePosts } from '@/features/posts/hooks/usePosts.js';
import { PostFeed } from '@/features/posts/components/PostFeed.jsx';

const Home = () => {
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
    <div className="main-container mx-4 mt-3 mb-2 flex max-w-xl flex-1 flex-col">
      <PostFeed
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
    </div>
  );
};

export { Home };
