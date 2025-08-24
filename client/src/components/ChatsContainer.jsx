import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { Chats } from './Chats.jsx';
import { ChatsCreateModal } from './ChatsCreateModal.jsx';
import { usePublicChats } from '../hooks/usePublicChats.js';

const ChatsContainer = () => {
  const { chats, isLoading } = useContext(ChatsContext);
  const { publicChats, isLoading: isPublicLoading, refetch } = usePublicChats();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <Chats
        chats={chats}
        isLoading={isLoading}
        publicChats={publicChats}
        isPublicLoading={isPublicLoading}
        refetchPublic={refetch}
        openNewChatModal={openNewChatModal}
      />
      {isModalOpen && <ChatsCreateModal closeFunction={closeNewChatModal} />}
    </>
  );
};

export { ChatsContainer };
