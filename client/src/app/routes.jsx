import { MainLayout } from '@/app/layouts/MainLayout.jsx';
import { HomePage } from '@/app/pages/HomePage.jsx';
import { ChatsPage } from '@/app/pages/ChatsPage.jsx';
import { ChatPage } from '@/app/pages/ChatPage.jsx';
import { UserPage } from '@/app/pages/UserPage.jsx';
import { SettingsPage } from '@/app/pages/SettingsPage.jsx';
import { ErrorPage } from '@/app/pages/ErrorPage.jsx';
import { LoginPage } from '@/app/pages/LoginPage.jsx';
import { SignupPage } from '@/app/pages/SignupPage.jsx';
import { UsersPage } from '@/app/pages/UsersPage.jsx';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: '/', element: <HomePage /> },
      { path: '/chats', element: <ChatsPage /> },
      { path: '/chats/:chatId', element: <ChatPage /> },
      { path: '/users', element: <UsersPage /> },
      { path: '/users/:userId', element: <UserPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
];

export { routes };
