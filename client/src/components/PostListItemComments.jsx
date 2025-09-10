import { useComments } from '../hooks/useComments.js';
import { Avatar } from './Avatar.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';

const PostListItemComments = ({ postId }) => {
  const { comments, isLoading } = useComments(postId);

  return (
    <ul className="mt-3 flex flex-col gap-1">
      {comments &&
        comments.map((comment) => (
          <li className="flex gap-2 text-sm" key={comment.id}>
            <Avatar size={2} avatar={comment.author && comment.author.avatar} />
            <p className="flex-1">{comment.content}</p>
            <IncrementButton
              src={comment.hasLiked ? heartFilled : heart}
              count={comment.likeCount}
            />
          </li>
        ))}
    </ul>
  );
};

export { PostListItemComments };
