import { PostFeed } from '@/features/posts/components/PostFeed/';
import { HomeUsersAside } from '@/features/users/components/HomeUsersAside.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full w-full justify-between">
      <div className="flex w-full flex-1 justify-center">
        <div className="main-container mx-4 mt-3 mb-2 flex max-w-xl flex-1 flex-col">
          <PostFeed />
        </div>
      </div>
      <HomeUsersAside />
    </div>
  );
};

export { HomePage };
