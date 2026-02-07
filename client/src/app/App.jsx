import { createBrowserRouter, RouterProvider } from 'react-router';
import { routes } from '@/app/routes.jsx';

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
