import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useUsers } from '../hooks/useUsers.js';
import { useCreateChat } from '../hooks/useCreateChat.js';
import { CreateChatListItem } from './CreateChatListItem.jsx';
import { CreateChatLoading } from './CreateChatLoading.jsx';
import { LabelledInput } from './LabelledInput.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';

const CreateChatForm = ({ closeForm }) => {
  const navigate = useNavigate();
  const { refetchChats } = useContext(ChatsContext);
  const { users, isLoading } = useUsers();
  const { createChat, isLoading: isCreatingChat } = useCreateChat();
  const [filter, setFilter] = useState('');
  const [userError, setUserError] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState('');

  // search filter
  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

  const handleCreateChat = async (event) => {
    event.preventDefault();
    if (!selectedUsers || selectedUsers == '') {
      return setUserError(' — Please select a chat partner');
    }
    // currently only support selecting one user, so put selected user in an array
    const data = await createChat(name, selectedUsers);
    // reset form
    setSelectedUsers('');
    setName('');
    closeForm();
    refetchChats();
    if (data && data.id) navigate(`/chats/${data.id}`);
  };

  const handleChatListItemClick = (userId) => {
    if (selectedUsers.length >= 4 && !selectedUsers.includes(userId))
      return setUserError(' — Maximum 5 users allowed');
    // if not in list, add user else remove user
    !selectedUsers.includes(userId)
      ? setSelectedUsers((prev) => [...prev, userId])
      : setSelectedUsers((prev) => [...prev.filter((id) => id != userId)]);
  };

  return (
    <form className="flex flex-col" onSubmit={handleCreateChat}>
      <h2 className="mb-1 self-center text-lg font-bold">New Conversation</h2>
      <hr className="mb-4" />
      <label className="font-medium text-gray-500">
        Users
        <span className="text-red-400">{userError}</span>
      </label>
      <ul className="scrollbar-thin h-40 overflow-y-scroll">
        {isLoading && <CreateChatLoading />}
        {!isLoading &&
          filteredUsers.map((user) => (
            <Fragment key={user.id}>
              <CreateChatListItem
                userId={user.id}
                avatar={user.avatar}
                username={user.username}
                onClick={() => handleChatListItemClick(user.id)}
                selected={selectedUsers.includes(user.id)}
              />
            </Fragment>
          ))}
      </ul>
      <input
        className="mt-3 h-11 w-full rounded-lg bg-gray-200 pl-3"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Search"
      />
      <LabelledInput
        id="Conversation name (optional)"
        value={name}
        onChange={(event) => setName(event.target.value)}
        maxLength={32}
        isRequired={false}
      />
      <footer className="mt-3">
        <button
          className="w-full rounded-md bg-blue-400 px-5 py-1.5 text-white hover:bg-blue-500 disabled:bg-gray-500 disabled:text-gray-100"
          disabled={isCreatingChat}
        >
          Chat
        </button>
      </footer>
    </form>
  );
};

export { CreateChatForm };
