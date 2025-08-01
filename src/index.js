import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import './index.module.css';
import App from './App'
import { rootReducer } from "./services/reducers";

const store = configureStore({
    reducer: rootReducer
}) // Хотел написать хранилище на обычном redux, но createStore устарел для новых версий библиотеки

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)