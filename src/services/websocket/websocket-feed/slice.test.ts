import { websocketFeedReducer, initialState } from "./slice";
import {
    connectingFeed,
    onCloseFeed,
    onErrorFeed,
    onMessageFeed,
    onOpenFeed,
} from "./actions";
import {TWebSocket} from "../types";

describe("websocket feed reducer", () => {
    it("should handle initial state", () => {
        expect(websocketFeedReducer(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle onMessageFeed", () => {
        const actionPayload: TWebSocket = {
            orders: [
                {
                    createdAt: "01.10.2025",
                    ingredients: [
                        "ingredient 1",
                        "ingredient 2",
                    ],
                    name: "test",
                    number: 1,
                    status: 'created',
                    updatedAt: "01.10.2025",
                    _id: "12345",
                }
            ],
          total: 10,
          totalToday: 5,
        };
        const nextState = websocketFeedReducer(initialState, onMessageFeed(actionPayload));
        expect(nextState.orders).toEqual(actionPayload.orders);
        expect(nextState.total).toEqual(actionPayload.total);
        expect(nextState.totalToday).toEqual(actionPayload.totalToday);
    });
    it("should handle onErrorFeed", () => {
        const error = "Some error";
        const nextState = websocketFeedReducer(initialState, onErrorFeed(error));
        expect(nextState.error).toBe(error);
    });
    it("should handle connectingFeed, onOpenFeed, onCloseFeed without changing state", () => {
        expect(websocketFeedReducer(initialState, connectingFeed())).toEqual(initialState);
        expect(websocketFeedReducer(initialState, onOpenFeed())).toEqual(initialState);
        expect(websocketFeedReducer(initialState, onCloseFeed())).toEqual(initialState);
    });
})