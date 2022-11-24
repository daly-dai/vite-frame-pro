import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'virtual:windi.css';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import '@/assets/styles/global.less';

import '@/assets/icon-font/iconfont.css';
import '@/assets/icon-font/iconfont.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
