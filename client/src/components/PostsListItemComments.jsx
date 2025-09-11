import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useComments } from '../hooks/useComments.js';
import { useCommentsCreate } from '../hooks/useCommentsCreate.js';
import { Avatar } from './Avatar.jsx';
import { Comment } from './Comment.jsx';
import send from '../assets/svgs/send.svg';
import { LoadingDots } from './LoadingDots.jsx';

const PostsListItemComments = ({ postId }) => {
  const [commentInput, setCommentInput] = useState('');
  const { avatar } = useContext(CurrentContext);
  const {
    comments,
    isLoading: isLoadingComments,
    toggleLike,
    isLoadingLike,
    refetch: refetchComments,
  } = useComments(postId);
  const { postComment, isLoading: isPostingComment } = useCommentsCreate();

  const handlePostComment = async (event) => {
    event.preventDefault();
    await postComment(postId, commentInput);
    // reset text area
    setCommentInput('');
    await refetchComments();
  };

  return (
    <>
      <hr className="mt-3 h-1 w-full border-yellow-300" />
      {!isLoadingComments ? (
        comments.length > 0 && (
          <ul className="mt-3 flex flex-col gap-4">
            {comments.map((comment) => (
              <Comment
                comment={comment}
                toggleLike={toggleLike}
                isLoadingLike={isLoadingLike}
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
          className="ml-2 flex-1 resize-none rounded-lg border-1 border-pink-200 bg-white py-1 pl-2"
          type="text"
          name="comment"
          id="comment"
          value={commentInput}
          onChange={(event) => setCommentInput(event.target.value)}
          // MAX LEN MIN LEN
          // DISABLED WHEN LOADING
          placeholder="Share your thoughts..."
          required
        />
        <button className="ml-2">
          <img className="w-5" src={send} />
        </button>
      </form>
    </>
  );
};

export { PostsListItemComments };
