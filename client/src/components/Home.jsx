import { useContext } from 'react';
import { usePostsFeed } from '../hooks/usePosts.js';
import { Avatar } from './Avatar.jsx';
import { RefreshButton } from './RefreshButton.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { PostList } from './PostsList.jsx';
import logo from '../assets/nav/chiikawa-glasses.png';

const Home = () => {
  const { avatar } = useContext(CurrentContext);
  const { posts } = usePostsFeed(5);

  return (
    <div className="main-container mx-4 mt-3 mb-2 flex flex-1 flex-col overflow-y-scroll scrollbar-thin scrollbar-track-yellow-50">
      <header className="mx-2 mt-3 flex items-center justify-center gap-2">
        <img
          className="w-[43px]"
          src={logo}
          alt="Chiikawa with glasses (CNN Logo)`"
        />
        <h1 className="text-shadow-wrap font-chiikawa text-center text-[15px]">
          Chiikawa News Network
        </h1>
      </header>
      <section className="mx-4 mt-2 flex gap-3">
        <button className="blue-button flex-1 px-7 py-1">For you</button>
        <RefreshButton />
        <button className="yellow-button flex-1 px-7 py-1">All</button>
      </section>
      <section className="mx-2 mt-3 flex gap-2">
        <Avatar avatar={avatar} size={2.5} secondaryStyling={true} />
        <button className="block-shadow h-full flex-1 rounded-lg bg-white">
          Whats on your mind?
        </button>
      </section>
      <section className="mx-2 mt-3 mb-3">
        <PostList posts={posts} />
      </section>
    </div>
  );
};

export { Home };
