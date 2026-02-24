import { useContext } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useUsers } from '@/features/users/hooks/useUsers.js';
import { UsersView } from '@/features/users/components/Users/UsersView.jsx';

const UsersContainer = () => {
  const { id } = useContext(CurrentContext);
  const { users, isLoading, refetch } = useUsers();
  const usersWithoutSelf = users ? users.filter((user) => user.id != id) : [];

  return (
    <UsersView
      users={usersWithoutSelf}
      isLoadingUsers={isLoading}
      refetchUsers={refetch}
    />
  );
};

export { UsersContainer };
