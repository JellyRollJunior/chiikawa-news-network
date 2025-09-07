import { usePostsFeed } from '../hooks/usePosts.js';
import { Home } from './Home.jsx';

const HomeContainer = () => {
  
  const { posts } = usePostsFeed(3);

  console.log(posts);

  return (
    <>
      <Home />
    </>
  );
};

export { HomeContainer };
