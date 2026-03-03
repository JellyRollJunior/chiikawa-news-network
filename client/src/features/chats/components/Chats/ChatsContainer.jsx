import { useContext, useEffect } from 'react';
import { CurrentContext } from '@/features/auth/providers/CurrentProvider.jsx';
import { ChatsView } from '@/features/chats/components/Chats/ChatsView.jsx';
import { ChatsContext } from '@/features/chats/providers/ChatsProvider.jsx';
import { usePublicChats } from '@/features/chats/hooks/usePublicChats.js';

const ChatsContainer = () => {
  const { username } = useContext(CurrentContext);

  const {
    chats,
    isLoading: isLoadingChats,
    refetchChats,
  } = useContext(ChatsContext);

  const {
    publicChats,
    isLoading: isLoadingPublicChats,
    refetch: refetchPublicChats,
  } = usePublicChats();

  // refetch chats on load
  useEffect(() => {
    refetchChats();
  }, [refetchChats]);

  return (
    <ChatsView
      username={username}
      chats={chats}
      isLoadingChats={isLoadingChats}
      refetchChats={refetchChats}
      publicChats={publicChats}
      isLoadingPublicChats={isLoadingPublicChats}
      refetchPublicChats={refetchPublicChats}
    />
  );
};

export { ChatsContainer };
