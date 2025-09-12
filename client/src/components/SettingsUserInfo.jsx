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

  const handleUploadAvatar = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      uploadAvatar(formData);
    }
  };

  return !isLoading ? (
    <>
      <section className="yellow-block mt-3 flex flex-col items-center py-2">
        <div className="relative flex items-center px-[16px]">
          <Avatar avatar={avatar ? avatar : null} size={6} />
          <img className="w-[52px] drop-shadow-pink-outline absolute -top-[10px] -right-[24px]" src={chiiPeace} />
          <img className="w-[52px] drop-shadow-pink-outline absolute -bottom-[6px] -left-[24px]" src={hachiCamera} />
        </div>
        <button
          className="blue-button mt-3 px-3 py-1"
          onClick={handleClickChangePhoto}
          disabled={isUploadingAvatar}
        >
          Change Picture
        </button>
        <input
          className="hidden"
          type="file"
          ref={fileInputRef}
          onChange={handleUploadAvatar}
          accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
        />
      </section>
      <section className="yellow-block mt-3 px-3 py-2">
        <form className="flex flex-col" onSubmit={handleEditBio}>
          <h3 className="mt-2 font-medium">Bio</h3>
          <textarea
            className="border-3 mt-2 min-h-32 w-full rounded-md border-pink-200 px-1 focus:outline-2 focus:outline-green-300"
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
            className="blue-button ml-auto mt-2 px-3 py-1"
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
          <img className="w-[52px] drop-shadow-pink-outline absolute -top-[10px] -right-[24px]" src={chiiPeace} />
          <img className="w-[52px] drop-shadow-pink-outline absolute -bottom-[6px] -left-[24px]" src={hachiCamera} />
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
            className="blue-button ml-auto mt-2 px-3 py-1"
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
