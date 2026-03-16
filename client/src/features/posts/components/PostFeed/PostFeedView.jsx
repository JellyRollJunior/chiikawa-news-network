import { useState } from 'react';
import { Posts } from '@/features/posts/components/Posts.jsx';
import { CreatePostModal } from '@/features/posts/components/CreatePostModal/index.js';
import { RefreshButton } from '@/shared/components/RefreshButton.jsx';
import { Scrollable } from '@/shared/components/Scrollable.jsx';
import { LogoTitle } from '@/shared/components/LogoTitle.jsx';

const PostFeedView = ({
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
}) => {
  // Create Post Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreatePostModal = () => setIsCreateModalOpen(true);
  const closeCreatePostModal = () => setIsCreateModalOpen(false);

  return (
    <Scrollable
      className="px-3 pt-3 pb-2.5 md:pt-3.5"
      onReachBottom={fetchNextPage}
    >
      {/* Title */}
      <header className="yellow-block pt-2 pb-1">
        <LogoTitle className="justify-center text-[14px] md:text-lg" />
      </header>

      {/* Feed control buttons */}
      {/* Switch feed, Refresh posts, Create post */}
      <section className={`mt-2 flex gap-2`}>
        <button
          className={`button flex-1 px-5 py-1 ${
            isFeed
              ? 'rounded-lg border-2 border-pink-400 bg-pink-300 font-bold hover:bg-pink-400'
              : 'rounded-lg border-2 border-pink-300 bg-pink-200 hover:bg-pink-300'
          }`}
          onClick={setPostsToFeed}
          disabled={isLoadingInit}
        >
          For You
        </button>
        <button
          className={`button flex-1 px-5 py-1 ${
            !isFeed
              ? 'rounded-lg border-2 border-pink-400 bg-pink-300 font-bold hover:bg-pink-400'
              : 'rounded-lg border-2 border-pink-300 bg-pink-200 hover:bg-pink-300'
          }`}
          onClick={setPostsToAll}
          disabled={isLoadingInit}
        >
          All
        </button>
        <div className="pink-block pt-1 pr-0.5 pl-1">
          <RefreshButton onclick={refreshPosts} isDisabled={isLoadingInit} />
        </div>
      </section>
      <section className="mt-2 mb-2.5 flex items-center gap-2">
        <button
          className="block-shadow h-10 flex-1 rounded-lg bg-white"
          onClick={openCreatePostModal}
        >
          What's on your mind?
        </button>
      </section>

      {/* Posts */}
      <section className="mt-2">
        <Posts
          posts={posts}
          hasNextPage={hasNextPage}
          isLoadingInit={isLoadingInit}
          isLoadingNext={isLoadingNext}
          toggleLike={toggleLike}
          isLoadingLike={isLoadingLike}
          refreshPosts={refreshPosts}
          noPostsMessage="Follow users to view their posts here or create your own posts!"
        />
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        open={isCreateModalOpen}
        closeModal={closeCreatePostModal}
        onSubmit={refreshPosts}
      />
    </Scrollable>
  );
};

export { PostFeedView };
