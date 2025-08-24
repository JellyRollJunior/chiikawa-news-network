import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { Chats } from './Chats.jsx';
import { ChatsCreateModal } from './ChatsCreateModal.jsx';

const ChatsContainer = () => {
  const { chats, isLoading } = useContext(ChatsContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openNewChatModal = () => setIsModalOpen(true);
  const closeNewChatModal = () => setIsModalOpen(false);

  return (
    <>
      <Chats
        chats={chats}
        isLoading={isLoading}
        openNewChatModal={openNewChatModal}
      />
      {isModalOpen && <ChatsCreateModal closeFunction={closeNewChatModal} />}
    </>
  );
};

export { ChatsContainer };
