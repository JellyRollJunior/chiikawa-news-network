import { useUser } from '../hooks/useUser.js';
import { ModalDialog } from './ModalDialog.jsx';
import { Profile } from './Profile.jsx';

const ChatProfileModal = ({ closeFunction, userId }) => {
  const { user, isLoading } = useUser(userId);

  return (
    <ModalDialog closeFunction={closeFunction}>
      {user && (
        <Profile
          userId={user.id}
          username={user.username}
          bio={user.bio}
          avatar={user.avatar}
          isLoading={isLoading}
        />
      )}
    </ModalDialog>
  );
};

export { ChatProfileModal };
