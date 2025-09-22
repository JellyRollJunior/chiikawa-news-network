import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Avatar } from './Avatar.jsx';
import { ChatMessages } from './ChatMessages.jsx';
import { ChatMessageInput } from './ChatMessageInput.jsx';
import { ChatRenameModal } from './ChatRenameModal.jsx';
import { ChatDeleteModal } from './ChatDeleteModal.jsx';
import { ChatHeaderMenu } from './ChatHeaderMenu.jsx';
import shisaBento from '../assets/images/shisa-bento.png';

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
  if (errorStatus == 400 || errorStatus == 404 || errorStatus == 403) {
    navigate('/chats');
  }
  const isPublicChat = chat && chat.type == 'PUBLIC';
  const chatterNames = chat && getUsersString(id, chat.users);

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
    <div className="main-container relative mx-4 mt-3 mb-2 flex w-full flex-1 flex-col px-3 pt-3.5 pb-2.5 md:ml-0">
      <header className="flex gap-2">
        <div className="yellow-block flex flex-1 gap-2 rounded-lg px-2 py-2">
          <Avatar
            className="size-[60px] border-3 border-dashed border-pink-300 p-0.5 md:size-[70px]"
            avatar={chat && chat.avatar}
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium">
              {chat && chat.name ? chat.name : chatterNames}
            </h2>
            <p className="text-align -mt-1 items-start justify-self-start text-sm">
              {chatterNames}
            </p>
          </div>
        </div>
        {!isPublicChat && (
          <div className="pink-block flex h-full items-center px-1 pt-3 md:px-2 md:pt-2">
            <ChatHeaderMenu
              users={chat && chat.users}
              openRenameModal={openRenameModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
        )}
      </header>
      <div className="duckegg-block mt-1.5 h-4"></div>
      <main
        ref={scrollContainerRef}
        className="scrollbar-thin pink-block mt-1.5 flex-1 overflow-y-scroll pt-2 pr-4 pb-1 pl-3"
      >
        <ChatMessages
          messages={messages}
          isPrivateChat={chat && chat.type == 'PRIVATE'}
          isLoading={isLoading}
        />
      </main>
      <div className="duckegg-block mt-1.5 mb-1.5 h-4"></div>
      <ChatMessageInput sendMessage={sendMessage} isDisabled={isLoading} />
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
      <img
        className="drop-shadow-pink-outline absolute -top-[20px] -right-[20px] w-[74px]"
        src={shisaBento}
      />
    </div>
  );
};

export { Chat };
