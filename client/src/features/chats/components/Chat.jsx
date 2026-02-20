import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useChat } from '@/features/chats/hooks/useChat.js';
import { useJoinRoom } from '@/features/chats/hooks/useJoinRoom.js';
import { ChatMessages } from '@/features/chats/components/ChatMessages.jsx';
import { ChatMessageInput } from '@/features/chats/components/ChatMessageInput.jsx';
import { RenameChatModal } from '@/features/chats/components/ChatRenameModal.jsx';
import { DeleteChatModal } from '@/features/chats/components/DeleteChatModal.jsx';
import { ChatHeader } from '@/features/chats/components/ChatHeader.jsx';
import { ChatInfoModal } from '@/features/chats/components/ChatInfoModal.jsx';

import shisaBento from '@/assets/images/shisa-bento.png';
import { ChatsContext } from '../providers/ChatsProvider.jsx';

const Chat = () => {
  const navigate = useNavigate();
  const { refetchChats } = useContext(ChatsContext);
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

  // chat info modal
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  // rename chat modal
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const openRenameModal = () => setIsRenameModalOpen(true);
  const closeRenameModal = () => setIsRenameModalOpen(false);
  const onSubmitRenameChat = (name) => {
    updateChatName(name);
    refetchChats();
    closeRenameModal();
  };

  // delete chat modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const onSubmitDeleteChat = () => {
    closeDeleteModal();
    navigate('/chats');
  };

  return (
    <div className="main-container relative mx-4 mt-3 mb-2 flex w-full flex-1 flex-col gap-1.5 px-3 pt-3.5 pb-2.5 lg:ml-0">
      <ChatHeader
        chat={chat}
        isPublicChat={isPublicChat}
        openInfoModal={openInfoModal}
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

      {/* Modals */}
      {isInfoModalOpen && (
        <ChatInfoModal closeFunction={closeInfoModal} chat={chat} />
      )}
      <RenameChatModal
        open={isRenameModalOpen}
        closeModal={closeRenameModal}
        chatName={chat && chat.name ? chat.name : ''}
        onSubmit={onSubmitRenameChat}
      />
      <DeleteChatModal
        open={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        chatId={chatId}
        onSubmit={onSubmitDeleteChat}
      />

      {/* Decorations */}
      <img
        className="drop-shadow-pink-outline absolute -top-[20px] -right-[20px] w-[74px]"
        src={shisaBento}
      />
    </div>
  );
};

export { Chat };
