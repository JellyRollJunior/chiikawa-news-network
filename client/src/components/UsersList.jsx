import { Fragment } from 'react';
import { UsersListItem } from './UsersListItem.jsx';
import { useFollow } from '../hooks/useFollow.js';

const UsersList = ({ users, openViewProfile, refetchUsers, isLoading = false }) => {
  const { followUser, isLoading: isLoadingFollow } = useFollow();

  return (
    <ul className="flex flex-col gap-2">
      {!isLoading
        ? users.map((user) => (
            <Fragment key={user.id}>
              <UsersListItem
                user={user}
                openViewProfile={openViewProfile}
                followUser={followUser}
                isLoadingFollow={isLoadingFollow}
                refetchUsers={refetchUsers}
              />
            </Fragment>
          ))
        : [...Array(5)].map((item, index) => (
            <Fragment key={index}>
              <UsersListItem isLoading={true} />
            </Fragment>
          ))}
    </ul>
  );
};

export { UsersList };
