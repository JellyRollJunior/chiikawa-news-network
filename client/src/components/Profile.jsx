import { useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { ProfileEditBio } from './ProfileEditBio.jsx';
import { ProfileEditAvatar } from './ProfileEditAvatar.jsx';
import editIcon from '../assets/svgs/edit.svg';
import editOffIcon from '../assets/svgs/edit-off.svg';

const SettingsUserInfo = ({ username, bio, avatar }) => {
  const [isEditingBio, setIsEditingBio] = useState(false);

  const closeEditMode = () => {
    setIsEditingBio(false);
  };

  return (
    <>
      <div className="yellow-block">
        <h2 className="font-chiikawa py-2 text-center text-lg">Edit Profile</h2>
      </div>
      <div className="yellow-block mt-2 flex items-center px-3 py-2">
        {/* tbh just do it like instagram does it. simple with a button to choose photo */}
        <Avatar avatar={avatar ? avatar : null} size={3} />
        <h3 className="ml-3">{username}</h3>
        <button className="blue-button ml-auto px-3 py-1">Change Photo</button>
      </div>
      <div className="yellow-block mt-2">
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
    </>
  );
};

export { SettingsUserInfo };
