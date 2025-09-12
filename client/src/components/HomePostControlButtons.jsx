import { RefreshButton } from './RefreshButton.jsx';

const HomePostControlButtons = ({
  className,
  isFeed,
  setPostsToFeed,
  setPostsToAll,
  isLoadingInit,
  refreshPosts,
}) => {
  return (
    <section className={`flex gap-3 ${className}`}>
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
  );
};

export { HomePostControlButtons };
