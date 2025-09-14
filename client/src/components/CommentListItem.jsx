import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { Avatar } from './Avatar.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import { DotsMenuItem } from './DotsMenuItem.jsx';
import { DotsMenu } from './DotsMenu.jsx';
import { formatDistanceToNow } from 'date-fns';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';

const CommentListItem = ({
  comment,
  toggleLike,
  isLoadingLike,
  openDeleteModal,
}) => {
  const { id } = useContext(CurrentContext);

  return (
    <li>
      <div className="flex">
        <Avatar size={2} avatar={comment.author && comment.author.avatar} />
        <div className="ml-2 flex-1">
          <h4 className="text-base font-medium">
            {comment.author && comment.author.username}
          </h4>
          <p className="text-sm">{comment.content}</p>
        </div>
        {comment.author.id == id && (
          <DotsMenu>
            <DotsMenuItem
              label="Delete comment"
              onClick={() => openDeleteModal(comment.id)}
            />
          </DotsMenu>
        )}
        <IncrementButton
          className="mt-1 mr-0.5 ml-1 flex-col"
          src={comment.hasLiked ? heartFilled : heart}
          count={comment.likeCount}
          onClick={() => toggleLike(comment.id, comment.hasLiked)}
          isDisabled={isLoadingLike}
        />
      </div>
        <p className='text-xs text-center text-gray-500'> — {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true})} — </p>
    </li>
  );
};

export { CommentListItem };
