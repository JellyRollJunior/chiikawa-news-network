import { Outlet } from 'react-router';
import { SocketProvider } from './contexts/SocketProvider.jsx';
import { CurrentProvider } from './contexts/CurrentProvider.jsx';
import { ChatsProvider } from './contexts/ChatsProvider.jsx';
import { ToastProvider } from './contexts/ToastProvider.jsx';
import { Toaster } from './components/Toaster.jsx';
import { NavigationPageWrapper } from './components/NavigationPageWrapper.jsx';

function App() {
  return (
    <SocketProvider>
      <CurrentProvider>
        <ChatsProvider>
          <ToastProvider>
            <Toaster />
            <NavigationPageWrapper>
              <Outlet />
            </NavigationPageWrapper>
          </ToastProvider>
        </ChatsProvider>
      </CurrentProvider>
    </SocketProvider>
  );
}

export default App;
