import { Chats } from '../components/Chats.jsx';
import { ChatsMessageNotice } from '../components/ChatsMessageNotice.jsx';

const ChatsPage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex-3 flex md:max-w-md">
        <Chats />
      </aside>
      <div className="flex-4 mr-2 hidden items-center justify-center md:flex">
        <ChatsMessageNotice />
      </div>
    </div>
  );
};

export { ChatsPage };
