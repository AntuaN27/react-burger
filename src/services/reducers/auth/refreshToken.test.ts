import { refreshToken, initialState } from "./refreshToken";
import {
    POST_REFRESH_TOKEN_REQUEST,
    POST_REFRESH_TOKEN_SUCCESS,
    POST_REFRESH_TOKEN_FAILED,
} from "../../constants/auth/refreshToken";

describe("refresh token reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(refreshToken(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle POST_REFRESH_TOKEN_REQUEST", () => {
        const action = { type: POST_REFRESH_TOKEN_REQUEST };
        const expectedState = {
            ...initialState,
            refreshTokenRequest: true,
        };
        expect(refreshToken(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_REFRESH_TOKEN_SUCCESS", () => {
        const action = { type: POST_REFRESH_TOKEN_SUCCESS };
        const expectedState = {
            ...initialState,
            refreshTokenRequest: false,
        };
        expect(refreshToken(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_REFRESH_TOKEN_FAILED", () => {
        const action = { type: POST_REFRESH_TOKEN_FAILED };
        const expectedState = {
            ...initialState,
            refreshTokenRequest: false,
            refreshTokenFailed: true,
        };
        expect(refreshToken(initialState, action)).toEqual(expectedState);
    });
})