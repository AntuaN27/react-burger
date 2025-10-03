import { resetPassword, initialState } from "./resetPassword";
import {
    POST_RESET_PASSWORD_REQUEST,
    POST_RESET_PASSWORD_SUCCESS,
    POST_RESET_PASSWORD_FAILED,
    RESET_RESET_PASSWORD,
} from "../../constants/auth/resetPassword";

describe("reset password reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(resetPassword(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle POST_RESET_PASSWORD_REQUEST", () => {
        const action = { type: POST_RESET_PASSWORD_REQUEST };
        const expectedState = {
            ...initialState,
            resetPasswordRequest: true,
        };
        expect(resetPassword(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_RESET_PASSWORD_SUCCESS", () => {
        const action = { type: POST_RESET_PASSWORD_SUCCESS };
        const expectedState = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordSuccess: true,
        };
        expect(resetPassword(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_RESET_PASSWORD_FAILED", () => {
        const action = { type: POST_RESET_PASSWORD_FAILED };
        const expectedState = {
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordFailed: true,
        };
        expect(resetPassword(initialState, action)).toEqual(expectedState);
    });
    it("should handle RESET_RESET_PASSWORD", () => {
        const action = { type: RESET_RESET_PASSWORD };
        const expectedState = {
            ...initialState,
        };
        expect(resetPassword(initialState, action)).toEqual(expectedState);
    });
})