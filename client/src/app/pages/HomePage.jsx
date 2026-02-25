import { PostFeed } from '@/features/posts/components/PostFeed/';
import { UsersAside } from '@/features/users/components/UsersAside/';

const HomePage = () => {
  return (
    <div className="flex h-full w-full justify-between">
      <div className="flex w-full flex-1 justify-center">
        <section className="main-container mx-4 mt-3 mb-2 flex max-w-xl flex-1 flex-col">
          <PostFeed />
        </section>
      </div>
      <aside className="main-container mt-3 mr-4 mb-2 hidden md:flex md:w-[10rem] lg:w-xs">
        <UsersAside />
      </aside>
    </div>
  );
};

export { HomePage };
