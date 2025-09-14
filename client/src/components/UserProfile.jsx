import { usePosts } from '../hooks/usePosts.js';
import { UserInfo } from './UserInfo.jsx';
import { Scrollable } from './Scrollable.jsx';
import { PostList } from './PostsList.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

const UserProfile = ({ userId }) => {
  const {
    posts,
    hasNextPage,
    isLoadingInit,
    fetchNextPage,
    isLoadingNext,
    refreshPosts,
    toggleLike,
    isLoadingLike,
  } = usePosts(5, userId);

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col">
      <Scrollable onScrollToBottom={fetchNextPage}>
        <UserInfo userId={userId} />
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
              toggleLike={toggleLike}
              hasNextPage={hasNextPage}
              isLoadingInit={isLoadingInit}
              isLoadingNext={isLoadingNext}
              isLoadingLike={isLoadingLike}
              // openDeleteModal={openDeleteModal}
            />
          </div>
        </section>
      </Scrollable>
    </div>
  );
};

export { UserProfile };
