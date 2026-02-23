import { useState } from 'react';
import { UsersDisplay } from '@/features/users/components/UsersDisplay.jsx';
import { UserProfile } from '@/features/users/components/UserProfile/';

import arrowBack from '@/assets/svgs/arrow-back.svg';

const Users = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const openViewProfile = (userId) => setProfileUserId(userId);
  const closeViewProfile = () => setProfileUserId(null);

  return profileUserId ? (
    <>
      <div className="pink-block mb-2 pt-1.5 pb-0.5 hover:border-pink-200 hover:bg-pink-200 hover:bg-none hover:inset-shadow-none">
        <button
          className="font-chiikawa flex self-start px-5 py-0.5"
          onClick={closeViewProfile}
        >
          <img className="w-[20px]" src={arrowBack} />
          Return to Users
        </button>
      </div>
      <UserProfile userId={profileUserId} />
    </>
  ) : (
    <UsersDisplay openViewProfile={openViewProfile} />
  );
};

export { Users };
