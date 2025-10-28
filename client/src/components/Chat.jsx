import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { CurrentContext } from '../contexts/CurrentProvider.jsx';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { Avatar } from './Avatar.jsx';
import { ChatMessages } from './ChatMessages.jsx';
import { ChatMessageInput } from './ChatMessageInput.jsx';
import { ChatRenameModal } from './ChatRenameModal.jsx';
import { ChatDeleteModal } from './ChatDeleteModal.jsx';
import { ChatHeaderMenu } from './ChatHeaderMenu.jsx';
import arrowBack from '../assets/svgs/arrow-back.svg';
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
    <div className="main-container relative mx-4 mt-3 mb-2 flex w-full flex-1 flex-col gap-1.5 px-3 pt-3.5 pb-2.5 lg:ml-0">
      <header className="flex gap-1.5">
        <div className="pink-block pt-2 pl-3 md:hidden">
          <Link className="flex h-full items-center" to="/chats">
            <img className="w-[20px]" src={arrowBack} />
          </Link>
        </div>
        <div className="yellow-block grid flex-1 grid-cols-[60px_1fr] grid-rows-5 gap-x-2 rounded-lg px-2 py-2">
          <Avatar
            className="row-span-5 size-[60px] self-center border-3 border-dashed border-pink-300 p-0.5 md:size-[70px]"
            avatar={chat && chat.avatar}
          />
          <h2 className="row-span-3 self-end truncate font-medium lg:text-lg">
            {chat && chat.name}
          </h2>
          {chat && chat.name && (
            <p className="row-span-2 truncate text-sm">{chatterNames}</p>
          )}
        </div>
        {!isPublicChat && (
          <div className="pink-block flex items-center px-1 pt-3 md:px-2 md:pt-2">
            <ChatHeaderMenu
              users={chat && chat.users}
              openRenameModal={openRenameModal}
              openDeleteModal={openDeleteModal}
            />
          </div>
        )}
      </header>
      <div className="duckegg-block h-4 shrink-0" />
      <main
        ref={scrollContainerRef}
        className="scrollbar-thin pink-block flex-1 overflow-y-scroll px-3 pt-2 pb-1"
      >
        <ChatMessages
          messages={messages}
          isPrivateChat={chat && chat.type == 'PRIVATE'}
          isLoading={isLoading}
        />
      </main>
      <div className="duckegg-block h-4 shrink-0"></div>
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
