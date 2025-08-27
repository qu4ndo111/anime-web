import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/lara-dark-indigo/theme.css'; // hoặc theme khác
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';
import './styles/main.scss';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
