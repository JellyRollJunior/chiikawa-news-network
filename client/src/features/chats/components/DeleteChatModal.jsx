import { useDeleteChat } from '@/features/chats/hooks/useDeleteChat.js';
import { ModalDialog } from '@/shared/components/ModalDialog.jsx';
import { DeleteForm } from '@/shared/components/DeleteForm.jsx';

const DeleteChatModal = ({ open, closeModal, onSubmit, chatId }) => {
  const { deleteChat, isLoading } = useDeleteChat();

  const handleDeleteChat = async (event) => {
    event.preventDefault();
    await deleteChat(chatId);
    onSubmit();
  };

  return (
    <ModalDialog
      open={open}
      closeModal={closeModal}
      title="Delete Conversation"
    >
      <DeleteForm
        label="All messages"
        onSubmit={handleDeleteChat}
        isLoading={isLoading}
        closeFunction={closeModal}
      />
    </ModalDialog>
  );
};

export { DeleteChatModal };
