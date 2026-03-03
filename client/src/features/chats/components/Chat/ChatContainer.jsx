import { useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { useChat } from '@/features/chats/hooks/useChat.js';
import { useJoinRoom } from '@/features/chats/hooks/useJoinRoom.js';
import { ChatView } from '@/features/chats/components/Chat/ChatView.jsx';

const ChatContainer = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { id: currentUserId } = useContext(CurrentContext);
  const { refetchChats } = useContext(ChatsContext);
  const {
    chat,
    messages,
    isLoading: isLoadingChat,
    errorStatus,
    sendMessage,
    updateChatNameClientSide,
  } = useChat(chatId);

  if (errorStatus == 400 || errorStatus == 404 || errorStatus == 403) {
    navigate('/chats');
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

  const navigateToChats = () => {
    navigate('/chats');
  };

  return (
    <ChatView
      currentUserId={currentUserId}
      chat={chat}
      messages={messages}
      isLoadingChat={isLoadingChat}
      sendMessage={sendMessage}
      onSubmitRenameChat={onSubmitRenameChat}
      navigateToChats={navigateToChats}
      navigateToOtherUserProfile={navigateToOtherUserProfile}
    />
  );
};

export { ChatContainer };
