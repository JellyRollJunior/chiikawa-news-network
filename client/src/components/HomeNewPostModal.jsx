import { useRef, useState } from 'react';
import { ModalDialog } from './ModalDialog.jsx';
import { useCreatePost } from '../hooks/useCreatePost.js';
import { profanityMatcher, textCensor } from '../services/textCensor.js';
import trash from '../assets/svgs/trash.svg';

const NewPostFormTextSection = ({ title, setTitle, content, setContent }) => {
  return (
    <div className="pink-dotted-block flex flex-col px-3 pt-2 pb-2">
      <div className="flex justify-between">
        <label className="text-shadow-wrap ml-1" htmlFor="title">
          Title
        </label>
        <div className="text-shadow-wrap mr-2">{title.length} / 75</div>
      </div>
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
      <div className="block-shadow mt-2 h-8 w-full resize-none rounded-lg bg-pink-50 py-1 pr-1 pl-2 break-words">
        {textCensor.applyTo(title, profanityMatcher.getAllMatches(title))}
      </div>
      <div className="mt-3 flex justify-between">
        <label className="text-shadow-wrap ml-1" htmlFor="content">
          Content
        </label>
        <div className="text-shadow-wrap mr-2">{content.length} / 350</div>
      </div>
      <textarea
        className="block-shadow mt-1 h-24 w-full resize-none rounded-lg bg-white py-1 pr-1 pl-2 disabled:bg-gray-200"
        id="content"
        name="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        minLength={1}
        maxLength={350}
        required
      />
      <div className="block-shadow mt-2 h-16 w-full resize-none rounded-lg bg-pink-50 py-1 pr-1 pl-2 break-words">
        {textCensor.applyTo(content, profanityMatcher.getAllMatches(content))}
      </div>
    </div>
  );
};

const MEDIA_INPUT_MODE = Object.freeze({
  UPLOAD: 'UPLOAD',
  URL: 'URL',
  GIPHY: 'GIPHY',
});

const NewPostFormMediaSection = ({
  mediaInputMode,
  setMediaInputMode,
  media,
  setMedia,
  acceptedMimeTypes,
  acceptedExtensions,
  urlError,
  isLoading,
}) => {
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState('');

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

  const selectedMediaModeStyling = 'border-pink-400 bg-pink-100 font-bold';
  return (
    <div className="pink-dotted-block flex flex-col gap-2 px-3 pt-2 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex">
          <button
            className={`rounded-tl-lg rounded-bl-lg border-1 border-pink-200 bg-pink-50 px-2 py-1 ${mediaInputMode == MEDIA_INPUT_MODE.GIPHY && selectedMediaModeStyling}`}
            type="button"
            onClick={() => {
              setMedia(null);
              setMediaInputMode(MEDIA_INPUT_MODE.GIPHY);
            }}
          >
            Gif
          </button>
          <button
            className={`border-1 border-pink-200 bg-pink-50 px-2 py-1 ${mediaInputMode == MEDIA_INPUT_MODE.UPLOAD && selectedMediaModeStyling}`}
            type="button"
            onClick={() => {
              setMedia(null);
              setMediaInputMode(MEDIA_INPUT_MODE.UPLOAD);
            }}
          >
            Upload
          </button>
          <button
            className={`rounded-tr-lg rounded-br-lg border-1 border-pink-200 bg-pink-50 px-2 py-1 ${mediaInputMode == MEDIA_INPUT_MODE.URL && selectedMediaModeStyling}`}
            type="button"
            onClick={() => {
              setMedia('');
              setMediaInputMode(MEDIA_INPUT_MODE.URL);
            }}
          >
            URL
          </button>
        </div>
        {mediaInputMode == MEDIA_INPUT_MODE.UPLOAD && (
          <div
            className={`text-shadow-wrap text-sm ${uploadError && 'text-red-400'}`}
          >
            (max 250Kb)
          </div>
        )}
      </div>
      {(mediaInputMode == MEDIA_INPUT_MODE.UPLOAD ||
        mediaInputMode == MEDIA_INPUT_MODE.URL) && (
        <div
          className={`text-shadow-wrap text-center text-xs ${urlError && 'text-red-400'}`}
        >
          Accepted formats: {acceptedExtensions.join(', ')}
        </div>
      )}
      {/* UPLOAD MODE */}
      {mediaInputMode == MEDIA_INPUT_MODE.UPLOAD && (
        <div className="flex items-center">
          <button
            className="blue-button w-fit flex-none px-3 py-1"
            type="button"
            onClick={handleClickUpload}
            disabled={isLoading}
          >
            Upload Media
          </button>
          {media && (
            <>
              <div className="ml-3 max-h-9 flex-1 overflow-hidden text-xs overflow-ellipsis">
                {media.name}
              </div>
              <button onClick={() => setMedia(null)}>
                <img src={trash} alt="Delete media button" />
              </button>
            </>
          )}
          <input
            className="hidden"
            type="file"
            ref={fileInputRef}
            accept={acceptedMimeTypes}
            onChange={handleUploadMedia}
          />
        </div>
      )}
      {/* URL MODE */}
      {mediaInputMode == MEDIA_INPUT_MODE.URL && (
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
  );
};

const HomeNewPostModal = ({ closeFunction, onSubmit }) => {
  const { createPost, isLoading } = useCreatePost();
  // Text section
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Media section
  const [mediaInputMode, setMediaInputMode] = useState(MEDIA_INPUT_MODE.UPLOAD);
  const [media, setMedia] = useState(null);
  const [urlError, setUrlError] = useState(false);
  const MIMETYPES = 'image/jpg, image/jpeg, image/png, image/gif, image/webp';
  const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  const isMediaUrlValid = (value) => {
    if (typeof value == 'string' || value instanceof String) {
      return EXTENSIONS.reduce((hasAllowedExtension, extension) => {
        return hasAllowedExtension || value.endsWith(extension);
      }, false);
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // URL mode && user entered URL -> validate URL
    if (
      mediaInputMode == MEDIA_INPUT_MODE.URL &&
      media &&
      !isMediaUrlValid(media)
    ) {
      return setUrlError(true);
    }
    // create post
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
        <NewPostFormTextSection
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
        <NewPostFormMediaSection
          mediaInputMode={mediaInputMode}
          setMediaInputMode={setMediaInputMode}
          media={media}
          setMedia={setMedia}
          acceptedMimeTypes={MIMETYPES}
          acceptedExtensions={EXTENSIONS}
          urlError={urlError}
          isLoading={isLoading}
        />
        <footer className="flex gap-2">
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
