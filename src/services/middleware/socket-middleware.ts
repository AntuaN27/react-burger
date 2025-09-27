import {ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware} from "@reduxjs/toolkit";

type TWsActions<R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    onConnecting: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onMessage: ActionCreatorWithPayload<R>;
    onError: ActionCreatorWithPayload<string>;
};

export const socketMiddleware = <A>(wsActions: TWsActions<A>): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        const {
            connect,
            disconnect,
            onConnecting,
            onClose,
            onOpen,
            onMessage,
            onError,
        } = wsActions;
        const {dispatch} = store;
        return (next) => (action) => {
            if (connect.match(action)) {
                socket = new WebSocket(action.payload);
                onConnecting && dispatch(onConnecting());

                socket.onopen = () => {
                    onOpen && dispatch(onOpen());
                };
                socket.onclose = () => {
                    dispatch(onClose());
                };
                socket.onerror = () => {
                    onError && dispatch(onError("WebSocket error"));
                };
                socket.onmessage = (event) => {
                    const {data} = event;
                    try {
                        const parsedData = JSON.parse(data);
                        dispatch(onMessage(parsedData));
                    } catch (error) {
                        dispatch(onError((error as Error).message));
                    }
                };

                return;
            }
            if (socket && disconnect.match(action)) {
                socket.close();
                socket = null;

                return;
            }

            return next(action);
        }
    }
};