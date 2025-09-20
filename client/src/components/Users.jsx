import { useState } from 'react';
import { UsersDisplay } from './UsersDisplay.jsx';
import { UserProfile } from './UserProfile.jsx';
import arrowBack from '../assets/svgs/arrow-back.svg';

const Users = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const openViewProfile = (userId) => setProfileUserId(userId);
  const closeViewProfile = () => setProfileUserId(null);

  return profileUserId ? (
    <>
      <nav>
        <button
          className="font-chiikawa mt-3 ml-2 flex self-start px-5 py-0.5"
          onClick={closeViewProfile}
        >
          <img className="w-[20px]" src={arrowBack} />
          Return to Users
        </button>
      </nav>
      <UserProfile userId={profileUserId} />
    </>
  ) : (
    <UsersDisplay openViewProfile={openViewProfile} />
  );
};

export { Users };
