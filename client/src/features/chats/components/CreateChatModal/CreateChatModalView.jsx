import { Fragment, useState } from 'react';
import { ChatsNewConversationModalListItem } from '@/features/chats/components/ChatsNewConversationModalListItem.jsx';
import { Modal } from '@/shared/components/Modal.jsx';
import { profanityMatcher } from '@/shared/services/textCensor.js';

const CreateChatModalView = ({
  open,
  closeModal,
  users,
  isLoadingUsers,
  createChat,
  isCreatingChat,
  onSubmit,
  navigate,
}) => {
  const [filter, setFilter] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState('');
  const [userError, setUserError] = useState(false);
  const [profanityError, setProfanityError] = useState(false);

  // search filter
  const filteredUsers = users
    ? users.filter((user) =>
        user.username.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

  const handleCreateChat = async (event) => {
    event.preventDefault();

    let isFormInvalid = false;
    // ensure >= 1 users are selected
    if (!selectedUsers || selectedUsers == '') {
      setUserError(true);
      isFormInvalid = true;
    } else {
      setUserError(false);
    }
    // filter profanity
    if (profanityMatcher.hasMatch(name)) {
      setProfanityError(true);
      isFormInvalid = true;
    } else {
      setProfanityError(false);
    }
    if (isFormInvalid) return;

    const data = await createChat(name, selectedUsers);

    // reset form
    setSelectedUsers('');
    setName('');
    closeModal();
    onSubmit();
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
    <Modal open={open} closeModal={closeModal} title="New Conversation">
      <form className="mt-2 flex flex-col gap-2" onSubmit={handleCreateChat}>
        <div className="pink-dotted-block flex flex-col gap-2 px-3 pt-2 pb-2.5">
          <label className="text-shadow-wrap ml-1 flex items-center gap-1 font-medium">
            Users{' '}
            <span className={`${userError && 'text-red-400'}`}>
              {!userError
                ? ' — (max 5 users per chat)'
                : ' — select between 1 and 5 user(s)'}
            </span>
          </label>
          <ul className="pink-gradient scrollbar-thin h-50 overflow-y-scroll rounded-lg border-2 border-pink-200 md:h-70">
            {!isLoadingUsers
              ? filteredUsers.map((user) => (
                  <Fragment key={user.id}>
                    <ChatsNewConversationModalListItem
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
                    <ChatsNewConversationModalListItem isLoading={true} />
                    <ChatsNewConversationModalListItem
                      isLoading={true}
                      loadingDelay={0.8}
                    />
                  </Fragment>
                ))}
          </ul>
          <input
            className="block-shadow h-10 rounded-lg bg-white pr-2 pl-3"
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
            className="block-shadow h-10 w-full rounded-xl bg-white pr-2 pl-3"
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
            onClick={closeModal}
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
    </Modal>
  );
};

export { CreateChatModalView };
