import {createSlice} from "@reduxjs/toolkit";
import {connectingFeed, onCloseFeed, onErrorFeed, onMessageFeed, onOpenFeed} from "./actions";
import {TOrder} from "../../types/data";

export type TWebsocketState = {
    orders: TOrder[];
    total: number;
    totalToday: number;
    error: string | null;
}

const initialState: TWebsocketState = {
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
}

export const websocketFeedSlice = createSlice({
    name: "websocketFeed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(connectingFeed, (state) => {
            })
            .addCase(onOpenFeed, (state) => {
            })
            .addCase(onMessageFeed, (state, action) => {
                state.orders = action.payload.orders ?? [];
                state.total = action.payload.total ?? 0;
                state.totalToday = action.payload.totalToday ?? 0;
            })
            .addCase(onErrorFeed, (state, action) => {
                state.error = action.payload;
            })
            .addCase(onCloseFeed, (state) => {
            })
    }
})

export const websocketFeedReducer = websocketFeedSlice.reducer;