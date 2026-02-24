import { useState } from 'react';
import { UsersDisplay } from '@/features/users/components/UsersDisplay.jsx';
import { UserProfile } from '@/features/users/components/UserProfile/';

import arrowBack from '@/assets/svgs/arrow-back.svg';

const Users = () => {
  const [profileUserId, setProfileUserId] = useState(null);
  const openViewProfile = (userId) => setProfileUserId(userId);
  const closeViewProfile = () => setProfileUserId(null);

  if (profileUserId) {
    return (
      <div className="grid h-full grid-rows-[65px_1fr]">
        {/* Return to Users button */}
        <div className="mx-3 mt-3 mb-2">
          <button
            className="font-chiikawa pink-block flex h-full w-full justify-start px-3 pt-2 pb-1 hover:border-pink-200 hover:bg-pink-200 hover:bg-none hover:inset-shadow-none"
            onClick={closeViewProfile}
          >
            <img className="w-[20px]" src={arrowBack} />
            Return to Users
          </button>
        </div>

        <UserProfile userId={profileUserId} />
      </div>
    );
  }

  return <UsersDisplay openViewProfile={openViewProfile} />;
};

export { Users };
