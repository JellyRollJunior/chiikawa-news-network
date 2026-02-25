import { Fragment } from 'react';
import { UsersListItem } from '@/features/users/components/UsersListItem.jsx';
import { useFollow } from '@/features/users/hooks/useFollow.js';
import { BLOCKS } from '@/styles/blocks.js';

const UsersList = ({
  users,
  openViewProfile,
  refetchUsers,
  isLoadingUsers,
}) => {
  const { followUser, unfollowUser, isLoading: isLoadingFollow } = useFollow();

  if (isLoadingUsers) {
    return (
      <ul className="flex flex-col gap-2">
        {[...Array(5)].map((item, index) => (
          <Fragment key={index}>
            <UsersListItem
              isLoading={true}
              blockStyle={BLOCKS[index % BLOCKS.length]}
            />
          </Fragment>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {users.map((user, index) => (
        <Fragment key={user.id}>
          <UsersListItem
            user={user}
            openViewProfile={openViewProfile}
            followUser={followUser}
            unfollowUser={unfollowUser}
            isLoadingFollow={isLoadingFollow}
            refetchUsers={refetchUsers}
            blockStyle={BLOCKS[index % BLOCKS.length]}
          />
        </Fragment>
      ))}
    </ul>
  );
};

export { UsersList };
