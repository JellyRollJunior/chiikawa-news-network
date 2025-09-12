import { useRef, useState } from 'react';
import { ModalDialog } from './ModalDialog.jsx';

const PostCreateModal = ({ closeFunction }) => {
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fileInputRef = useRef(null);

  const handleClickUpload = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const handleUploadMedia = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
  };

  return (
    <ModalDialog title="New Post" closeFunction={closeFunction}>
      <form className="text-amber-800">
        <main className="flex flex-col px-2">
          <label className="text-shadow-wrap mt-4 ml-1" htmlFor="title">
            Title
          </label>
          <input
            className="block-shadow mt-1 h-10 rounded-lg bg-white pl-3"
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            minLength={1}
            maxLength={75}
            required
          />
          <div className="text-shadow-wrap mt-2 mr-2 ml-auto">
            {title.length} / 75
          </div>
          <label className="text-shadow-wrap mt-2 ml-1" htmlFor="content">
            Content
          </label>
          <textarea
            className="block-shadow mt-1 h-36 w-full resize-none rounded-lg bg-white py-1 pl-2 disabled:bg-gray-200"
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            minLength={1}
            maxLength={350}
            required
          />
          <div className="text-shadow-wrap mt-2 mr-2 ml-auto">
            {content.length} / 350
          </div>
          <label className="text-shadow-wrap ml-1" htmlFor="content">
            Media (optional)
          </label>
          <div className="flex items-center">
            <button
              className="blue-button mt-1 w-fit px-5 py-1 flex-none"
              onClick={handleClickUpload}
            >
              Upload Media
            </button>
            <div className="mt-1 ml-3 max-h-12 flex-1 overflow-hidden overflow-ellipsis">{fileName}</div>
          </div>
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
            onChange={handleUploadMedia}
          />
        </main>
        <footer className="mt-3 flex gap-3">
          <button
            type="button"
            className="pink-button flex-1 px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button className="yellow-button flex-1 px-6 py-1.5 text-lg font-bold">
            Post
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { PostCreateModal };
