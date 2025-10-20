import { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { useUsers } from '../hooks/useUsers.js';
import { useCreateChat } from '../hooks/useCreateChat.js';
import { ModalDialog } from './ModalDialog.jsx';
import { ChatsCreateListItem } from './ChatsCreateListItem.jsx';
import { ChatsContext } from '../contexts/ChatsProvider.jsx';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { profanityMatcher } from '../services/textCensor.js';

const ChatsNewConversationModal = ({ closeFunction }) => {
  const navigate = useNavigate();
  const { id } = useContext(CurrentContext);
  const { refetchChats } = useContext(ChatsContext);
  const { users, isLoading } = useUsers();
  const { createChat, isLoading: isCreatingChat } = useCreateChat();
  const [filter, setFilter] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState('');
  const [userError, setUserError] = useState(false);
  const [profanityError, setProfanityError] = useState(false);

  // search filter + filter out current user
  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.username.toLowerCase().includes(filter.trim().toLowerCase()) &&
          user.id != id
      )
    : [];

  const handleCreateChat = async (event) => {
    event.preventDefault();
    // form error handling
    let invalidForm = false;
    if (!selectedUsers || selectedUsers == '') {
      setUserError(true);
      invalidForm = true;
    } else {
      setUserError(false);
    }
    if (profanityMatcher.hasMatch(name)) {
      setProfanityError(true);
      invalidForm = true;
    } else {
      setProfanityError(false);
    }
    if (invalidForm) return;
    // no errors -> create chat
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
      return setUserError(true);
    // if not in list, add user else remove user
    !selectedUsers.includes(userId)
      ? setSelectedUsers((prev) => [...prev, userId])
      : setSelectedUsers((prev) => [...prev.filter((id) => id != userId)]);
  };

  return (
    <ModalDialog closeFunction={closeFunction} title="New Conversation">
      <form className="mt-2 flex flex-col gap-2" onSubmit={handleCreateChat}>
        <div className="pink-dotted-block flex flex-col gap-2 px-3 pt-2 pb-2.5">
          <label className="text-shadow-wrap ml-1 flex items-center gap-1 font-medium">
            Users{' '}
            <span className={`${userError && 'text-red-400'}`}>
              {!userError
                ? ' — (max 5 users per chat)'
                : ' — select at least 1 user (max 5)'}
            </span>
          </label>
          <ul className="pink-gradient scrollbar-thin h-50 overflow-y-scroll rounded-lg border-2 border-pink-200 md:h-70">
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
                    <hr className="border-1 border-pink-200" />
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
            className="block-shadow h-10 rounded-lg bg-white pl-3"
            type="text"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="pink-dotted-block flex flex-col gap-2 px-3 pt-2 pb-2.5">
          <div className="flex gap-2">
            <label
              className="text-shadow-wrap ml-1 font-medium"
              htmlFor="chatName"
            >
              Chat name (optional)
            </label>
            {profanityError && (
              <div className="text-shadow-wrap text-red-400">
                (no profanity)
              </div>
            )}
          </div>
          <input
            className="block-shadow h-10 w-full rounded-xl bg-white pl-3"
            type="text"
            name="chatName"
            id="Chat name (optional)"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={32}
            required={false}
            placeholder="My amazing chat"
          />
        </div>
        <footer className="flex gap-2">
          <button
            type="button"
            className="pink-button flex-1 px-6 py-1 text-lg font-bold"
            onClick={closeFunction}
          >
            Cancel
          </button>
          <button
            className="blue-button flex-1 px-6 py-1.5 text-lg font-bold"
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
