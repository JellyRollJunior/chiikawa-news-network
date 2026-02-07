import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'simplebar-react/dist/simplebar.min.css';
import App from '@/app/App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
