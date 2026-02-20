import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { IncrementButton } from '@/features/posts/components/IncrementButton.jsx';
import { DotsMenuItem } from '@/shared/components/DotsMenuItem.jsx';
import { DotsMenu } from '@/shared/components/DotsMenu.jsx';
import { LoadingDots } from '@/shared/components/LoadingDots.jsx';

import heart from '@/assets/svgs/heart.svg';
import heartFilled from '@/assets/svgs/heart-filled.svg';

const CommentsView = ({
  currentUserId,
  comments,
  isLoadingComments,
  toggleLike,
  isLoadingLike,
  openDeleteModal,
}) => {
  return isLoadingComments ? (
    <div className="mt-3 text-center">
      Loading <LoadingDots dotTravelDistance={8} />
    </div>
  ) : (
    comments.length > 0 && (
      <ul className="mt-3 flex flex-col gap-2">
        {comments.map((comment) =>
          !comment || !comment.author ? null : (
            <li
              className="pink-gradient rounded-lg border-1 px-2 pt-2 pb-1 md:pt-2 md:pr-3 md:pb-1 md:pl-2"
              key={comment.id}
            >
              {/* Avatar, Username, Content, & Like btn */}
              <div className="flex justify-between gap-2">
                <div className="flex min-w-0 flex-col">
                  <div className="flex h-fit items-center">
                    <Avatar
                      className="size-[26px] border-1 border-yellow-500 md:size-[42px]"
                      avatar={comment.author.avatar}
                    />
                    <h4 className="ml-2 flex-1 truncate font-medium md:text-lg">
                      <Link
                        className="hover:text-amber-900"
                        to={`/users/${comment.author.id}`}
                        title={comment.author.username}
                      >
                        {comment.author.username}
                      </Link>
                    </h4>
                  </div>
                  <p className="mt-1 ml-0.5 overflow-hidden text-sm break-words md:text-base">
                    {comment.content}
                  </p>
                </div>
                <IncrementButton
                  className="mt-3 mr-0.5 shrink-0 flex-col"
                  src={comment.hasLiked ? heartFilled : heart}
                  count={comment.likeCount}
                  onClick={() => toggleLike(comment.id, comment.hasLiked)}
                  isDisabled={isLoadingLike}
                />
              </div>

              {/* Menu & Timestamp */}
              <div className="flex items-center justify-end gap-2">
                {comment.author.id == currentUserId && (
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
          )
        )}
      </ul>
    )
  );
};

export { CommentsView };
