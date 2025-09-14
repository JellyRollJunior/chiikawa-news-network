import { Fragment, useState } from 'react';
import { PostsListItem } from './PostsListItem.jsx';
import { LoadingDots } from './LoadingDots.jsx';
import { HomeDeletePostModal } from './HomeDeletePostModal.jsx';
import kuriPeace from '../assets/images/kuri-beer.png';
import logo from '../assets/nav/chiikawa-glasses.png';

const PostList = ({
  posts = [],
  hasNextPage,
  isLoadingInit,
  isLoadingNext,
  toggleLike,
  isLoadingLike,
  refreshPosts,
}) => {
  // Delete Post Modal
  const [postToBeDeletedId, setPostToBeDeletedId] = useState(null);
  const openDeleteModal = (postId) => setPostToBeDeletedId(postId);
  const closeDeleteModal = () => setPostToBeDeletedId(null);

  return (
    <>
      <ul className="flex flex-col gap-2">
        {!isLoadingInit
          ? posts.map((post) => (
              <Fragment key={post.id}>
                <PostsListItem
                  post={post}
                  toggleLike={toggleLike}
                  isLoadingLike={isLoadingLike}
                  openDeleteModal={openDeleteModal}
                />
              </Fragment>
            ))
          : /* Loading display */
            [...Array(3)].map((item, index) => (
              <Fragment key={index}>
                <PostsListItem isLoading={true} />
                <PostsListItem isLoading={true} loadingDelay={0.8} />
              </Fragment>
            ))}
        {isLoadingNext && (
          <li className="blue-block flex flex-col px-3 py-2">
            <div className="mt-2 flex items-center justify-center">
              <img className="w-1/4" src={logo} alt="Chiikawa with glasses" />
            </div>
            <h2 className="mt-2 text-center font-semibold">
              Loading <LoadingDots dotTravelDistance={8} />
            </h2>
          </li>
        )}
        {!hasNextPage && posts.length > 0 && (
          <li className="blue-block flex flex-col px-3 py-2">
            <div className="mt-2 flex items-center justify-center">
              <img className="w-1/4" src={kuriPeace} alt="" />
            </div>
            <h2 className="mt-2 text-center font-semibold">
              You scrolled to the end!
            </h2>
          </li>
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
