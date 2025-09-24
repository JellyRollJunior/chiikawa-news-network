import { useContext, useRef, useState } from 'react';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useUploadAvatar } from '../hooks/useUploadAvatar.js';
import { LoadingElement } from './LoadingElement.jsx';
import chiiPeace from '../assets/images/chii-peace.png';
import hachiCamera from '../assets/images/hachi-camera-back.png';
import { Avatar } from './Avatar.jsx';

const SettingsEditAvatar = () => {
  const fileInputRef = useRef(null);
  const { avatar, isLoading } = useContext(CurrentContext);
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const [mediaError, setMediaError] = useState('');

  const handleClickChangePhoto = () => {
    if (fileInputRef) {
      fileInputRef.current.click();
    }
  };

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
    <section className="yellow-block flex flex-col items-center pt-5 pb-3 md:grid md:grid-cols-2 md:justify-center md:py-5">
      <div className="relative w-fit px-[16px] md:ml-12 md:justify-self-center">
        <Avatar
          className="size-[96px] md:size-[120px]"
          avatar={avatar ? avatar : null}
        />
        <img
          className="drop-shadow-pink-outline absolute -top-[10px] -right-[24px] w-[52px]"
          src={chiiPeace}
        />
        <img
          className="drop-shadow-pink-outline absolute -bottom-[6px] -left-[24px] w-[52px]"
          src={hachiCamera}
        />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="mt-2 font-medium md:text-lg">Profile Picture</h3>
        <p className="text-xs md:text-sm">
          (Max 250Kb)
          <span className="text-red-400">
            {mediaError && ` — ${mediaError}`}
          </span>
        </p>
        <button
          className="blue-button mt-1 px-3 py-1 md:mt-2"
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
      </div>
    </section>
  ) : (
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
  );
};

export { SettingsEditAvatar };
