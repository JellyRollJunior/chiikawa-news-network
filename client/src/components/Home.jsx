import { useContext, useState } from 'react';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { Chats } from './Chats.jsx';
import { ModalDialog } from './ModalDialog.jsx';
import { CreateChatForm } from './CreateChatForm.jsx';

const Home = () => {
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
      {isModalOpen && (
        <ModalDialog closeFunction={closeNewChatModal}>
          <CreateChatForm closeForm={closeNewChatModal} />
        </ModalDialog>
      )}
    </>
  );
};

export { Home };
