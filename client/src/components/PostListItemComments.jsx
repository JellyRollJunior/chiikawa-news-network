import { useComments } from '../hooks/useComments.js';
import { Avatar } from './Avatar.jsx';

const PostListItemComments = ({ postId }) => {
  const { comments, isLoading } = useComments(postId);

  return (
    <ul className="mt-3 flex flex-col gap-1">
      {comments &&
        comments.map((comment) => (
          <li className="flex gap-2 text-sm" key={comment.id}>
            <Avatar size={2} avatar={comment.author && comment.author.avatar} />
            {comment.content}
          </li>
        ))}
    </ul>
  );
};

export { PostListItemComments };
