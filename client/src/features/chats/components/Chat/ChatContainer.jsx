import { useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useJoinRoom } from '@/features/chats/hooks/useJoinRoom.js';
import { ChatView } from '@/features/chats/components/Chat/ChatView.jsx';
import { useChatMessages } from '@/features/chats/hooks/useChatMessages.js';
import { useChatMetadata } from '@/features/chats/hooks/useChatMetadata.js';

const ChatContainer = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { id: currentUserId } = useContext(CurrentContext);
  const { refetchChats } = useContext(ChatsContext);
  const {
    chat,
    updateChatNameClientSide,
  } = useChatMetadata(chatId);
  const {
    messages,
    isLoading: isLoadingMessages,
    errorStatus,
    sendMessage,
  } = useChatMessages(chatId);

  const navigateToChats = () => {
    navigate('/chats');
  };

  if (errorStatus == 400 || errorStatus == 404 || errorStatus == 403) {
    navigateToChats();
  }

  // join room on mount
  useJoinRoom(chatId);

  const onSubmitRenameChat = (name) => {
    updateChatNameClientSide(name);
    refetchChats();
  };

  const navigateToOtherUserProfile = () => {
    const users = chat && chat.users;
    if (users) {
      navigate(`/users/${users.find((user) => user.id != currentUserId).id}`);
    } else {
      navigate(`/users/${currentUserId}`);
    }
  };

  return (
    <ChatView
      currentUserId={currentUserId}
      chat={chat}
      messages={messages}
      isLoadingMessages={isLoadingMessages}
      sendMessage={sendMessage}
      onSubmitRenameChat={onSubmitRenameChat}
      navigateToChats={navigateToChats}
      navigateToOtherUserProfile={navigateToOtherUserProfile}
    />
  );
};

export { ChatContainer };
