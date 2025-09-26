import App from './App.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ChatsPage } from './pages/ChatsPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { UserPage } from './pages/UserPage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';
import { UsersPage } from './pages/UsersPage.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
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
