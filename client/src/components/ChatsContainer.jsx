import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { usePublicChats } from '../hooks/usePublicChats.js';
import { Chats } from './Chats.jsx';
import { ChatsCreateModal } from './ChatsCreateModal.jsx';

const ChatsContainer = () => {
  const { chats, isLoading, refetchChats } = useContext(ChatsContext);
  const { publicChats, isLoading: isPublicLoading, refetch: refetchPublic } = usePublicChats();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <Chats
        chats={chats}
        isLoading={isLoading}
        refetchChats={refetchChats}
        publicChats={publicChats}
        isPublicLoading={isPublicLoading}
        refetchPublic={refetchPublic}
        openNewChatModal={openNewChatModal}
      />
      {isModalOpen && <ChatsCreateModal closeFunction={closeNewChatModal} />}
    </>
  );
};

export { ChatsContainer };
