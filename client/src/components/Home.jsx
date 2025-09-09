import { useContext } from 'react';
import { usePostsFeed } from '../hooks/usePosts.js';
import { Avatar } from './Avatar.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { PostList } from './PostsList.jsx';
import { Scrollable } from './Scrollable.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

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
    likePost,
  } = usePostsFeed(5);

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col">
      <Scrollable onScrollToBottom={fetchNextPage}>
        <header className="mx-2 mt-3 flex items-center justify-center gap-2">
          <img
            className="w-[43px]"
            src={logo}
            alt="Chiikawa with glasses (CNN Logo)"
          />
          <h1 className="text-shadow-wrap font-chiikawa text-center text-[15px]">
            Chiikawa News Network
          </h1>
        </header>
        <section className="mx-4 mt-2 flex gap-3">
          <button
            className={`flex-1 px-7 py-1 ${isFeed ? 'blue-button' : 'yellow-button'}`}
            onClick={setPostsToFeed}
            disabled={isLoadingInit}
          >
            For you
          </button>
          <RefreshButton onclick={refreshPosts} />
          <button
            className={`flex-1 px-7 py-1 ${isFeed ? 'yellow-button' : 'blue-button'}`}
            onClick={setPostsToAll}
            disabled={isLoadingInit}
          >
            All
          </button>
        </section>
        <section className="mx-2 mt-3 flex gap-2">
          <Avatar avatar={avatar} size={2.5} secondaryStyling={true} />
          <button className="block-shadow flex-1 rounded-lg bg-white">
            Whats on your mind?
          </button>
        </section>
        <section className="mx-2 mt-3 mb-2">
          <PostList
            posts={posts}
            likePost={likePost}
            hasNextPage={hasNextPage}
            isLoadingInit={isLoadingInit}
            isLoadingNext={isLoadingNext}
          />
        </section>
      </Scrollable>
    </div>
  );
};

export { Home };
