import { Home } from '../components/Home.jsx';
import { HomeMessagePrompt } from '../components/HomeMessagePrompt.jsx';

const HomePage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex-3 flex md:max-w-md">
        <Home />
      </aside>
      <div className="flex-4 hidden md:block">
        <HomeMessagePrompt />
      </div>
    </div>
  );
};

export { HomePage };
