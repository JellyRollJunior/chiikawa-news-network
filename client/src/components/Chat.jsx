import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Avatar } from './Avatar.jsx';
import { HeaderMenu } from './HeaderMenu.jsx';
import { HeaderMenuItem } from './HeaderMenuItem.jsx';
import { ChatMessages } from './ChatMessages.jsx';
import { ChatMessageInput } from './ChatMessageInput.jsx';
import { ChatProfileModal } from './ChatProfileModal.jsx';
import { ChatRenameModal } from './ChatRenameModal.jsx';
import { ChatDeleteModal } from './ChatDeleteModal.jsx';

const getUsersString = (userId, users) => {
  if (!users) return null;
  const chatters =
    users.length == 1 ? [users[0]] : users.filter((user) => user.id != userId);
  return chatters.map((user) => user.username).join(', ');
};

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { id } = useContext(CurrentContext);
  const {
    chat,
    messages,
    isLoading,
    errorStatus,
    sendMessage,
    updateChatName,
  } = useChat(chatId);
  if (errorStatus == 400 || errorStatus == 404 || errorStatus == 403) navigate('/');
  const isPublicChat = chat && chat.type == 'PUBLIC';
  const chatterNames = chat && getUsersString(id, chat.users);
  const isTwoPersonChat = chat && chat.users.length == 2;

  // join room on mount
  useJoinRoom(chatId);

  // scroll to bottom of messages on message change
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  // profile modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  // rename chat modal
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const openRenameModal = () => setIsRenameModalOpen(true);
  const closeRenameModal = () => setIsRenameModalOpen(false);
  const onSubmitRenameChat = (name) => updateChatName(name);

  // delete chat modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="flex h-full flex-col">
      <header className="border-b-1 flex gap-2 border-gray-500 px-4 py-4">
        <Avatar avatar={chat && chat.avatar} size={3} />
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-medium">
            {chat && chat.name ? chat.name : chatterNames}
          </h2>
          <p className="text-align -mt-1 items-start justify-self-start text-sm">
            {chatterNames}
          </p>
        </div>
        {!isPublicChat && (
          <HeaderMenu>
            {isTwoPersonChat && (
              <HeaderMenuItem label="View profile" onClick={openProfileModal} />
            )}
            <HeaderMenuItem
              label="Rename conversation"
              onClick={openRenameModal}
            />
            <HeaderMenuItem
              label="Delete converstation"
              onClick={openDeleteModal}
            />
          </HeaderMenu>
        )}
      </header>
      <main
        ref={scrollContainerRef}
        className="scrollbar-thin flex-1 overflow-y-scroll pl-3 pr-4 pt-3"
      >
        <ChatMessages
          messages={messages}
          isPrivateChat={chat && chat.type == 'PRIVATE'}
          isLoading={isLoading}
        />
      </main>
      <ChatMessageInput sendMessage={sendMessage} isDisabled={isLoading} />
      {isProfileModalOpen && (
        <ChatProfileModal
          closeFunction={closeProfileModal}
          userId={
            isTwoPersonChat && chat.users.find((user) => user.id != id).id
          }
        />
      )}
      {isRenameModalOpen && (
        <ChatRenameModal
          closeFunction={closeRenameModal}
          chatName={chat && chat.name ? chat.name : ''}
          onSubmit={onSubmitRenameChat}
        />
      )}
      {isDeleteModalOpen && (
        <ChatDeleteModal closeFunction={closeDeleteModal} chatId={chatId} />
      )}
    </div>
  );
};

export { Chat };
