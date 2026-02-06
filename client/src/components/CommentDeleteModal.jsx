import { useDeleteComment } from '../hooks/useDeleteComment.js';
import { ModalDialog } from '@/shared/components/ModalDialog.jsx';
import { DeleteForm } from './DeleteForm.jsx';

const CommentDeleteModal = ({ commentId, closeFunction, onSubmit }) => {
  const { deleteComment, isLoading } = useDeleteComment();

  const handleDeleteComment = async (event) => {
    event.preventDefault();
    if (!commentId) return;
    await deleteComment(commentId);
    closeFunction();
    onSubmit();
  };

  return (
    <ModalDialog title="Delete Post" closeFunction={closeFunction}>
      <DeleteForm
        label="The comment"
        onSubmit={handleDeleteComment}
        isLoading={isLoading}
        closeFunction={closeFunction}
      />
    </ModalDialog>
  );
};

export { CommentDeleteModal };
