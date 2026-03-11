import { Chats } from '@/features/chats/components/Chats/';
import { Chat } from '@/features/chats/components/Chat/';

const ChatPage = () => {
  return (
    <div className="flex h-full">
      <aside className="hidden max-w-md flex-2 lg:flex">
        <Chats />
      </aside>
      <div className="flex-3 px-4 pt-3 pb-2">
        <main className='main-container h-full w-full'>
          <Chat />
        </main>
      </div>
    </div>
  );
};

export { ChatPage };
