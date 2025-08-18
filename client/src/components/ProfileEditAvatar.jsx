import { useRef } from 'react';
import editIcon from '../assets/svgs/edit.svg';
import { useUploadAvatar } from '../hooks/useUploadAvatar.js';

const ProfileEditAvatar = ({ isOpen }) => {
  const { uploadAvatar, isLoading } = useUploadAvatar();
  const fileInputRef = useRef(null);

  const handleClickChangeAvatar = () => {
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

  return (
    <>
      <button
        style={{ display: isOpen ? 'flex' : 'none' }}
        className="absolute left-0 right-0 top-1/2 mx-auto flex h-full w-full translate-y-[-50%] flex-col items-center justify-center rounded-full bg-gray-300/70"
        onClick={handleClickChangeAvatar}
      >
        {isLoading ? (
          <div>uploading...</div>
        ) : (
          <>
            <img
              className="mt-2 w-7 rounded-xl px-1 py-1"
              src={editIcon}
              alt="edit"
            />
            Change profile
            <br /> picture
          </>
        )}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUploadAvatar}
        accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
      />
    </>
  );
};

export { ProfileEditAvatar };
