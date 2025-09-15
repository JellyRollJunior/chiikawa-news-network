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
        className={`button flex-1 px-5 py-1 ${
          isFeed
            ? 'rounded-xl border-2 border-pink-400 bg-pink-300 font-bold hover:bg-pink-400'
            : 'rounded-xl border-2 border-pink-300 bg-pink-200 hover:bg-pink-300'
        }`}
        onClick={setPostsToFeed}
        disabled={isLoadingInit}
      >
        For You
      </button>
      <RefreshButton onclick={refreshPosts} />
      <button
        className={`button flex-1 px-5 py-1 ${
          !isFeed
            ? 'rounded-xl border-2 border-pink-400 bg-pink-300 font-bold hover:bg-pink-400'
            : 'rounded-xl border-2 border-pink-300 bg-pink-200 hover:bg-pink-300'
        }`}
        onClick={setPostsToAll}
        disabled={isLoadingInit}
      >
        All
      </button>
    </section>
  );
};

export { HomePostControlButtons };
