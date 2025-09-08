import { useState } from 'react';
import { Avatar } from './Avatar.jsx';

const MediaFrame = ({ src }) => {
  const [error, setError] = useState(false);

  return (
    <>
      {!error && src && (
        <img
          className="rounded-xl border-1 border-pink-200 bg-pink-100"
          src={src}
          onError={() => setError(true)}
        />
      )}
    </>
  );
};

const PostsListItem = ({ post }) => {
  const author = post && post.author;

  return (
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
        <div className="mt-2 flex justify-center items-center">
          <MediaFrame src={post.media} />
        </div>
      )}
    </li>
  );
};

export { PostsListItem };
