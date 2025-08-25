import { useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { ProfileEditBio } from './ProfileEditBio.jsx';
import { ProfileEditAvatar } from './ProfileEditAvatar.jsx';
import editIcon from '../assets/svgs/edit.svg';
import editOffIcon from '../assets/svgs/edit-off.svg';

const SettingsUserInfo = ({
  username,
  bio,
  avatar,
  avatarSize = 8,
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const closeEditMode = () => {
    setIsEditingBio(false);
  };

  return (
    <div className="main-container mx-4 mb-2 mt-3 flex w-full max-w-md flex-col items-center">
      <div
        className="relative"
        onMouseEnter={() => setIsEditingAvatar(true)}
        onMouseLeave={() => setIsEditingAvatar(false)}
      >
        <Avatar avatar={avatar ? avatar : null} size={avatarSize} />
        {<ProfileEditAvatar isOpen={isEditingAvatar} />}
      </div>
      <h2 className="mt-1 self-center text-xl font-bold">{username}</h2>
      <div className="mt-2 flex w-full items-center self-start font-medium">
        <h3>Bio</h3>

        <button
          className="ml-auto"
          onClick={() => setIsEditingBio(!isEditingBio)}
        >
          <img
            className="w-7 rounded-xl px-1 py-1 hover:bg-gray-300"
            src={!isEditingBio ? editIcon : editOffIcon}
            alt="edit"
          />
        </button>
      </div>
      <section className="w-full px-7">
        {isEditingBio ? (
          <ProfileEditBio onSubmit={closeEditMode} />
        ) : (
          <p className="px-1.5 py-0.5">{bio}</p>
        )}
      </section>
    </div>
  );
};

export { SettingsUserInfo };
