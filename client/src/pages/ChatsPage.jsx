import { Chats } from '../components/Chats.jsx';
import { HomeMessagePrompt } from '../components/HomeMessagePrompt.jsx';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex-3 flex md:max-w-md">
        <Chats />
      </aside>
      <div className="flex-4 mr-2 items-center justify-center hidden md:flex">
        <HomeMessagePrompt />
      </div>
    </div>
  );
};

export { ChatsPage };
