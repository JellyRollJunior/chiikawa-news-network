import { Chats } from '../components/Chats.jsx';
import { Chat } from '../components/Chat.jsx';

const ChatPage = () => {
  return (
    <div className="flex h-full">
      <aside className="flex-2 hidden max-w-md md:flex">
        <Chats />
      </aside>
      <div className="flex-3 flex">
        <Chat />
      </div>
    </div>
  );
};

export { ChatPage };
