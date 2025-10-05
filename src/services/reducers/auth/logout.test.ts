import { logout, initialState } from "./logout";
import {
    POST_LOGOUT_REQUEST,
    POST_LOGOUT_SUCCESS,
    POST_LOGOUT_FAILED,
} from "../../constants/auth/logout";

describe("logout reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(logout(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle POST_LOGOUT_REQUEST", () => {
        const action = { type: POST_LOGOUT_REQUEST };
        const expectedState = {
            ...initialState,
            logoutRequest: true,
        };
        expect(logout(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_LOGOUT_SUCCESS", () => {
        const action = { type: POST_LOGOUT_SUCCESS };
        const expectedState = {
            ...initialState,
            logoutRequest: false,
            logoutSuccess: true,
        };
        expect(logout(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_LOGOUT_FAILED", () => {
        const action = { type: POST_LOGOUT_FAILED };
        const expectedState = {
            ...initialState,
            logoutRequest: false,
            logoutFailed: true,
        };
        expect(logout(initialState, action)).toEqual(expectedState);
    });
})