import { websocketProfileReducer, initialState } from "./slice";
import {
    connectingProfile,
    onCloseProfile,
    onErrorProfile,
    onMessageProfile,
    onOpenProfile
} from "./actions";
import {TWebSocket} from "../types";

describe("websocket profile reducer", () => {
    it("should handle initial state", () => {
        expect(websocketProfileReducer(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle onMessageProfile", () => {
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
        const nextState = websocketProfileReducer(initialState, onMessageProfile(actionPayload));
        expect(nextState.orders).toEqual(actionPayload.orders);
        expect(nextState.total).toEqual(actionPayload.total);
        expect(nextState.totalToday).toEqual(actionPayload.totalToday);
    });
    it("should handle onErrorProfile", () => {
        const error = "Some error";
        const nextState = websocketProfileReducer(initialState, onErrorProfile(error));
        expect(nextState.error).toBe(error);
    })
    it("should handle connectingProfile, onCloseProfile, onOpenProfile without changing state", () => {
        expect(websocketProfileReducer(initialState, connectingProfile())).toEqual(initialState);
        expect(websocketProfileReducer(initialState, onCloseProfile())).toEqual(initialState);
        expect(websocketProfileReducer(initialState, onOpenProfile())).toEqual(initialState);
    });
})