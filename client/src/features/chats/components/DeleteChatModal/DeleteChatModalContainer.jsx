import { DeleteChatModalView } from '@/features/chats/components/DeleteChatModal/DeleteChatModalView.jsx';
import { useDeleteChat } from '@/features/chats/hooks/useDeleteChat.js';

const DeleteChatModalContainer = ({ open, closeModal, chatId, onSubmit }) => {
  const { deleteChat, isLoading } = useDeleteChat();

  const handleDeleteChat = async (event) => {
    event.preventDefault();
    await deleteChat(chatId);
    closeModal();
    onSubmit();
  };

  return (
    <DeleteChatModalView
      open={open}
      closeModal={closeModal}
      handleDeleteChat={handleDeleteChat}
      isDeletingChat={isLoading}
    />
  );
};

export { DeleteChatModalContainer };
