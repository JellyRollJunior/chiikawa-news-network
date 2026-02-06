import { Fragment } from 'react';
import { UsersListItem } from '@/features/users/components/UsersListItem.jsx';
import { useFollow } from '@/features/users/hooks/useFollow.js';
import { BLOCKS } from '@/styles/blocks.js';

const UsersList = ({
  users,
  openViewProfile,
  refetchUsers,
  isLoading = false,
}) => {
  const { followUser, unfollowUser, isLoading: isLoadingFollow } = useFollow();

  return (
    <ul className="flex flex-col gap-2">
      {!isLoading
        ? users.map((user, index) => (
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
          ))
        : [...Array(5)].map((item, index) => (
            <Fragment key={index}>
              <UsersListItem
                isLoading={true}
                blockStyle={BLOCKS[index % BLOCKS.length]}
              />
            </Fragment>
          ))}
    </ul>
  );
};

export { UsersList };
