import { useRef, useState } from 'react';
import { ModalDialog } from './ModalDialog.jsx';
import { useCreatePost } from '../hooks/useCreatePost.js';
import trash from '../assets/svgs/trash.svg';

const HomeNewPostModal = ({ closeFunction, onSubmit }) => {
  const { createPost, isLoading } = useCreatePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isUploadMode, setIsUploadMode] = useState(true);
  const [media, setMedia] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [urlError, setUrlError] = useState(false);
  const fileInputRef = useRef(null);
  const MIMETYPES = 'image/jpg, image/jpeg, image/png, image/gif, image/webp';
  const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  const useUploadMode = () => {
    setMedia(null);
    setIsUploadMode(true);
  };

  const useUrlMode = () => {
    setMedia('');
    setIsUploadMode(false);
  };

  const handleClickUpload = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const handleUploadMedia = (event) => {
    const file = event.target.files[0];
    const FILE_SIZE_LIMIT = 1024 * 250; // 250kb

    if (file.size <= FILE_SIZE_LIMIT) {
      setMedia(file);
      setUploadError('');
    } else {
      setMedia(null);
      setUploadError('File too large');
    }
  };

  const isMediaUrlValid = (value) => {
    if (typeof value == 'string' || value instanceof String) {
      return EXTENSIONS.reduce((hasAllowedExtension, extension) => {
        return hasAllowedExtension || value.endsWith(extension);
      }, false);
    }
    return false;
  };

  // switch modes clears media
  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate URL if URL mode + user entered URL
    if (!isUploadMode && media && !isMediaUrlValid(media)) {
      return setUrlError(true);
    }
    if (media) {
      await createPost(title, content, media);
    } else {
      await createPost(title, content, null);
    }
    closeFunction();
    onSubmit();
  };

  return (
    <ModalDialog title="New Post" closeFunction={closeFunction}>
      <form className="mt-2 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="pink-dotted-block flex flex-col px-3 pt-2 pb-2">
          <label className="text-shadow-wrap ml-1" htmlFor="title">
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
          <div className="text-shadow-wrap mt-1 mr-2 ml-auto">
            {title.length} / 75
          </div>
          <label className="text-shadow-wrap ml-1" htmlFor="content">
            Content
          </label>
          <textarea
            className="block-shadow mt-1 h-32 w-full resize-none rounded-lg bg-white py-1 pr-1 pl-2 disabled:bg-gray-200"
            id="content"
            name="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            minLength={1}
            maxLength={350}
            required
          />
          <div className="text-shadow-wrap mt-1 mr-2 ml-auto">
            {content.length} / 350
          </div>
        </div>
        <div className="pink-dotted-block flex flex-col gap-2 px-3 pt-2 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex">
              <button
                className={`rounded-tl-lg rounded-bl-lg border-1 border-pink-200 bg-pink-50 px-5 py-1 ${isUploadMode && `border-pink-400 bg-pink-100 font-bold`}`}
                type="button"
                onClick={useUploadMode}
              >
                Upload
              </button>
              <button
                className={`rounded-tr-lg rounded-br-lg border-1 border-pink-200 bg-pink-50 px-5 py-1 ${!isUploadMode && `border-pink-400 bg-pink-100 font-bold`}`}
                type="button"
                onClick={useUrlMode}
              >
                Link
              </button>
            </div>
            <div
              className={`text-shadow-wrap text-sm ${uploadError && 'font-bold text-red-400'}`}
            >
              {isUploadMode && '(max 250Kb)'}
            </div>
          </div>
          <div
            className={`text-shadow-wrap text-center text-xs ${urlError && 'font-bold text-red-400'}`}
          >
            URL must end with [.jpg, .jpeg, .png, .gif, .webp]
          </div>
          {isUploadMode ? (
            <div className="flex h-12 items-center">
              <button
                className="blue-button w-fit flex-none px-3 py-1"
                type="button"
                onClick={handleClickUpload}
                disabled={isLoading}
              >
                Upload Media
              </button>
              <div className="ml-3 max-h-12 flex-1 overflow-hidden overflow-ellipsis">
                {media && media.name}
              </div>
              {media && (
                <button onClick={() => setMedia(null)}>
                  <img src={trash} alt="Delete media button" />
                </button>
              )}
              <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                accept={MIMETYPES}
                onChange={handleUploadMedia}
              />
            </div>
          ) : (
            <input
              className="block-shadow h-10 rounded-lg bg-white pl-3"
              id="mediaUrl"
              name="mediaUrl"
              type="url"
              value={media}
              onChange={(event) => setMedia(event.target.value)}
              placeholder="https://www.media.com/url.png"
            />
          )}
        </div>
        <footer className="flex gap-3">
          <button
            type="button"
            className="pink-button flex-1 px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="blue-button flex-1 px-6 py-1.5 text-lg font-bold"
            disabled={isLoading}
          >
            Post
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { HomeNewPostModal };
