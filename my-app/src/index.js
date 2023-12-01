import React from 'react';
import { createRoot } from 'react-dom/client';//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

const container = document.getElementById('root');
const root = createRoot(container); // createRoot instead of ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



