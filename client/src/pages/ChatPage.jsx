import { Chats } from '../components/Chats.jsx';
import { Chat } from '../components/Chat.jsx';

const ChatPage = () => {
  return (
    <div className="flex h-full">
      <aside className="hidden max-w-md flex-2 lg:flex">
        <Chats />
      </aside>
      <div className="flex flex-3">
        <Chat />
      </div>
    </div>
  );
};

export { ChatPage };
