import { LogoTitle } from './LogoTitle.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import { PostList } from './PostsList.jsx';

const UserPosts = ({
  posts,
  hasNextPage,
  isLoadingInit,
  isLoadingNext,
  refreshPosts,
  toggleLike,
  isLoadingLike,
}) => {
  return (
    <section className="flex flex-1 flex-col">
      <div className="flex gap-2">
        <div className="yellow-block flex flex-1 items-center justify-start gap-4 py-2">
          <LogoTitle className="ml-3 text-lg" text="Posts" />
        </div>
        <div className="pink-block flex items-center px-1">
          <RefreshButton onclick={refreshPosts} />
        </div>
      </div>
      <div className="mt-1.5 flex-1">
        <PostList
          posts={posts}
          hasNextPage={hasNextPage}
          isLoadingInit={isLoadingInit}
          isLoadingNext={isLoadingNext}
          toggleLike={toggleLike}
          isLoadingLike={isLoadingLike}
          refreshPosts={refreshPosts}
        />
      </div>
    </section>
  );
};

export { UserPosts };
