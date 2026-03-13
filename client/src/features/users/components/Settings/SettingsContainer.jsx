import { useContext } from 'react';
import { ToastContext } from '@/shared/providers/ToastProvider.jsx';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useUploadAvatar } from '@/features/users/hooks/useUploadAvatar.js';
import { useEditBio } from '@/features/users/hooks/useEditBio.js';
import { useLogout } from '@/features/auth/hooks/useLogout.js';
import { SettingsView } from '@/features/users/components/settings/SettingsView.jsx';

const SettingsContainer = () => {
  const { toastTemp } = useContext(ToastContext);
  const {
    avatar,
    bio,
    setBio,
    isLoading: isLoadingUser,
  } = useContext(CurrentContext);
  const { uploadAvatar, isLoading: isUploadingAvatar } = useUploadAvatar();
  const { editBio, isLoading: isEditingBio } = useEditBio();
  const { logout } = useLogout();

  const handleEditBio = async (bio) => {
    const data = await editBio(bio);
    if (data && data.bio) {
      setBio(bio);
      toastTemp('Bio edited successfully');
    }
  };

  const handleUploadAvatar = (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    uploadAvatar(formData);
  };

  return (
    <SettingsView
      logout={logout}

      /* Edit Avatar Section */
      avatar={avatar}
      isLoadingUser={isLoadingUser}
      uploadAvatar={handleUploadAvatar}
      isUploadingAvatar={isUploadingAvatar}

      /* Edit Bio Section */
      bio={bio}
      editBio={handleEditBio}
      isEditingBio={isEditingBio}
    />
  );
};

export { SettingsContainer };
