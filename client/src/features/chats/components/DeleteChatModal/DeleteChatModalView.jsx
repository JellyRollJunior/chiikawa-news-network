import { Modal } from '@/shared/components/Modal.jsx';
import { DeleteForm } from '@/shared/components/DeleteForm.jsx';

const DeleteChatModalView = ({
  open,
  closeModal,
  handleDeleteChat,
  isDeletingChat,
}) => {
  return (
    <Modal open={open} closeModal={closeModal} title="Delete Conversation">
      <DeleteForm
        label="All messages"
        onSubmit={handleDeleteChat}
        isLoading={isDeletingChat}
        closeFunction={closeModal}
      />
    </Modal>
  );
};

export { DeleteChatModalView };
