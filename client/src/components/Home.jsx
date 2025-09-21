import { useContext, useState } from 'react';
import { usePosts } from '../hooks/usePosts.js';
import { Avatar } from './Avatar.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { PostList } from './PostsList.jsx';
import { Scrollable } from './Scrollable.jsx';
import { HomePostControlButtons } from './HomePostControlButtons.jsx';
import { HomeNewPostModal } from './HomeNewPostModal.jsx';
import { LogoTitle } from './LogoTitle.jsx';

const Home = () => {
  const { avatar } = useContext(CurrentContext);
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
      <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col">
        <Scrollable onScrollToBottom={fetchNextPage}>
          <LogoTitle className="mx-2 mt-3 justify-center" />
          <HomePostControlButtons
            className="mx-4 mt-2"
            isFeed={isFeed}
            setPostsToFeed={setPostsToFeed}
            setPostsToAll={setPostsToAll}
            isLoadingInit={isLoadingInit}
            refreshPosts={refreshPosts}
          />
          <section className="mx-2 mt-3 flex items-center gap-2">
            <Avatar
              className="size-[32px] md:size-[42px]"
              avatar={avatar}
              secondaryStyling={true}
            />
            <button
              className="block-shadow h-9 flex-1 rounded-lg bg-white"
              onClick={openCreatePostModal}
            >
              What's on your mind?
            </button>
          </section>
          <section className="mx-2 mt-3 mb-2">
            <PostList
              posts={posts}
              hasNextPage={hasNextPage}
              isLoadingInit={isLoadingInit}
              isLoadingNext={isLoadingNext}
              toggleLike={toggleLike}
              isLoadingLike={isLoadingLike}
              refreshPosts={refreshPosts}
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
