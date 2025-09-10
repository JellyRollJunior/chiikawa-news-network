import { useComments } from '../hooks/useComments.js';
import { Avatar } from './Avatar.jsx';
import { IncrementButton } from './IncrementButton.jsx';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';

const PostListItemComments = ({ postId }) => {
  const { comments, isLoading } = useComments(postId);

  return (
    <>
    <hr className='w-full h-1 border-yellow-300 mt-4.5' />
    <ul className="mt-3 flex flex-col gap-3">
      {comments &&
        comments.map((comment) => (
          <li className="flex text-sm" key={comment.id}>
            <Avatar size={2} avatar={comment.author && comment.author.avatar} />
            <div className="ml-2 flex-1">
              <h4 className="font-bold">
                {comment.author && comment.author.username}
              </h4>
              <p>{comment.content}</p>
            </div>
            <IncrementButton
              className='mt-0.5 flex-col ml-1 mr-0.5 '
              src={comment.hasLiked ? heartFilled : heart}
              count={comment.likeCount}
            />
          </li>
        ))}
    </ul>
    </>
  );
};

export { PostListItemComments };
