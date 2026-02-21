import { useState } from 'react';
import { Post } from '@/features/posts/components/Post.jsx';
import { DeletePostModal } from '@/features/posts/components/DeletePostModal.jsx';
import { LoadingDots } from '@/shared/components/LoadingDots.jsx';
import { BLOCKS } from '@/styles/blocks.js';

import logo from '@/assets/nav/chiikawa-glasses.png';
import kuriPeace from '@/assets/images/kuri-beer.png';

const PostAlert = ({ src, children }) => {
  return (
    <li className="duckegg-block flex flex-col px-3 py-2 md:text-lg">
      <div className="mt-2 flex items-center justify-center">
        <img className="w-1/4" src={src} alt="" />
      </div>
      <h2 className="mt-2 text-center font-semibold">{children}</h2>
    </li>
  );
};

const Posts = ({
  posts = [],
  hasNextPage,
  isLoadingInit,
  isLoadingNext,
  toggleLike,
  isLoadingLike,
  refreshPosts,
  noPostsMessage = 'User has not posted yet',
}) => {
  const skeletonCount = 6;
  const visiblePosts = isLoadingInit ? [...Array(skeletonCount)] : posts;
  const showEmpty = !isLoadingInit && posts.length === 0;
  const showEnd = !hasNextPage && posts.length > 0;

  // Delete Post Modal
  const [postToBeDeletedId, setPostToBeDeletedId] = useState(null);
  const openDeleteModal = (postId) => setPostToBeDeletedId(postId);
  const closeDeleteModal = () => setPostToBeDeletedId(null);

  return (
    <ul className="flex flex-col gap-2">
      {/* Posts */}
      {visiblePosts.map((post, index) => (
        <Post
          key={post?.id ?? index}
          isLoading={isLoadingInit}
          blockStyle={BLOCKS[index % BLOCKS.length]}
          post={post}
          toggleLike={toggleLike}
          isLoadingLike={isLoadingLike}
          openDeleteModal={openDeleteModal}
        />
      ))}

      {/* Loading posts animation */}
      {isLoadingNext && (
        <PostAlert src={logo}>
          Loading <LoadingDots dotTravelDistance={8} />
        </PostAlert>
      )}

      {/* User scrolled to bottom */}
      {showEnd && (
        <PostAlert src={kuriPeace}>You scrolled to the end!</PostAlert>
      )}

      {/* User has no posts */}
      {showEmpty && <PostAlert src={logo}>{noPostsMessage}</PostAlert>}

      <DeletePostModal
        open={postToBeDeletedId != null}
        postId={postToBeDeletedId}
        closeModal={closeDeleteModal}
        onDeletePost={refreshPosts}
      />
    </ul>
  );
};

export { Posts };
