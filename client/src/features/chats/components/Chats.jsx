import SimpleBar from 'simplebar-react';
import { useContext, useEffect, useState } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { usePublicChats } from '@/features/chats/hooks/usePublicChats.js';
import { ChatsList } from '@/features/chats/components/ChatsList.jsx';
import { RefreshButton } from '@/shared/components/RefreshButton.jsx';
import { CreateChatModal } from '@/features/chats/components/CreateChatModal/';

import editSquare from '@/assets/svgs/edit-square.svg';
import kaniReading from '@/assets/images/kani-reading.png';

const Chats = () => {
  const { username } = useContext(CurrentContext);
  const {
    chats,
    isLoading: isLoadingChats,
    refetchChats,
  } = useContext(ChatsContext);
  const {
    publicChats,
    isLoading: isPublicLoading,
    refetch: refetchPublicChats,
  } = usePublicChats();

  // chat search filter
  const [filter, setFilter] = useState('');
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredChats = chats
    ? chats.filter((chat) => chat.name.toLowerCase().includes(normalizedFilter))
    : [];

  // refetch chats on load
  useEffect(() => {
    refetchChats();
  }, [refetchChats]);

  // create chat modal
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
  const openCreateChatModal = () => setIsCreateChatModalOpen(true);
  const closeCreateChatModal = () => setIsCreateChatModalOpen(false);

  return (
    <div className="main-container relative mx-4 mt-3 mb-2 flex w-full flex-1 flex-col">
      <SimpleBar className="h-full">
        <div className="flex flex-col px-3 pt-3 pb-2.5 md:pt-3.5">
          {/* User info, Create chats modal button, Search bar */}
          <header className="flex gap-2">
            <div className="yellow-block flex-1 pt-1 pb-0.5">
              <h2 className="text-shadow-wrap font-chiikawa text-center text-lg">
                {username}
              </h2>
            </div>
            <div className="pink-block flex">
              <button
                className="h-full self-end rounded-sm pt-1.5 pr-1 pb-1 pl-1.5 hover:bg-pink-200"
                onClick={openCreateChatModal}
              >
                <img src={editSquare} alt="" />
              </button>
            </div>
          </header>
          <input
            className="block-shadow mt-2 h-9 shrink-0 rounded-lg bg-white pr-2 pl-3"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search"
          />

          {/* Public Chats */}
          <section className="pink-block mt-2 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-shadow-wrap font-chiikawa pl-4 font-bold">
                Public Chats
              </h3>
              <div className="mr-2">
                <RefreshButton
                  className={`hover:bg-pink-200`}
                  onclick={refetchPublicChats}
                />
              </div>
            </div>
            <ChatsList
              chats={publicChats}
              isLoading={isPublicLoading}
              loadingElements={1}
              hoverColor="pink-200"
            />
          </section>
          <div className="block-shadow mt-2 h-4 shrink-0 rounded-lg bg-yellow-50"></div>

          {/* Private chats */}
          <section className="duckegg-block mt-2 flex flex-1 flex-col pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-shadow-wrap font-chiikawa pl-4 font-bold">
                Conversation
              </h3>
              <div className="mr-2">
                <RefreshButton
                  className={`hover:bg-duckegg-dark`}
                  onclick={refetchChats}
                />
              </div>
            </div>
            <main className="mt-2 flex-1">
              <ChatsList
                chats={filteredChats}
                isLoadingChats={isLoadingChats}
                isNoChatsPromptShown={true}
                hoverColor="duckegg-dark"
              />
            </main>
          </section>
        </div>
      </SimpleBar>
      <img
        className="drop-shadow-pink-outline absolute -right-[16px] -bottom-[8px] w-[80px]"
        src={kaniReading}
      />
      <CreateChatModal
        open={isCreateChatModalOpen}
        closeModal={closeCreateChatModal}
      />
    </div>
  );
};

export { Chats };
