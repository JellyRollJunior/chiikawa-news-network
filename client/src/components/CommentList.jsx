import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useComments } from '../hooks/useComments.js';
import { useCreateComment } from '../hooks/useCreateComment.js';
import { Avatar } from './Avatar.jsx';
import { CommentListItem } from './CommentListItem.jsx';
import { LoadingDots } from './LoadingDots.jsx';
import send from '../assets/svgs/send.svg';
import { useDeleteComment } from '../hooks/useDeleteComment.js';

const CommentList = ({ postId }) => {
  const [commentInput, setCommentInput] = useState('');
  const { avatar } = useContext(CurrentContext);
  const { postComment, isLoading: isPostingComment } = useCreateComment();
  const {
    comments,
    isLoading: isLoadingComments,
    toggleLike,
    isLoadingLike,
    refetch: refetchComments,
  } = useComments(postId);

  const handlePostComment = async (event) => {
    event.preventDefault();
    await postComment(postId, commentInput);
    // reset text area
    setCommentInput('');
    await refetchComments();
  };

  const { deleteComment } = useDeleteComment();
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    await refetchComments();
  };

  return (
    <>
      <hr className="mt-3 h-1 w-full border-yellow-300" />
      {!isLoadingComments ? (
        comments.length > 0 && (
          <ul className="mt-3 flex flex-col gap-4">
            {comments.map((comment) => (
              <CommentListItem
                comment={comment}
                toggleLike={toggleLike}
                isLoadingLike={isLoadingLike}
                handleDeleteComment={handleDeleteComment}
              />
            ))}
          </ul>
        )
      ) : (
        <div className="mt-3 text-center">
          Loading <LoadingDots dotTravelDistance={8} />
        </div>
      )}
      <form className="mt-3 mb-1 flex" onSubmit={handlePostComment}>
        <Avatar size={2} avatar={avatar} />
        <textarea
          className="ml-2 flex-1 resize-none rounded-lg border-1 border-pink-200 bg-white py-1 pl-2 disabled:bg-gray-200"
          type="text"
          name="comment"
          id="comment"
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
          minLength={1}
          maxLength={200}
          disabled={isPostingComment}
          placeholder="Share your thoughts..."
          required
        />
        <button className="ml-2" disabled={isPostingComment}>
          <img className="w-5" src={send} />
        </button>
      </form>
    </>
  );
};

export { CommentList };
