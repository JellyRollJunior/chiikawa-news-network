import { useDeletePost } from '../hooks/useDeletePost.js';
import { ModalDialog } from './ModalDialog.jsx';
import { DeleteForm } from './DeleteForm.jsx';

const HomeDeletePostModal = ({ postId, closeFunction, onSubmit }) => {
  const { deletePost, isLoading } = useDeletePost();

  const handleDeletePost = async (event) => {
    event.preventDefault();
    if (!postId) return;
    await deletePost(postId);
    closeFunction();
    onSubmit();
  };

  return (
    <ModalDialog title="Delete Post" closeFunction={closeFunction}>
      <DeleteForm
        label="Post"
        onSubmit={handleDeletePost}
        isLoading={isLoading}
        closeFunction={closeFunction}
      />
    </ModalDialog>
  );
};

export { HomeDeletePostModal };
