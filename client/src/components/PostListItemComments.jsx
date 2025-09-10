import { useComments } from '../hooks/useComments.js';
import { Avatar } from './Avatar.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import { useContext } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';
import send from '../assets/svgs/send.svg';

const PostListItemComments = ({ postId }) => {
  const { avatar } = useContext(CurrentContext);
  const { comments, toggleLike, isLoadingLike } = useComments(postId);

  return (
    <>
      <hr className="mt-3 h-1 w-full border-yellow-300" />
      <ul className="mt-3 flex flex-col gap-4">
        {comments &&
          comments.map((comment) => (
            <li className="flex text-sm" key={comment.id}>
              <Avatar
                size={2}
                avatar={comment.author && comment.author.avatar}
              />
              <div className="ml-2 flex-1">
                <h4 className="font-bold">
                  {comment.author && comment.author.username}
                </h4>
                <p>{comment.content}</p>
              </div>
              <IncrementButton
                className="mt-0.5 mr-0.5 ml-1 flex-col"
                src={comment.hasLiked ? heartFilled : heart}
                count={comment.likeCount}
                onClick={() => toggleLike(comment.id, comment.hasLiked)}
                isDisable={isLoadingLike}
              />
            </li>
          ))}
      </ul>
      <form className="mt-3 flex">
        <Avatar size={2} avatar={avatar} />
        <textarea
          className="ml-2 flex-1 resize-none rounded-lg border-1 border-pink-200 bg-white py-1 pl-2"
          type="text"
          placeholder="Share your thoughts..."
        />
        <button className="ml-2">
          <img className="w-5" src={send} />
        </button>
      </form>
    </>
  );
};

export { PostListItemComments };
