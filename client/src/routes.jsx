import App from './App.jsx';
import { ChatsPage } from './pages/ChatsPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { ErrorPage } from './pages/ErrorPage.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { UserPage } from './pages/UserPage.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: '/', },
      { path: '/chats', element: <ChatsPage /> },
      { path: '/chats/:chatId', element: <ChatPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/users/:userId', element: <UserPage /> }
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
