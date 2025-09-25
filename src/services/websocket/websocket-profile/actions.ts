import {createAction} from "@reduxjs/toolkit";
import {TWebSocket} from "../types";

export const connectProfile = createAction<string, "ws/profile/connect">("ws/profile/connect");
export const disconnectProfile = createAction("ws/profile/disconnect");

export const connectingProfile = createAction("ws/profile/connecting");
export const onOpenProfile = createAction("ws/profile/onopen");
export const onMessageProfile = createAction<TWebSocket, "ws/profile/onmessage">("ws/profile/onmessage");
export const onErrorProfile = createAction<string, "ws/profile/onerror">("ws/profile/onerror");
export const onCloseProfile = createAction("ws/profile/onclose");

export type WsProfileActionTypes = ReturnType<typeof connectProfile>
    | ReturnType<typeof disconnectProfile>
    | ReturnType<typeof connectingProfile>
    | ReturnType<typeof onOpenProfile>
    | ReturnType<typeof onMessageProfile>
    | ReturnType<typeof onErrorProfile>
    | ReturnType<typeof onCloseProfile>