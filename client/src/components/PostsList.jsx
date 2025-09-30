import { Fragment, useState } from 'react';
import { PostsListItem } from './PostsListItem.jsx';
import { LoadingDots } from './LoadingDots.jsx';
import { HomeDeletePostModal } from './HomeDeletePostModal.jsx';
import { BLOCKS } from '../styles/blocks.js';
import kuriPeace from '../assets/images/kuri-beer.png';
import logo from '../assets/nav/chiikawa-glasses.png';

const PostListNotification = ({ src, children }) => {
  return (
    <li className="duckegg-block flex flex-col px-3 py-2 md:text-lg">
      <div className="mt-2 flex items-center justify-center">
        <img className="w-1/4" src={src} alt="" />
      </div>
      <h2 className="mt-2 text-center font-semibold">{children}</h2>
    </li>
  );
};

const PostList = ({
  posts = [],
  hasNextPage,
  isLoadingInit,
  isLoadingNext,
  toggleLike,
  isLoadingLike,
  refreshPosts,
  noPostsMessage = 'User has not posted yet',
}) => {
  // Delete Post Modal
  const [postToBeDeletedId, setPostToBeDeletedId] = useState(null);
  const openDeleteModal = (postId) => setPostToBeDeletedId(postId);
  const closeDeleteModal = () => setPostToBeDeletedId(null);

  return (
    <>
      <ul className="flex flex-col gap-2">
        {!isLoadingInit
          ? posts.map((post, index) => (
              <Fragment key={post.id}>
                <PostsListItem
                  blockStyle={BLOCKS[index % BLOCKS.length]}
                  post={post}
                  toggleLike={toggleLike}
                  isLoadingLike={isLoadingLike}
                  openDeleteModal={openDeleteModal}
                />
              </Fragment>
            ))
          : /* Init skeleton animation */
            [...Array(3)].map((item, index) => (
              <Fragment key={index}>
                <PostsListItem isLoading={true} />
                <PostsListItem isLoading={true} loadingDelay={0.8} />
              </Fragment>
            ))}
        {/* Loading posts animation */}
        {isLoadingNext && (
          <PostListNotification src={logo}>
            Loading <LoadingDots dotTravelDistance={8} />
          </PostListNotification>
        )}
        {/* User scrolled to bottom */}
        {!hasNextPage && posts.length > 0 && (
          <PostListNotification src={kuriPeace}>
            You scrolled to the end!
          </PostListNotification>
        )}
        {/* User has no posts */}
        {!isLoadingInit && posts.length == 0 && (
          <PostListNotification src={logo}>
            {noPostsMessage}
          </PostListNotification>
        )}
      </ul>
      {postToBeDeletedId && (
        <HomeDeletePostModal
          postId={postToBeDeletedId}
          closeFunction={closeDeleteModal}
          onSubmit={refreshPosts}
        />
      )}
    </>
  );
};

export { PostList };
