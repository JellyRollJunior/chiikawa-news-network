import { ModalDialog } from './ModalDialog.jsx';
import warning from '../assets/svgs/warning.svg';

const HomeDeletePostModal = ({ closeFunction, onSubmit }) => {
  const handleDeletePost = (event) => {
    event.preventDefault();
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
          <button className="yellow-button px-5 py-1.5">Delete</button>
          <button
            className="pink-button flex-1 px-5 py-1.5"
            type="button"
            onClick={closeFunction}
          >
            Cancel
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { HomeDeletePostModal };
