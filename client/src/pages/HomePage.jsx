import { Home } from '../components/Home.jsx';
import { HomeMessagePrompt } from '../components/HomeMessagePrompt.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full">
      <aside className="md:border-r-1 flex-3 flex md:border-gray-500">
        <Home />
      </aside>
      <div className="flex-8 hidden md:block">
        <HomeMessagePrompt />
      </div>
    </div>
  );
};

export { HomePage };
