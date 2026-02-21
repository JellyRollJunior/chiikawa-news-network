import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { format } from 'date-fns';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { CommentSection } from '@/features/posts/components/CommentSection.jsx';
import { IncrementButton } from '@/features/posts/components/IncrementButton.jsx';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { DotsMenu } from '@/shared/components/DotsMenu.jsx';
import { DotsMenuItem } from '@/shared/components/DotsMenuItem.jsx';
import { LoadingElement } from '@/shared/components/LoadingElement.jsx';

import errorImg from '@/assets/images/chii-hachi-scared.png';
import heart from '@/assets/svgs/heart.svg';
import heartFilled from '@/assets/svgs/heart-filled.svg';
import comment from '@/assets/svgs/comment.svg';

const Post = ({
  blockStyle = 'yellow-block',
  post,
  toggleLike,
  openDeleteModal,
  isLoading = false,
  isLoadingLike = false,
}) => {
  const { id } = useContext(CurrentContext);
  const [mediaError, setMediaError] = useState(false);
  const [isShowingComments, setIsShowingComments] = useState(false);

  if (isLoading) {
    return (
      <li
        className={`${blockStyle} flex flex-col px-3 pt-2 pb-1.5 md:px-4 md:pt-4 md:pb-3`}
      >
        <header className="flex items-center gap-3">
          <LoadingElement className="size-8 shrink-0 rounded-full bg-gray-300" />
          <LoadingElement className="h-5 w-3/10 rounded-md bg-gray-300" />
        </header>
        <LoadingElement className="mt-3 h-5 w-6/10 rounded-md bg-gray-300" />
        <LoadingElement className="mt-2 h-4 w-8/10 rounded-md bg-gray-300" />
        <LoadingElement className="mx-auto mt-4 mb-1 h-40 w-9/10 rounded-lg bg-gray-300" />
      </li>
    );
  }

  if (!post || !post.author) return null;

  const author = post.author;
  return (
    <li
      className={`${blockStyle} flex flex-col px-3 pt-2 pb-1.5 md:px-4 md:pt-4 md:pb-3`}
    >
      {/* Avatar, User info, Post menu */}
      <header className="flex items-center gap-2">
        <Avatar
          className="size-[34px] self-start border-1 border-yellow-500 md:size-[36px]"
          avatar={author ? author.avatar : null}
          size={1.75}
          secondaryStyling={true}
        />
        <h3 className="flex-1 truncate font-medium md:text-xl">
          <Link
            className="hover:text-amber-900"
            to={`/users/${author.id}`}
            title={author.username}
          >
            {author.username}
          </Link>
        </h3>
        {author.id === id && (
          <div className="self-start">
            <DotsMenu>
              <DotsMenuItem
                label="Delete post"
                onClick={() => openDeleteModal(post.id)}
              />
            </DotsMenu>
          </div>
        )}
      </header>

      {/* Post content */}
      <h2 className="mt-0.5 text-lg font-semibold md:mt-1 md:text-xl">
        {post.title}
      </h2>
      <p className="text-sm md:text-base">{post.content}</p>

      {/* Post Media */}
      {post.media && (
        <div className="mt-2 flex items-center justify-center md:mt-3">
          <div className="relative flex items-center justify-center">
            <img
              className={`pink-gradient rounded-xl border-1 bg-pink-100 ${mediaError && 'max-w-3xs'}`}
              src={!mediaError ? post.media : errorImg}
              onError={() => setMediaError(true)}
            />
            {mediaError && (
              <div className="text-shadow-wrap absolute text-xl font-bold">
                Error loading image
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post interaction buttons, Comments */}
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
      {isShowingComments && <CommentSection postId={post.id} />}
    </li>
  );
};

export { Post };
