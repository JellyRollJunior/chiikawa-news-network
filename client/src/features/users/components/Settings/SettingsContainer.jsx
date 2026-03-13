import { useContext } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useUploadAvatar } from '@/features/users/hooks/useUploadAvatar.js';
import { useLogout } from '@/features/auth/hooks/useLogout.js';
import { SettingsView } from '@/features/users/components/settings/SettingsView.jsx';

const SettingsContainer = () => {
  const { avatar, isLoading: isLoadingUser } = useContext(CurrentContext);
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const { logout } = useLogout();

  return (
    <SettingsView
      /* Edit Avatar Section */
      avatar={avatar}
      isLoadingUser={isLoadingUser}
      uploadAvatar={uploadAvatar}
      isUploadingAvatar={isUploadingAvatar}

      logout={logout}
    />
  );
};

export { SettingsContainer };
