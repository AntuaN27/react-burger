import { forgotPassword, initialState } from "./forgotPassword";
import {
    POST_FORGOT_PASSWORD_REQUEST,
    POST_FORGOT_PASSWORD_SUCCESS,
    POST_FORGOT_PASSWORD_FAILED,
} from "../../constants/auth/forgotPassword";

describe("forgot password reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(forgotPassword(undefined, { type: "" } as any)).toEqual(initialState);
    })
    it("should handle POST_FORGOT_PASSWORD_REQUEST", () => {
        const action = { type: POST_FORGOT_PASSWORD_REQUEST }
        const expectedState = {
            ...initialState,
            forgotPasswordRequest: true,
        }
        expect(forgotPassword(initialState, action)).toEqual(expectedState);
    })
    it("should handle POST_FORGOT_PASSWORD_SUCCESS", () => {
        const action = { type: POST_FORGOT_PASSWORD_SUCCESS }
        const expectedState = {
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: true,
        }
        expect(forgotPassword(initialState, action)).toEqual(expectedState);
    })
    it("should handle POST_FORGOT_PASSWORD_FAILED", () => {
        const action = { type: POST_FORGOT_PASSWORD_FAILED }
        const expectedState = {
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordFailed: true,
        }
        expect(forgotPassword(initialState, action)).toEqual(expectedState);
    })
})