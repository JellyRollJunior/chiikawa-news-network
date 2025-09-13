import { useDeletePost } from '../hooks/useDeletePost.js';
import { ModalDialog } from './ModalDialog.jsx';
import warning from '../assets/svgs/warning.svg';

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
      <form className="flex flex-col" onSubmit={handleDeletePost}>
        <img className="mt-6 w-12 self-center" src={warning} />
        <h2 className="text-center">
          Post will be deleted <strong>forever</strong>.
          <br />
          <strong>This cannot be undone</strong>.
          <br />
          Are you sure?
        </h2>
        <footer className="mt-6 flex gap-3">
          <button className="yellow-button px-5 py-1.5" disabled={isLoading}>
            Delete
          </button>
          <button
            className="pink-button flex-1 px-5 py-1.5"
            type="button"
            onClick={closeFunction}
            disabled={isLoading}
          >
            Cancel
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { HomeDeletePostModal };
