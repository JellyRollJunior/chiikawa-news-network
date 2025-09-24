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
    <div className="flex gap-2">
      <div className="duckegg-block relative px-4 py-5">
        <Avatar
          className="size-[100px] border-4 border-dashed border-white p-0.5 md:size-[120px]"
          avatar={avatar ? avatar : null}
        />
        <img
          className="drop-shadow-pink-outline absolute -top-[5px] -right-[10px] w-[52px]"
          src={chiiPeace}
        />
        <img
          className="drop-shadow-pink-outline absolute -bottom-[5px] -left-[12px] w-[52px]"
          src={hachiCamera}
        />
      </div>
      <div className="pink-block flex flex-1 flex-col items-center justify-center gap-1 pt-4 text-center">
        <h3 className="text-shadow-wrap text-lg font-bold">Edit Picture</h3>
        <p className="text-xs md:text-sm">
          (Max 250Kb)
          <span className="font-bold text-red-400">
            <br className="md:hidden" />
            {mediaError && (
              <>
                {' '}
                <span className="hidden md:inline-block">—</span> {mediaError}
              </>
            )}
          </span>
        </p>
        <button
          className="blue-button mt-1 px-5 py-0.5"
          onClick={handleClickChangePhoto}
          disabled={isUploadingAvatar}
        >
          Upload
        </button>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleUploadAvatar}
          accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
        />
      </div>
    </div>
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
