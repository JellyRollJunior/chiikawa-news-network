import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { ChatsSection } from './ChatsSection.jsx';
import { ChatsCreateModal } from './ChatsCreateModal.jsx';

const Chats = () => {
  const { chats, isLoading } = useContext(ChatsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <ChatsSection
        chats={chats}
        isLoading={isLoading}
        openNewChatModal={openNewChatModal}
      />
      {isModalOpen && <ChatsCreateModal closeFunction={closeNewChatModal} />}
    </>
  );
};

export { Chats };
