import { Home } from '../components/Home.jsx';

const HomeAsideLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <aside className="flex-3 hidden max-w-md md:flex">
        <Home />
      </aside>
      <div className="flex-4 flex">{children}</div>
    </div>
  );
};

export { HomeAsideLayout };
