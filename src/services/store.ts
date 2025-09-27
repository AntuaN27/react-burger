import { rootReducer } from './reducers';
import {configureStore} from "@reduxjs/toolkit";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    connectFeed,
    disconnectFeed,
    onMessageFeed,
    onCloseFeed,
    onOpenFeed,
    onErrorFeed,
    connectingFeed,
} from "./websocket/websocket-feed/actions"
import {
    connectProfile,
    disconnectProfile,
    onMessageProfile,
    onCloseProfile,
    onOpenProfile,
    onErrorProfile,
    connectingProfile,
} from "./websocket/websocket-profile/actions"

const websocketFeedMiddleware = socketMiddleware({
    connect: connectFeed,
    disconnect: disconnectFeed,
    onConnecting: connectingFeed,
    onMessage: onMessageFeed,
    onClose: onCloseFeed,
    onOpen: onOpenFeed,
    onError: onErrorFeed,
})

const websocketProfileMiddleware = socketMiddleware({
    connect: connectProfile,
    disconnect: disconnectProfile,
    onConnecting: connectingProfile,
    onMessage: onMessageProfile,
    onClose: onCloseProfile,
    onOpen: onOpenProfile,
    onError: onErrorProfile,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketFeedMiddleware, websocketProfileMiddleware)
});