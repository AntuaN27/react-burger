import {createSlice} from "@reduxjs/toolkit";
import {
    connectingProfile,
    onCloseProfile,
    onErrorProfile,
    onMessageProfile,
    onOpenProfile
} from "./actions";

export type TWebsocketState = {
    orders: any[];
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

export const websocketProfileSlice = createSlice({
    name: "websocketProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(connectingProfile, (state) => {
            })
            .addCase(onOpenProfile, (state) => {
            })
            .addCase(onMessageProfile, (state, action) => {
                state.orders = action.payload.orders ?? [];
                state.total = action.payload.total ?? 0;
                state.totalToday = action.payload.totalToday ?? 0;
            })
            .addCase(onErrorProfile, (state, action) => {
                state.error = action.payload;
            })
            .addCase(onCloseProfile, (state) => {
            })
    }
})

export const websocketProfileReducer = websocketProfileSlice.reducer;