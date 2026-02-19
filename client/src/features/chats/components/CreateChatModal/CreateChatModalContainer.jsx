import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { useUsers } from '@/features/users/hooks/useUsers.js';
import { useCreateChat } from '@/features/chats/hooks/useCreateChat.js';
import { CreateChatModalView } from '@/features/chats/components/CreateChatModal/CreateChatModalView.jsx';

const CreateChatModalContainer = ({ open = false, closeModal, onSubmit }) => {
  const navigate = useNavigate();
  const { users, isLoading: isLoadingUsers } = useUsers();
  const { createChat, isLoading: isCreatingChat } = useCreateChat();
  const { refetchChats } = useContext(ChatsContext);

  return (
    <CreateChatModalView
      open={open}
      closeModal={closeModal}
      users={users}
      isLoadingUsers={isLoadingUsers}
      createChat={createChat}
      isCreatingChat={isCreatingChat}
      refetchChats={refetchChats}
      onSubmit={onSubmit}
      navigate={navigate}
    />
  );
};

export { CreateChatModalContainer };
