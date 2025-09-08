import { Avatar } from './Avatar.jsx';

const PostsListItem = ({ post }) => {
  const author = post && post.author;

  return (
    <li className="yellow-block flex flex-col px-3 py-2">
      <header className="flex items-center gap-2">
        <Avatar avatar={author ? author.avatar : null} size={2} secondaryStyling={true} />
        <h3 className="text-lg">{author.username}</h3>
      </header>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {post.media && <img src={post.media} className="rounded-lg bg-pink-200" alt="" />}
      <p className="text-end text-sm">2 hours ago</p>
      <footer className="flex">
        <button>like</button>
        <button>comment</button>
      </footer>
    </li>
  );
};

export { PostsListItem };
