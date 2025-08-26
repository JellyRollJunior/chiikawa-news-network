import App from './App.jsx';
import { ChatsPage } from './pages/ChatsPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { UserPage } from './pages/UserPage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: '/', },
      { path: '/chats', element: <ChatsPage /> },
      { path: '/chats/:chatId', element: <ChatPage /> },
      { path: '/users/:userId', element: <UserPage /> },
      { path: '/settings', element: <SettingsPage />}
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
];

export { routes };
