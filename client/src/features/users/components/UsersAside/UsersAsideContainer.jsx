import { useContext } from 'react';
import { useUsers } from '@/features/users/hooks/useUsers.js';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { UsersAsideView } from '@/features/users/components/UsersAside/UsersAsideView.jsx';

const UsersAsideContainer = () => {
  const { id } = useContext(CurrentContext);
  const { users, isLoading } = useUsers();
  const usersWithoutSelf = users ? users.filter((user) => user.id != id) : [];

  return <UsersAsideView users={usersWithoutSelf} isLoadingUsers={isLoading} />;
};

export { UsersAsideContainer };
