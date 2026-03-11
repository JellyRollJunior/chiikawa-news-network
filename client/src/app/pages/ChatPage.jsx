import { useParams } from 'react-router';
import { Chats } from '@/features/chats/components/Chats/';
import { Chat } from '@/features/chats/components/Chat/';

const ChatPage = () => {
  const { chatId: routeChatId } = useParams();

  return (
    <div className="flex h-full">
      <aside className="hidden max-w-md flex-2 px-4 pt-3 pb-2 lg:flex">
        <div className="main-container h-full w-full">
          <Chats routeChatId={routeChatId} />
        </div>
      </aside>
      <div className="flex-3 px-4 pt-3 pb-2">
        <main className="main-container h-full w-full">
          <Chat />
        </main>
      </div>
    </div>
  );
};

export { ChatPage };
