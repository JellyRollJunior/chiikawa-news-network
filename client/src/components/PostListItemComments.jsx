import { useComments } from '../hooks/useComments.js';

const PostListItemComments = ({ postId }) => {
  const { comments, isLoading } = useComments(postId);

  return (
    <ul>
      {comments && comments.map((comment) => <li>{comment.content}</li>)}
      <div>hi</div>
    </ul>
  );
};

export { PostListItemComments };
