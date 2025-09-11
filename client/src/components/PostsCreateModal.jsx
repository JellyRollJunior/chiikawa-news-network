import { useRef } from 'react';
import { ModalDialog } from './ModalDialog.jsx';

const PostCreateModal = ({ closeFunction }) => {
  const fileInputRef = useRef(null);

  return (
    <ModalDialog title="New Post" closeFunction={closeFunction}>
      <form className="text-amber-800">
        <main className="flex flex-col px-2">
          <label className="text-shadow-wrap mt-4 ml-1" htmlFor="title">
            Title
          </label>
          <input
            className="block-shadow mt-2 mb-2 h-10 rounded-lg bg-white pl-3"
            id="title"
            name="title"
          />
          <label className="text-shadow-wrap mt-2 ml-1" htmlFor="content">
            Content
          </label>
          <textarea
            className="block-shadow mt-2 flex-1 resize-none rounded-lg bg-white py-1 pl-2 disabled:bg-gray-200"
            id="content"
            name="content"
          />
          {/* media (?) */}
          <label className="text-shadow-wrap mt-4 ml-1" htmlFor="content">
            Media (optional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
          />
        </main>
        <footer></footer>
      </form>
    </ModalDialog>
  );
};

export { PostCreateModal };
