import { Fragment } from 'react';
import { UsersListItem } from './UsersListItem.jsx';

const UsersList = ({ users, openViewProfile, isLoading = false }) => {
  return (
    <ul className="flex flex-col gap-2">
      {!isLoading
        ? users.map((user) => (
            <Fragment key={user.id}>
              <UsersListItem user={user} openViewProfile={openViewProfile} />
            </Fragment>
          ))
        : [...Array(5)].map((item, index) => (
            <Fragment key={index}>
              <UsersListItem isLoading={true}/>
            </Fragment>
          ))}
    </ul>
  );
};

export { UsersList };
