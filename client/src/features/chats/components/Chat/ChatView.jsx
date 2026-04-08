import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ChatMessages } from '@/features/chats/components/ChatMessages.jsx';
import { ChatMessageInput } from '@/features/chats/components/ChatMessageInput.jsx';
import { RenameChatModal } from '@/features/chats/components/RenameChatModal.jsx';
import { DeleteChatModal } from '@/features/chats/components/DeleteChatModal/';
import { ChatInfoModal } from '@/features/chats/components/ChatInfoModal.jsx';
import { Avatar } from '@/shared/components/Avatar.jsx';
import { DotsMenu } from '@/shared/components/DotsMenu.jsx';
import { DotsMenuItem } from '@/shared/components/DotsMenuItem.jsx';

import shisaBento from '@/assets/images/shisa-bento.png';
import arrowBack from '@/assets/svgs/arrow-back.svg';

const ChatView = ({
  currentUserId,
  chat,
  messages,
  isLoadingMessages,
  sendMessage,
  onSubmitRenameChat,
  navigateToChats,
  navigateToOtherUserProfile,
}) => {
  // Modals
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const openRenameModal = () => setIsRenameModalOpen(true);
  const closeRenameModal = () => setIsRenameModalOpen(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // scroll to bottom of messages on message change
  const scrollContainerRef = useRef(null);
  useEffect(() => {
    const element = scrollContainerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleRenameChat = (name) => {
    onSubmitRenameChat(name);
    closeRenameModal();
  };

  const getChatParticipantsString = (userId, users) => {
    if (!users) return null;
    const chatParticipants =
      users.length == 1
        ? [users[0]]
        : users.filter((user) => user.id != userId);
    return chatParticipants.map((user) => user.username).join(', ');
  };

  const chatParticipants = chat
    ? getChatParticipantsString(currentUserId, chat.users)
    : '';
  const isPublicChat = chat && chat.type == 'PUBLIC';
  const isDirectMessage = chat && chat.users && chat.users.length == 2;

  return (
    <div className="h-full w-full relative flex flex-col gap-1.5 px-3 pt-3.5 pb-2.5 lg:ml-0">
      {/* Chat Header */}
      <header className="flex gap-1.5">
        {/* Mobile: Back button */}
        <div className="pink-block shrink-0 pt-2 pl-3 lg:hidden">
          <Link className="flex h-full items-center" to="/chats">
            <img className="w-[20px]" src={arrowBack} />
          </Link>
        </div>

        {/* Avatar, Chat name, Users */}
        <div className="yellow-block grid flex-1 grid-cols-[60px_1fr] grid-rows-5 gap-x-2 rounded-lg px-2 py-2 md:grid-cols-[70px_1fr]">
          <Avatar
            className="row-span-5 size-[60px] self-center border-3 border-dashed border-pink-300 p-0.5 md:size-[70px]"
            avatar={chat && chat.avatar}
          />
          <h2
            className="relative row-span-3 self-end truncate font-medium lg:text-lg"
            title={chat && chat.name}
          >
            {chat && chat.name}
          </h2>
          <p
            className="relative row-span-2 truncate text-sm"
            title={chatParticipants}
          >
            {chatParticipants}
          </p>
        </div>

        {/* Header menu */}
        {!isPublicChat && (
          <div className="pink-block flex shrink-0 items-center pt-3 pr-0.5 pl-1 md:pt-2 md:pr-1.5 md:pl-2">
            <DotsMenu>
              {isDirectMessage && (
                <DotsMenuItem
                  label="View profile"
                  onClick={navigateToOtherUserProfile}
                />
              )}
              <DotsMenuItem label="Conversation info" onClick={openInfoModal} />
              <DotsMenuItem
                label="Rename conversation"
                onClick={openRenameModal}
              />
              <DotsMenuItem
                label="Delete converstation"
                onClick={openDeleteModal}
              />
            </DotsMenu>
          </div>
        )}
      </header>
      <div className="duckegg-block h-4 shrink-0" />

      {/* Chat messages */}
      <div
        ref={scrollContainerRef}
        className="scrollbar-thin pink-block flex-1 overflow-y-scroll px-3 pt-2 pb-1"
      >
        <ChatMessages
          currentUserId={currentUserId}
          messages={messages}
          isPrivateChat={chat && chat.type == 'PRIVATE'}
          isLoadingMessages={isLoadingMessages}
        />
      </div>
      <div className="duckegg-block h-4 shrink-0"></div>
      <ChatMessageInput sendMessage={sendMessage} isDisabled={isLoadingMessages} />

      {/* Modals */}
      <ChatInfoModal
        open={isInfoModalOpen}
        closeModal={closeInfoModal}
        chat={chat}
      />
      <RenameChatModal
        open={isRenameModalOpen}
        closeModal={closeRenameModal}
        chatName={chat && chat.name ? chat.name : ''}
        onSubmit={handleRenameChat}
      />
      <DeleteChatModal
        open={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        chatId={chat && chat.id}
        onSubmit={navigateToChats}
      />

      {/* Decorations */}
      <img
        className="drop-shadow-pink-outline absolute -top-[20px] -right-[20px] w-[74px]"
        src={shisaBento}
      />
    </div>
  );
};

export { ChatView };
