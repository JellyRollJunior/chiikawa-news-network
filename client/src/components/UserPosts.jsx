import { PostList } from './PostsList.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

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
    <section className="mx-2 mt-1 mb-2 flex flex-1 flex-col overflow-hidden">
      <div className="my-2 flex items-center justify-center gap-4">
        <img
          className="w-[43px]"
          src={logo}
          alt="Chiikawa with glasses (CNN Logo)"
        />
        <h2 className="font-chiikawa text-shadow-wrap text-center text-2xl font-bold">
          Posts
        </h2>
        <div className="mt-2">
          <RefreshButton onclick={refreshPosts} />
        </div>
      </div>
      <div className="mt-1 flex-1 overflow-y-scroll">
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
