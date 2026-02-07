import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { useDeleteChat } from '@/features/chats/hooks/useDeleteChat.js';
import { ModalDialog } from '@/shared/components/ModalDialog.jsx';
import { DeleteForm } from '@/shared/components/DeleteForm.jsx';

const ChatDeleteModal = ({ closeFunction, chatId }) => {
  const navigate = useNavigate();
  const { refetchChats } = useContext(ChatsContext);
  const { deleteChat, isLoading } = useDeleteChat();

  const handleDeleteChat = async (event) => {
    event.preventDefault();
    await deleteChat(chatId);
    closeFunction();
    refetchChats();
    navigate('/chats');
  };

  return (
    <ModalDialog closeFunction={closeFunction} title="Delete Conversation">
      <DeleteForm
        label="All messages"
        onSubmit={handleDeleteChat}
        isLoading={isLoading}
        closeFunction={closeFunction}
      />
    </ModalDialog>
  );
};

export { ChatDeleteModal };
