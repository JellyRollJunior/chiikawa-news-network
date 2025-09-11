import { ModalDialog } from './ModalDialog.jsx';

const PostCreateModal = ({ closeFunction }) => {
  return (
    <ModalDialog title="New Post" closeFunction={closeFunction}>
      <div>hi im post create modal</div>
    </ModalDialog>
  );
};

export { PostCreateModal };
