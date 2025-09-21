import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useUsers } from '../hooks/useUsers.js';
import { useCreateChat } from '../hooks/useCreateChat.js';
import { ModalDialog } from './ModalDialog.jsx';
import { ChatsCreateListItem } from './ChatsCreateListItem.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';

const ChatsNewConversationModal = ({ closeFunction }) => {
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
    closeFunction();
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
    <ModalDialog closeFunction={closeFunction} title="New Conversation">
      <form className="flex flex-col" onSubmit={handleCreateChat}>
        <main className="flex flex-col px-2">
          <label className="text-shadow-wrap ml-1 mt-4 font-medium text-amber-800">
            Users
            <span className="text-red-400">{userError}</span>
          </label>
          <ul className="scrollbar-thin h-50 md:h-70 overflow-y-scroll">
            {!isLoading
              ? filteredUsers.map((user) => (
                  <Fragment key={user.id}>
                    <ChatsCreateListItem
                      userId={user.id}
                      avatar={user.avatar}
                      username={user.username}
                      onClick={() => handleChatListItemClick(user.id)}
                      selected={selectedUsers.includes(user.id)}
                    />
                  </Fragment>
                ))
              : /* Loading Display */
                [...Array(4)].map((item, index) => (
                  <Fragment key={index}>
                    <ChatsCreateListItem isLoading={true} />
                    <ChatsCreateListItem isLoading={true} loadingDelay={0.8} />
                  </Fragment>
                ))}
          </ul>
          <input
            className="block-shadow mb-2 mt-2 h-10 rounded-lg bg-white pl-3"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search"
          />
          <label
            className="text-shadow-wrap ml-1 font-medium text-amber-800"
            htmlFor="chatName"
          >
            Chat name (optional)
          </label>
          <input
            className="block-shadow mt-1 h-10 w-full rounded-xl bg-white pl-1.5 text-amber-800"
            type="text"
            name="chatName"
            id="Chat name (optional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            isRequired={false}
          />
        </main>
        <footer className="mt-3 flex gap-3">
          <button
            type="button"
            className="pink-button flex-1 px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            className="yellow-button flex-1 px-6 py-1.5 text-lg font-bold"
            disabled={isCreatingChat}
          >
            Chat
          </button>
        </footer>
      </form>
    </ModalDialog>
  );
};

export { ChatsNewConversationModal };
