import { useContext, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { usePublicChats } from '../hooks/usePublicChats.js';
import { ChatsSectionTitle } from './ChatsSectionTitle.jsx';
import { ChatsList } from './ChatsList.jsx';
import { ChatsNewConversationModal } from './ChatsNewConversationModal.jsx';
import kaniReading from '../assets/images/kani-reading.png';
import editSquare from '../assets/svgs/edit-square.svg';

const Chats = () => {
  const { username } = useContext(CurrentContext);
  const { chats, isLoading, refetchChats } = useContext(ChatsContext);
  const {
    publicChats,
    isLoading: isPublicLoading,
    refetch: refetchPublic,
  } = usePublicChats();

  // chat search filter
  const [filter, setFilter] = useState('');
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredChats = chats
    ? chats.filter((chat) => chat.name.toLowerCase().includes(normalizedFilter))
    : [];

  // new convo modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openNewConversationModal = () => setIsModalOpen(true);
  const closeNewConversationModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="main-container relative mx-4 mt-3 mb-2 flex w-full flex-1 flex-col px-3 pt-3.5 pb-2.5">
        <header className="flex gap-2">
          <div className="yellow-block flex-1 pt-1 pb-0.5">
            <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
              {username}
            </h2>
          </div>
          <div className='pink-block flex'>
            <button
              className="self-end h-full rounded-sm pl-1.5 pr-1 pt-1.5 pb-1 hover:bg-pink-200"
              onClick={openNewConversationModal}
            >
              <img src={editSquare} alt="" />
            </button>
          </div>
        </header>
        <input
          className="block-shadow mt-2 h-9 rounded-lg bg-white pl-3"
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          placeholder="Search"
        />
        <section className="duckegg-block mt-2 pt-2 ">
          <ChatsSectionTitle title="Public rooms" refreshBtn={refetchPublic} />
          <ChatsList
            chats={publicChats}
            isLoading={isPublicLoading}
            loadingElements={1}
          />
        </section>
        <div className="block-shadow mt-2 h-4 rounded-lg bg-pink-50"></div>
        <section className="duckegg-block mt-2 flex flex-1 flex-col overflow-y-hidden pt-2">
          <ChatsSectionTitle title="Conversations" refreshBtn={refetchChats} />
          <main className="scrollbar-thin scrollbar-track-duckegg mt-2 flex-1 overflow-y-scroll">
            <ChatsList chats={filteredChats} isLoading={isLoading} />
          </main>
        </section>
        <img
          className="drop-shadow-pink-outline absolute -right-[16px] -bottom-[8px] w-[96px]"
          src={kaniReading}
        />
      </div>
      {isModalOpen && (
        <ChatsNewConversationModal closeFunction={closeNewConversationModal} />
      )}
    </>
  );
};

export { Chats };
