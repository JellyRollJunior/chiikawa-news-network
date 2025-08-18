import { io } from 'socket.io-client';
import { createContext, useEffect, useState } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const SocketContext = createContext({
  socket: null,
});

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(SERVER_URL, { auth: { token }, withCredentials: true });

    setSocket(socket);

    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
