import { useDeletePost } from '@/features/posts/hooks/useDeletePost.js';
import { Modal } from '@/shared/components/Modal.jsx';
import { DeleteForm } from '@/shared/components/DeleteForm.jsx';

const DeletePostModal = ({
  open = false,
  closeModal,
  postId,
  onDeletePost,
}) => {
  const { deletePost, isLoading } = useDeletePost();

  const handleDeletePost = async (event) => {
    event.preventDefault();
    if (!postId) return;
    await deletePost(postId);
    closeModal();
    onDeletePost();
  };

  return (
    <Modal open={open} closeModal={closeModal} title="Delete Post">
      <DeleteForm
        label="The post"
        onSubmit={handleDeletePost}
        isLoading={isLoading}
        closeFunction={closeModal}
      />
    </Modal>
  );
};

export { DeletePostModal };
