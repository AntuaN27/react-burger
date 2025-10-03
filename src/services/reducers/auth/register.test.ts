import { register, initialState } from "./register";
import {
    POST_REGISTER_REQUEST,
    POST_REGISTER_SUCCESS,
    POST_REGISTER_FAILED,
} from "../../constants/auth/register";

describe("register reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(register(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle POST_REGISTER_REQUEST", () => {
        const action = { type: POST_REGISTER_REQUEST };
        const expectedState = {
            ...initialState,
            registerRequest: true,
        };
        expect(register(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_REGISTER_SUCCESS", () => {
        const action = { type: POST_REGISTER_SUCCESS };
        const expectedState = {
            ...initialState,
            registerRequest: false,
        };
        expect(register(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_REGISTER_FAILED", () => {
        const action = { type: POST_REGISTER_FAILED };
        const expectedState = {
            ...initialState,
            registerRequest: false,
            registerFailed: true,
        };
        expect(register(initialState, action)).toEqual(expectedState);
    });
})