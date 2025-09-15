import { useContext, useEffect, useRef, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUploadAvatar } from '../hooks/useUploadAvatar.js';
import { useEditBio } from '../hooks/useEditBio.js';
import { Avatar } from './Avatar.jsx';
import { LoadingElement } from './LoadingElement.jsx';
import chiiPeace from '../assets/images/chii-peace.png';
import hachiCamera from '../assets/images/hachi-camera-back.png';

const SettingsUserInfo = () => {
  const { bio, setBio, avatar, isLoading } = useContext(CurrentContext);
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const { editBio, isLoading: isEditingBio } = useEditBio();
  const [bioTextarea, setBioTextarea] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setBioTextarea(bio ? bio : '');
  }, [bio]);

  const handleEditBio = async (event) => {
    event.preventDefault();
    const data = await editBio(bioTextarea);
    if (data && data.bio) {
      setBio(data.bio);
    }
  };

  const handleClickChangePhoto = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

  const [mediaError, setMediaError] = useState('');
  const handleUploadAvatar = (event) => {
    const file = event.target.files[0];
    const FILE_SIZE_LIMIT = 1024 * 250; // 250kb
    if (file && file.size <= FILE_SIZE_LIMIT) {
      const formData = new FormData();
      formData.append('avatar', file);
      uploadAvatar(formData);
    } else {
      setMediaError('File too large');
    }
  };

  return !isLoading ? (
    <>
      <section className="yellow-block mt-2 flex flex-col items-center py-2">
        <div className="relative flex items-center px-[16px]">
          <Avatar className='size-[96px] md:size-[120px]' avatar={avatar ? avatar : null}  />
          <img
            className="drop-shadow-pink-outline absolute -top-[10px] -right-[24px] w-[52px]"
            src={chiiPeace}
          />
          <img
            className="drop-shadow-pink-outline absolute -bottom-[6px] -left-[24px] w-[52px]"
            src={hachiCamera}
          />
        </div>
        <h3 className="mt-2 font-medium">Profile Picture</h3>
        <p className="text-xs">
          (Max 250Kb)
          <span className="text-red-400">
            {mediaError && ` — ${mediaError}`}
          </span>
        </p>
        <button
          className="blue-button mt-1 px-3 py-1"
          onClick={handleClickChangePhoto}
          disabled={isUploadingAvatar}
        >
          Upload Picture
        </button>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleUploadAvatar}
          accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
        />
      </section>
      <section className="yellow-block mt-2 px-3 py-2">
        <form className="flex flex-col" onSubmit={handleEditBio}>
          <h3 className="mt-2 font-medium">Bio</h3>
          <textarea
            className="mt-2 min-h-26 w-full resize-none rounded-md border-3 border-pink-200 px-1 focus:outline-2 focus:outline-green-300"
            autoFocus
            name="bio"
            id="bio"
            value={bioTextarea}
            onChange={(event) => setBioTextarea(event.target.value)}
            minLength={1}
            maxLength={350}
            required
          />
          <button
            className="blue-button mt-2 ml-auto px-3 py-1"
            disabled={isEditingBio}
          >
            Confirm Edit
          </button>
        </form>
      </section>
    </>
  ) : (
    /* Loading Display */
    <>
      <section className="yellow-block mt-3 flex flex-col items-center py-2">
        <div className="relative flex items-center px-[16px]">
          <LoadingElement className="size-24 rounded-full" />
          <img
            className="drop-shadow-pink-outline absolute -top-[10px] -right-[24px] w-[52px]"
            src={chiiPeace}
          />
          <img
            className="drop-shadow-pink-outline absolute -bottom-[6px] -left-[24px] w-[52px]"
            src={hachiCamera}
          />
        </div>
        <button className="blue-button mt-3 px-3 py-1" disabled={true}>
          Change Picture
        </button>
      </section>
      <section className="yellow-block mt-2 px-3 py-2">
        <form className="flex flex-col">
          <h3 className="mt-2 font-medium">Bio</h3>
          <LoadingElement className="mt-2 h-32 w-full rounded-sm" />
          <button
            className="blue-button mt-2 ml-auto px-3 py-1"
            disabled={true}
          >
            Confirm Edit
          </button>
        </form>
      </section>
    </>
  );
};

export { SettingsUserInfo };
