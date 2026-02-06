import { RefreshButton } from '@/shared/components/RefreshButton.jsx';

const HomePostControlButtons = ({
  className,
  isFeed,
  setPostsToFeed,
  setPostsToAll,
  isLoadingInit,
  refreshPosts,
}) => {
  return (
    <section className={`flex gap-2 ${className}`}>
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
  );
};

export { HomePostControlButtons };
