import { Home } from '../components/Home.jsx';

const HomeAsideLayout = ({ children }) => {
  return (
    <div className="flex h-full">
      <aside className="flex-2 hidden max-w-md md:flex">
        <Home />
      </aside>
      <div className="flex-3 flex">{children}</div>
    </div>
  );
};

export { HomeAsideLayout };
