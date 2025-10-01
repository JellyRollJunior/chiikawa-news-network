import { useState } from 'react';
import { usePosts } from '../hooks/usePosts.js';
import { PostList } from './PostsList.jsx';
import { Scrollable } from './Scrollable.jsx';
import { HomePostControlButtons } from './HomePostControlButtons.jsx';
import { HomeNewPostModal } from './HomeNewPostModal.jsx';
import { LogoTitle } from './LogoTitle.jsx';

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

  // New Post Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const openCreatePostModal = () => setIsCreateModalOpen(true);
  const closeCreatePostModal = () => setIsCreateModalOpen(false);

  return (
    <>
      <div className="main-container mx-4 mt-3 mb-2 flex max-w-xl flex-1 flex-col">
        <Scrollable
          className="px-3 pt-3 pb-2.5 md:pt-3.5"
          onScrollToBottom={fetchNextPage}
        >
          <div className="yellow-block pt-2 pb-1">
            <LogoTitle className="justify-center text-[14px] md:text-lg" />
          </div>
          <HomePostControlButtons
            className="mt-2"
            isFeed={isFeed}
            setPostsToFeed={setPostsToFeed}
            setPostsToAll={setPostsToAll}
            isLoadingInit={isLoadingInit}
            refreshPosts={refreshPosts}
          />
          <section className="mt-2 mb-2.5 flex items-center gap-2">
            <button
              className="block-shadow h-10 flex-1 rounded-lg bg-white"
              onClick={openCreatePostModal}
            >
              What's on your mind?
            </button>
          </section>
          <section className="mt-2">
            <PostList
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
        </Scrollable>
      </div>
      {isCreateModalOpen && (
        <HomeNewPostModal
          closeFunction={closeCreatePostModal}
          onSubmit={refreshPosts}
        />
      )}
    </>
  );
};

export { Home };
