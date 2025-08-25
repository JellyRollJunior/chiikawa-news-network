import { useState } from 'react';
import { Avatar } from './Avatar.jsx';
import { ProfileEditBio } from './ProfileEditBio.jsx';
import { ProfileEditAvatar } from './ProfileEditAvatar.jsx';

const SettingsUserInfo = ({ username, bio, avatar }) => {
  return (
    <>
      <header className="yellow-block">
        <h2 className="font-chiikawa py-2 text-center text-lg">Edit Profile</h2>
      </header>
      <section className="yellow-block mt-2 flex items-center px-3 py-2">
        {/* tbh just do it like instagram does it. simple with a button to choose photo */}
        <Avatar avatar={avatar ? avatar : null} size={3} />
        <h3 className="ml-3">{username}</h3>
        <button className="blue-button ml-auto px-3 py-1">Change Photo</button>
      </section>
      <section className="yellow-block mt-2 flex flex-col px-3 py-2">
        <h3 className="mt-2 font-medium">Bio</h3>
        {/* Just display the text area with bio filled in */}
        <p className="mt-2">{bio}</p>
        <button className="blue-button ml-auto mt-2 px-3 py-1">
          Confirm Edit
        </button>
      </section>
      {/* Submit button (?) to submit bio and profile pic changes 
      or just submti button for bio is ok too */}
    </>
  );
};

export { SettingsUserInfo };
