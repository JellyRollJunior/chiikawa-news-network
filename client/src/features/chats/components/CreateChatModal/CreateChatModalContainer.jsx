import { useNavigate } from 'react-router';
import { useUsers } from '@/features/users/hooks/useUsers.js';
import { useCreateChat } from '@/features/chats/hooks/useCreateChat.js';
import { CreateChatModalView } from '@/features/chats/components/CreateChatModal/CreateChatModalView.jsx';

const CreateChatModalContainer = ({ open = false, closeModal }) => {
  const navigate = useNavigate();
  const { users, isLoading: isLoadingUsers } = useUsers();
  const { createChat, isLoading: isCreatingChat } = useCreateChat();

  const handleCreateChat = async (name, selectedUsers) => {
    const data = await createChat(name, selectedUsers);

    if (!data?.id) return;
    
    closeModal();
    navigate(`/chats/${data.id}`);
  };

  return (
    <CreateChatModalView
      open={open}
      closeModal={closeModal}
      users={users}
      isLoadingUsers={isLoadingUsers}
      onCreateChat={handleCreateChat}
      isCreatingChat={isCreatingChat}
    />
  );
};

export { CreateChatModalContainer };
