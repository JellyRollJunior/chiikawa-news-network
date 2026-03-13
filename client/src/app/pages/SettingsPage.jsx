import { Settings } from '@/features/users/components/Settings/';

const SettingsPage = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="main-container mx-4 mt-3 mb-2 w-full max-w-lg">
        <Settings />
      </div>
    </div>
  );
};

export { SettingsPage };
