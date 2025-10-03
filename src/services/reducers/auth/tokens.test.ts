import { authTokens, initialState } from "./tokens";
import {
    AUTH_TOKENS_REQUEST,
    AUTH_TOKENS_SUCCESS,
    AUTH_TOKENS_FAILED,
    SET_AUTH_TOKENS,
    UNSET_AUTH_TOKENS,
} from "../../constants/auth/tokens";

describe("auth tokens reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(authTokens(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle AUTH_TOKENS_REQUEST", () => {
        const action = { type: AUTH_TOKENS_REQUEST };
        const expectedState = {
            ...initialState,
            checkAuthTokensRequest: true,
        };
        expect(authTokens(initialState, action)).toEqual(expectedState);
    });
    it("should handle AUTH_TOKENS_SUCCESS", () => {
        const action = { type: AUTH_TOKENS_SUCCESS };
        const expectedState = {
            ...initialState,
            checkAuthTokensRequest: false,
            isLoggedIn: true,
        };
        expect(authTokens(initialState, action)).toEqual(expectedState);
    });
    it("should handle AUTH_TOKENS_FAILED", () => {
        const action = { type: AUTH_TOKENS_FAILED };
        const expectedState = {
            ...initialState,
            checkAuthTokensRequest: false,
            checkAuthTokensFailed: true,
            isLoggedIn: false,
        };
        expect(authTokens(initialState, action)).toEqual(expectedState);
    });
    it("should handle SET_AUTH_TOKENS", () => {
        const testData = {
            accessToken: "testToken1",
            refreshToken: "testToken2"
        }
        const action = { type: SET_AUTH_TOKENS, payload: testData };
        const expectedState = {
            ...initialState,
            authTokens: testData,
            isLoggedIn: true,
        };
        expect(authTokens(initialState, action)).toEqual(expectedState);
    });
    it("should handle UNSET_AUTH_TOKENS", () => {
        const action = { type: UNSET_AUTH_TOKENS };
        const expectedState = {
            ...initialState,
        };
        expect(authTokens(initialState, action)).toEqual(expectedState);
    });
})