import { useContext } from 'react';
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { CurrentContext } from '@/contexts/CurrentProvider.jsx';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { IncrementButton } from '@/features/posts/components/IncrementButton.jsx';
import { DotsMenuItem } from '@/shared/components/DotsMenuItem.jsx';
import { DotsMenu } from '@/shared/components/DotsMenu.jsx';

import heart from '@/assets/svgs/heart.svg';
import heartFilled from '@/assets/svgs/heart-filled.svg';

const CommentListItem = ({
  comment,
  toggleLike,
  isLoadingLike,
  openDeleteModal,
}) => {
  const { id } = useContext(CurrentContext);

  if (!comment || !comment.author) return;
  const author = comment.author;
  return (
    <li className="pink-gradient rounded-lg border-1 px-2 pt-2 pb-1 md:pt-2 md:pr-3 md:pb-1 md:pl-2">
      {/* Avatar, Username, Content, & Like btn */}
      <div className="flex gap-2 justify-between ">
        <div className="flex min-w-0 flex-col">
          <div className="flex h-fit items-center">
            <Avatar
              className="size-[26px] border-1 border-yellow-500 md:size-[42px]"
              avatar={author.avatar}
            />
            <h4 className="ml-2 flex-1 truncate font-medium md:text-lg">
              <Link
                className="hover:text-amber-900"
                to={`/users/${author.id}`}
                title={author.username}
              >
                {author.username}
              </Link>
            </h4>
          </div>
          <p className="mt-1 ml-0.5 text-sm break-words overflow-hidden md:text-base">{comment.content}</p>
        </div>
        <IncrementButton
          className="mt-3 mr-0.5 flex-col shrink-0"
          src={comment.hasLiked ? heartFilled : heart}
          count={comment.likeCount}
          onClick={() => toggleLike(comment.id, comment.hasLiked)}
          isDisabled={isLoadingLike}
        />
      </div>
      {/* Menu & Timestamp */}
      <div className="flex items-center justify-end gap-2">
        {comment.author.id == id && (
          <div className="-translate-y-0.75">
            <DotsMenu isVertical={false}>
              <DotsMenuItem
                label="Delete comment"
                onClick={() => openDeleteModal(comment.id)}
              />
            </DotsMenu>
          </div>
        )}
        <p className="mt-1 text-end text-xs text-gray-600">
          —{' '}
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </li>
  );
};

export { CommentListItem };
