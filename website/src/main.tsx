import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import LogRocket from 'logrocket';
LogRocket.init('or1tor/mylandingpagetech');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
