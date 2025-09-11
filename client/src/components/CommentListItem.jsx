import { Avatar } from './Avatar.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';

const CommentListItem = ({ comment, toggleLike, isLoadingLike }) => {
  return (
    <li className="flex text-sm" key={comment.id}>
      <Avatar size={2} avatar={comment.author && comment.author.avatar} />
      <div className="ml-2 flex-1">
        <h4 className="font-bold">
          {comment.author && comment.author.username}
        </h4>
        <p>{comment.content}</p>
      </div>
      <IncrementButton
        className="mt-1 mr-0.5 ml-1 flex-col"
        src={comment.hasLiked ? heartFilled : heart}
        count={comment.likeCount}
        onClick={() => toggleLike(comment.id, comment.hasLiked)}
        isDisabled={isLoadingLike}
      />
    </li>
  );
};

export { CommentListItem };
