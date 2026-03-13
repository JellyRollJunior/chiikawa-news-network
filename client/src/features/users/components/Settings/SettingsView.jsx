import SimpleBar from 'simplebar-react';
import { EditAvatarSection } from '@/features/users/components/Settings/EditAvatarSection.jsx';
import { EditBioSection } from '@/features/users/components/Settings/EditBioSection.jsx';
import { LogoTitle } from '@/shared/components/LogoTitle.jsx';

import trioScouting from '@/assets/images/trio-scouting.png';

const SettingsView = ({
  /* Edit Avatar Section */
  avatar,
  isLoadingUser,
  uploadAvatar,
  isUploadingAvatar,

  /* Edit Bio Section */
  bio,
  editBio,
  isEditingBio,

  logout,
}) => {
  return (
    <SimpleBar className="h-full">
      <div className="relative px-3 pt-3 pb-2.5 md:pt-3.5">
        <header className="yellow-block flex justify-center pt-1 pb-0.5">
          <LogoTitle className="text-lg md:text-2xl" text="Edit Settings" />
        </header>
        <section className="mt-2">
          <EditAvatarSection
            avatar={avatar}
            isLoadingUser={isLoadingUser}
            uploadAvatar={uploadAvatar}
            isUploadingAvatar={isUploadingAvatar}
          />
        </section>
        <section className="mt-2">
          <EditBioSection
            bio={bio}
            isLoadingUser={isLoadingUser}
            editBio={editBio}
            isEditingBio={isEditingBio}
          />
        </section>
        <div className="yellow-block mt-2 ml-auto w-fit px-3 py-3.5">
          <button className="pink-button px-7 py-1" onClick={logout}>
            Logout
          </button>
        </div>
        <img
          className="drop-shadow-pink-outline absolute bottom-[6px] left-0 w-[100px]"
          src={trioScouting}
        />
      </div>
    </SimpleBar>
  );
};

export { SettingsView };
