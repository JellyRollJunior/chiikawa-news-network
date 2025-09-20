import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import { ChatsList } from './ChatsList.jsx';
import kaniReading from '../assets/images/kani-reading.png';

const Chats = ({
  chats,
  isLoading,
  refetchChats,
  publicChats,
  isPublicLoading,
  refetchPublic,
  openNewChatModal,
}) => {
  const { username } = useContext(CurrentContext);
  const [filter, setFilter] = useState('');

  // search filter
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredChats = chats
    ? chats.filter((chat) => chat.name.toLowerCase().includes(normalizedFilter))
    : [];

  return (
    <div className="main-container relative mx-4 mt-3 mb-2 flex flex-1 flex-col">
      <header className="yellow-block mx-2 mt-3 flex items-end justify-between pr-2 pl-5">
        <h2 className="text-shadow-wrap mt-2 mb-1 text-3xl font-bold">
          {username}
        </h2>
      </header>
      <input
        className="block-shadow mx-2 mt-3 h-9 rounded-lg bg-white pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <div className="relative mt-3 flex w-full justify-center">
        <button
          className="blue-button relative px-6 py-1 text-lg font-medium"
          onClick={openNewChatModal}
        >
          New Conversation
        </button>
      </div>
      <section className="yellow-block mx-2 mt-3 pt-2 pb-1 sm:pb-2 md:pb-1">
        <ChatsSectionTitle title="Public rooms" refreshBtn={refetchPublic} />
        <ChatsList
          chats={publicChats}
          isLoading={isPublicLoading}
          loadingElements={1}
        />
      </section>
      <section className="yellow-block mx-2 mt-3 mb-3 flex flex-1 flex-col overflow-y-hidden pt-2 pb-1 md:pb-2">
        <ChatsSectionTitle title="Conversations" refreshBtn={refetchChats} />
        <main className="scrollbar-thin scrollbar-track-yellow-50 mt-2 flex-1 overflow-y-scroll">
          <ChatsList chats={filteredChats} isLoading={isLoading} />
        </main>
      </section>
      <img
        className="drop-shadow-pink-outline absolute -right-[16px] -bottom-[8px] w-[96px]"
        src={kaniReading}
      />
    </div>
  );
};

export { Chats };
