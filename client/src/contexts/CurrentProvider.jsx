import { createContext } from 'react';
import { useCurrent } from '../hooks/useCurrent.js';

const CurrentContext = createContext({
  id: null,
  username: null,
  bio: null,
  avatar: null,
});

const CurrentProvider = ({ children }) => {
  const { id, username, bio, avatar, isLoading, setBio, setAvatar } =
    useCurrent();

  return (
    <CurrentContext.Provider
      value={{ id, username, bio, avatar, isLoading, setBio, setAvatar }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export { CurrentProvider, CurrentContext };
