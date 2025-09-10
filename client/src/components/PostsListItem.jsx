import { useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { PostListItemComments } from './PostListItemComments.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import errorImg from '../assets/images/chii-hachi-scared.png';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';
import comment from '../assets/svgs/comment.svg';

const MediaFrame = ({ src }) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <img
          className={`rounded-xl border-1 border-pink-200 bg-pink-100 ${error && 'max-w-3xs'}`}
          src={!error ? src : errorImg}
          onError={() => setError(true)}
        />
        {error && (
          <div className="text-shadow-wrap absolute text-xl font-bold">
            Error loading image
          </div>
        )}
      </div>
    </>
  );
};

const PostsListItem = ({
  post,
  toggleLike = { toggleLike },
  isLoading = false,
  isLoadingLike = false,
  loadingDelay = 0,
}) => {
  const [isShowingComments, setIsShowingComments] = useState(false);
  const author = post && post.author;

  if (!post) return;
  return !isLoading ? (
    <li className="yellow-block flex flex-col px-3 py-2">
      <header className="flex items-center gap-2">
        <Avatar
          avatar={author ? author.avatar : null}
          size={1.75}
          secondaryStyling={true}
        />
        <h3 className="text-lg">{author.username}</h3>
      </header>
      <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
      <p className="mt-1 text-sm text-yellow-900">{post.content}</p>
      {post.media && (
        <div className="mt-2 flex items-center justify-center">
          <MediaFrame src={post.media} />
        </div>
      )}
      <footer className="mt-3 flex gap-2.5">
        <IncrementButton
          className="gap-1 rounded-xl border-1 border-pink-200 py-1 pr-4 pl-2.5"
          src={post.hasLiked ? heartFilled : heart}
          count={post.likeCount}
          onClick={() => toggleLike(post.id, post.hasLiked)}
          isDisabled={isLoadingLike}
        />
        <IncrementButton
          className="gap-1 rounded-xl border-1 border-pink-200 py-1 pr-4 pl-2.5"
          src={comment}
          count={post.commentCount}
          onClick={() => setIsShowingComments(!isShowingComments)}
        />
      </footer>
      {isShowingComments && post.commentCount > 0 && (
        <PostListItemComments postId={post.id} />
      )}
    </li>
  ) : (
    /* Loading display */
    <LoadingElement
      className="rounded-lg border-1 border-yellow-200 px-3 py-2"
      delay={loadingDelay}
    >
      <header className="flex items-center gap-2">
        <div className="size-8 shrink-0 rounded-full bg-gray-300" />
        <h3 className="h-4 w-3/10 rounded-xs bg-gray-300" />
      </header>
      <h2 className="mt-5 h-2 w-6/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-8/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-3/10 rounded-xs bg-gray-300" />
    </LoadingElement>
  );
};

export { PostsListItem };
