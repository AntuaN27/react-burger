import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.module.css';
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)