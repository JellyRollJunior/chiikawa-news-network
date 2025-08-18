import { Home } from '../components/Home.jsx';
import { HomeMessagePrompt } from '../components/HomeMessagePrompt.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full">
      <aside className="border-r-1 min-w-xs flex-3 border-gray-500 md:max-w-sm">
        <Home />
      </aside>
      <div className="flex-8 hidden md:block">
        <HomeMessagePrompt />
      </div>
    </div>
  );
};

export { HomePage };
