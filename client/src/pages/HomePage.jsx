import { Home } from '../components/Home.jsx';
import { HomeMessagePrompt } from '../components/HomeMessagePrompt.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex-3 flex md:max-w-md">
        <Home />
      </aside>
      <div className="flex-4 mr-2 items-center justify-center hidden md:flex">
        <HomeMessagePrompt />
      </div>
    </div>
  );
};

export { HomePage };
