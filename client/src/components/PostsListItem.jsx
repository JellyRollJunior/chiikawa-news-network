import { Avatar } from "./Avatar.jsx";

const PostsListItem = () => {
  return (
    <li className="yellow-block flex flex-col px-3 py-2">
      <header className="flex items-center gap-2">
        <Avatar size={2} secondaryStyling={true} />
        <h3 className="text-lg">Username</h3>
      </header>
      <h2>Title</h2>
      <p>Content</p>
      <img className="rounded-lg border-1 border-black"  alt="" />
      <p className="text-end text-sm">2 hours ago</p>
      <footer className="flex">
        <button>like</button>
        <button>comment</button>
      </footer>
    </li>
  );
};

export { PostsListItem}
