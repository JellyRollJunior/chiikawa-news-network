import { useDeleteComment } from '@/features/posts/hooks/useDeleteComment.js';
import { Modal } from '@/shared/components/Modal.jsx';
import { DeleteForm } from '@/shared/components/DeleteForm.jsx';

const DeleteCommentModal = ({
  open = false,
  closeModal,
  commentId,
  onDeleteComment,
}) => {
  const { deleteComment, isLoading } = useDeleteComment();

  const handleDeleteComment = async (event) => {
    event.preventDefault();
    if (!commentId) return;
    await deleteComment(commentId);
    closeModal();
    onDeleteComment();
  };

  return (
    <Modal open={open} closeModal={closeModal} title="Delete Post">
      <DeleteForm
        label="The comment"
        onSubmit={handleDeleteComment}
        isLoading={isLoading}
        closeFunction={closeModal}
      />
    </Modal>
  );
};

export { DeleteCommentModal };
