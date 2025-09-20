import { useState } from 'react';
import { UsersDisplay } from './UsersDisplay.jsx';
import { UserProfile } from './UserProfile.jsx';
import arrowBack from '../assets/svgs/arrow-back.svg';

const Users = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const openViewProfile = (userId) => setProfileUserId(userId);
  const closeViewProfile = () => setProfileUserId(null);

  return profileUserId ? (
    <div className="flex w-full max-w-xl">
      <UserProfile userId={profileUserId}>
        <button
          className="font-chiikawa mt-3 ml-1 flex self-start px-5 py-0.5"
          onClick={closeViewProfile}
        >
          <img className="w-[20px]" src={arrowBack} />
          Return to Users
        </button>
      </UserProfile>
    </div>
  ) : (
    <div className="main-container mx-4 mt-3 mb-2 flex w-full max-w-sm flex-1 flex-col">
      <UsersDisplay openViewProfile={openViewProfile} />
    </div>
  );
};

export { Users };
