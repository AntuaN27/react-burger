import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import './index.module.css';
import App from './App'
import { rootReducer } from "./services/reducers";

const store = configureStore({
    reducer: rootReducer
});

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)