import { getUser, initialState } from "./getUser";
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED
} from '../../constants/profile/getUser';

describe("get user reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(getUser(undefined, { type: "" } as any)).toEqual(initialState);
    })
    it("should handle GET_USER_REQUEST", () => {
        const action = { type: GET_USER_REQUEST };
        const expectedState = {
            ...initialState,
            userInfoRequest: true,
        };
        expect(getUser(initialState, action)).toEqual(expectedState);
    })
    it("should handle GET_USER_SUCCESS", () => {
        const testData = {
            email: "test@test.ru",
            name: "testUser",
        };
        const action = {
            type:  GET_USER_SUCCESS,
            payload: { userInfo: testData }
        };
        const expectedState = {
            ...initialState,
            userInfo: testData,
            userInfoRequest: false,
            userInfoFailed: false,
        };
        expect(getUser(initialState, action)).toEqual(expectedState);
    })
    it("should handle GET_USER_FAILED", () => {
        const action = { type:  GET_USER_FAILED};
        const expectedState = {
            ...initialState,
            userInfoRequest: false,
            userInfoFailed: true,
        };
        expect(getUser(initialState, action)).toEqual(expectedState);
    })
})