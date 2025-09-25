import {createAction} from "@reduxjs/toolkit";
import {TWebSocket} from "../types";

export const connectFeed = createAction<string, "ws/feed/connect">("ws/feed/connect");
export const disconnectFeed = createAction("ws/disconnect");

export const connectingFeed = createAction("ws/feed/connecting");
export const onOpenFeed = createAction("ws/feed/onopen");
export const onMessageFeed = createAction<TWebSocket, "ws/feed/onmessage">("ws/feed/onmessage");
export const onErrorFeed = createAction<string, "ws/feed/onerror">("ws/feed/onerror");
export const onCloseFeed = createAction("ws/feed/onclose");

export type WsFeedActionTypes = ReturnType<typeof connectFeed>
    | ReturnType<typeof disconnectFeed>
    | ReturnType<typeof connectingFeed>
    | ReturnType<typeof onOpenFeed>
    | ReturnType<typeof onMessageFeed>
    | ReturnType<typeof onErrorFeed>
    | ReturnType<typeof onCloseFeed>