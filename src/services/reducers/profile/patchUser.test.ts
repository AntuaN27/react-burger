import { patchUser, initialState } from "./patchUser";
import {
    PATCH_USER_REQUEST,
    PATCH_USER_SUCCESS,
    PATCH_USER_FAILED,
} from "../../constants/profile/patchUser";

describe("patch user reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(patchUser(undefined, { type: "" } as any)).toEqual(initialState);
    })
    it("should handle PATCH_USER_REQUEST", () => {
        const action = { type: PATCH_USER_REQUEST };
        const expectedState = {
            ...initialState,
            patchUserRequest: true,
        }
        expect(patchUser(initialState, action)).toEqual(expectedState)
    })
    it("should handle PATCH_USER_SUCCESS", () => {
        const testData = {
            email: "test@test.ru",
            name: "testUser",
        }
        const action = {
            type: PATCH_USER_SUCCESS,
            payload: { userInfo: testData }
        };
        const expectedState = {
            ...initialState,
            userInfo: testData,
            patchUserRequest: false,
            patchUserFailed: false,
        }
        expect(patchUser(initialState, action)).toEqual(expectedState)
    })
    it("should handle PATCH_USER_FAILED", () => {
        const action = { type: PATCH_USER_FAILED };
        const expectedState = {
            ...initialState,
            patchUserFailed: true
        }
        expect(patchUser(initialState, action)).toEqual(expectedState)
    })
})