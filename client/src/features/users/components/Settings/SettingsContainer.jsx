import { useLogout } from '@/features/auth/hooks/useLogout.js';
import { SettingsView } from '@/features/users/components/settings/SettingsView.jsx';

const SettingsContainer = () => {
  const { logout } = useLogout();

  return <SettingsView logout={logout} />;
};

export { SettingsContainer };
