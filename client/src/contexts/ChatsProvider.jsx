import { createContext } from 'react';
import { useChats } from '../hooks/useChats.js';

const ChatsContext = createContext({
  chats: [],
  isLoading: false,
  refetchChats: () => {},
});

const ChatsProvider = ({ children }) => {
  const { chats, isLoading, refetch: refetchChats } = useChats();

  return (
    <ChatsContext.Provider value={{ chats, isLoading, refetchChats }}>
      {children}
    </ChatsContext.Provider>
  );
};

export { ChatsProvider, ChatsContext}