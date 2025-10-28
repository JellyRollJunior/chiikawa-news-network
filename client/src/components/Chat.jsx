import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useChat } from '../hooks/useChat.js';
import { useJoinRoom } from '../hooks/useJoinRoom.js';
import { ChatMessages } from './ChatMessages.jsx';
import { ChatMessageInput } from './ChatMessageInput.jsx';
import { ChatRenameModal } from './ChatRenameModal.jsx';
import { ChatDeleteModal } from './ChatDeleteModal.jsx';
import { ChatHeader } from './ChatHeader.jsx';
import shisaBento from '../assets/images/shisa-bento.png';

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
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
      <ChatHeader
        chat={chat}
        isPublicChat={isPublicChat}
        openRenameModal={openRenameModal}
        openDeleteModal={openDeleteModal}
      />
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
      <img className="drop-shadow-pink-outline absolute -top-[20px] -right-[20px] w-[74px]" src={shisaBento} />
    </div>
  );
};

export { Chat };
