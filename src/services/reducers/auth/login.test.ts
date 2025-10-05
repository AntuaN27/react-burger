import { login, initialState } from "./login";
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILED,
} from "../../constants/auth/login";

describe("login reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(login(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle POST_LOGIN_REQUEST", () => {
        const action = { type: POST_LOGIN_REQUEST };
        const expectedState = {
            ...initialState,
            loginRequest: true,
        };
        expect(login(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_LOGIN_SUCCESS", () => {
        const action = { type: POST_LOGIN_SUCCESS };
        const expectedState = {
            ...initialState,
            loginRequest: false,
        };
        expect(login(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_LOGIN_FAILED", () => {
        const action = { type: POST_LOGIN_FAILED };
        const expectedState = {
            ...initialState,
            loginRequest: false,
            loginFailed: true
        };
        expect(login(initialState, action)).toEqual(expectedState);
    });
})