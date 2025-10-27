import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { format } from 'date-fns';
import { Avatar } from './Avatar.jsx';
import { CommentList } from './CommentList.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import { DotsMenu } from './DotsMenu.jsx';
import { DotsMenuItem } from './DotsMenuItem.jsx';
import errorImg from '../assets/images/chii-hachi-scared.png';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';
import comment from '../assets/svgs/comment.svg';
import { Link } from 'react-router';

const MediaFrame = ({ src }) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <img
          className={`pink-gradient rounded-xl border-1 bg-pink-100 ${error && 'max-w-3xs'}`}
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
  blockStyle = 'yellow-block',
  post,
  toggleLike,
  openDeleteModal,
  isLoading = false,
  isLoadingLike = false,
  loadingDelay = 0,
}) => {
  const { id } = useContext(CurrentContext);
  const [isShowingComments, setIsShowingComments] = useState(false);
  const author = post && post.author;

  if (!post) return;
  return !isLoading ? (
    <li className={`${blockStyle} flex flex-col px-3 py-2 md:px-4 md:py-4`}>
      <header className="flex items-center gap-2">
        <Avatar
          className="size-[34px] self-start border-1 border-yellow-500 md:size-[36px]"
          avatar={author ? author.avatar : null}
          size={1.75}
          secondaryStyling={true}
        />
        <h3 className="font-medium md:text-xl">
          <Link className="hover:text-amber-900" to={`/users/${author.id}`}>
            {author.username}
          </Link>
        </h3>
        {author.id == id && (
          <DotsMenu>
            <DotsMenuItem
              label="Delete post"
              onClick={() => openDeleteModal(post.id)}
            />
          </DotsMenu>
        )}
      </header>
      <h2 className="mt-0.5 text-lg font-semibold md:mt-1 md:text-xl">
        {post.title}
      </h2>
      <p className="text-sm md:text-base">{post.content}</p>
      {post.media && (
        <div className="mt-2 flex items-center justify-center md:mt-3">
          <MediaFrame src={post.media} />
        </div>
      )}
      <footer className="mt-3 flex gap-2.5 md:mt-4">
        <IncrementButton
          className="pink-gradient gap-1 rounded-xl border-1 py-1 pr-4 pl-2.5"
          src={post.hasLiked ? heartFilled : heart}
          count={post.likeCount}
          onClick={() => toggleLike(post.id, post.hasLiked)}
          isDisabled={isLoadingLike}
        />
        <IncrementButton
          className="pink-gradient gap-1 rounded-xl border-1 py-1 pr-4 pl-2.5"
          src={comment}
          count={post.commentCount}
          onClick={() => setIsShowingComments(!isShowingComments)}
        />
        <div className="mr-2 ml-auto self-center text-center text-sm text-gray-600 md:text-base">
          {format(new Date(post.createdAt), 'MM/dd/yyy h:maaa')}
        </div>
      </footer>
      {isShowingComments && <CommentList postId={post.id} />}
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
      <h2 className="mt-3 h-2 w-6/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-8/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-3/10 rounded-xs bg-gray-300" />
      <p className="mx-auto mt-3 mb-1 size-35 rounded-lg bg-gray-300" />
    </LoadingElement>
  );
};

export { PostsListItem };
