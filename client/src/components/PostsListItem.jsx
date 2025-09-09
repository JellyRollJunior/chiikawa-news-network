import { useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import errorImg from '../assets/images/chii-hachi-scared.png';
import heart from '../assets/svgs/heart.svg';
import heartFilled from '../assets/svgs/heart-filled.svg';
import comment from '../assets/svgs/comment.svg';


const MediaFrame = ({ src }) => {
  const [error, setError] = useState(false);

  return (
    <>
      <div className='relative flex items-center justify-center'>
        <img
          className={`rounded-xl border-1 border-pink-200 bg-pink-100 ${error && 'max-w-3xs'}`}
          src={!error ? src : errorImg}
          onError={() => setError(true)}
        />
        {error && (
          <div className='absolute text-shadow-wrap font-bold text-xl'>Error loading image</div>
        )}
      </div>
    </>
  );
};

const PostFooterButton = ({ src, count }) => {
  return (
    <button className='flex gap-1 items-center pl-2.5 pr-4 py-1 rounded-xl border-1 border-pink-200'>
      <img className='w-4.5' src={src}  />
      <div className='text-sm'>{count}</div>
    </button>
  )
}

const PostsListItem = ({ post, isLoading = false, loadingDelay = 0 }) => {
  const author = post && post.author;

  return !isLoading ? (
    <li className="yellow-block flex flex-col px-3 py-2">
      <header className="flex items-center gap-2">
        <Avatar
          avatar={author ? author.avatar : null}
          size={1.75}
          secondaryStyling={true}
        />
        <h3 className="text-lg">{author.username}</h3>
      </header>
      <h2 className="mt-2 font-semibold">{post.title}</h2>
      <p className="mt-1 text-sm text-yellow-900">{post.content}</p>
      {post.media && (
        <div className="mt-2 flex items-center justify-center">
          <MediaFrame src={post.media} />
        </div>
      )}
      <footer className='mt-3 flex gap-2.5'>
        <PostFooterButton  src={post.hasLiked ? heartFilled : heart} count={post.likeCount}/>
        <PostFooterButton  src={comment} count={post.comments.length}/>
      </footer>
    </li>
  ) : (
    /* Loading display */
    <LoadingElement
      className="rounded-lg border-1 border-yellow-200 px-3 py-2"
      delay={loadingDelay}
    >
      <header className="flex items-center gap-2">
        <div className="size-8 shrink-0 rounded-full bg-gray-300" />
        <h3 className="h-4 w-3/10 rounded-xs bg-gray-300" />
      </header>
      <h2 className="mt-5 h-2 w-6/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-8/10 rounded-xs bg-gray-300" />
      <p className="mt-2 h-2 w-3/10 rounded-xs bg-gray-300" />
    </LoadingElement>
  );
};

export { PostsListItem };
