import { useContext, useState } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useCreateComment } from '@/features/posts/hooks/useCreateComment.js';
import { Avatar } from '@/shared/components/Avatar.jsx';

import send from '@/assets/svgs/send.svg';

const CommentInput = ({ className = '', postId, onSubmit }) => {
  const [commentInput, setCommentInput] = useState('');
  const { avatar } = useContext(CurrentContext);
  const { postComment, isLoading: isPostingComment } = useCreateComment();

  const handlePostComment = async (event) => {
    event.preventDefault();
    await postComment(postId, commentInput);
    // reset text area
    setCommentInput('');
    await onSubmit();
  };

  return (
    <form className={`flex ${className}`} onSubmit={handlePostComment}>
      <Avatar
        className="size-[32px] border-1 border-yellow-500 md:size-[42px]"
        avatar={avatar}
      />
      <textarea
        className="ml-2 flex-1 resize-none rounded-lg border-1 border-pink-200 bg-white py-1 pr-1.5 pl-2 disabled:bg-gray-200"
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
        <img className="w-5 md:w-6" src={send} />
      </button>
    </form>
  );
};

export { CommentInput };
