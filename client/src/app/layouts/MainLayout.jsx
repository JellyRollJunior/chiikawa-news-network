import { Outlet } from 'react-router';
import { SocketProvider } from '@/features/chats/providers/SocketProvider.jsx';
import { CurrentProvider } from '@/features/auth/providers/CurrentProvider.jsx';
import { ChatsProvider } from '@/features/chats/providers/ChatsProvider.jsx';
import { ToastProvider } from '@/shared/providers/ToastProvider.jsx';
import { Toaster } from '@/shared/components/Toaster.jsx';
import { NavWrapper } from '@/app/layouts/NavWrapper.jsx';

const MainLayout = () => {
  return (
    <SocketProvider>
      <CurrentProvider>
        <ChatsProvider>
          <ToastProvider>
            <Toaster />
            <NavWrapper>
              <Outlet />
            </NavWrapper>
          </ToastProvider>
        </ChatsProvider>
      </CurrentProvider>
    </SocketProvider>
  );
};

export { MainLayout };
