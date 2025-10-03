import { currentOrder, initialState } from "./currentOrder";
import {
    GET_ORDER_REQUEST,
    GET_ORDER_FAILED,
    GET_ORDER_FEED_SUCCESS,
    GET_ORDER_PROFILE_SUCCESS,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    SET_FEED_MODAL_ORDER,
    SET_MODAL_ORDER,
    SET_PROFILE_MODAL_ORDER,
    UNSET_FEED_MODAL_ORDER,
    UNSET_MODAL_ORDER,
    UNSET_PROFILE_MODAL_ORDER,
} from "../constants/currentOrder";
import {TCreatedOrder, TCurrentOrder, TOrderDetails} from "../types/data";

describe("current order reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(currentOrder(undefined, { type: "" } as any)).toEqual(initialState);
    })
    it("should handle GET_ORDER_REQUEST", () => {
        const action = { type: GET_ORDER_REQUEST };
        const expectedState = {
            ...initialState,
            getOrderRequest: true,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle GET_ORDER_FAILED", () => {
        const action = { type: GET_ORDER_FAILED };
        const expectedState = {
            ...initialState,
            getOrderRequest: false,
            getOrderFailed: true,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle GET_ORDER_FEED_SUCCESS", () => {
        const testData: TOrderDetails = {
            createdAt: "01.10.2025",
            name: "new order",
            number: 1,
            status: 'done',
            updatedAt:  "01.10.2025",
            _id: "12345",
            orderIngredients: [
                {
                   "_id":"60666c42cc7b410027a1a9b3",
                   "name":"Филе Люминесцентного тетраодонтимформа",
                   "type":"main",
                   "proteins":44,
                   "fat":26,
                   "carbohydrates":85,
                   "calories":643,
                   "price":988,
                   "image":"https://code.s3.yandex.net/react/code/meat-03.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
                   "__v":0
                },
                {
                   "_id":"60666c42cc7b410027a1a9bf",
                   "name":"Сыр с астероидной плесенью",
                   "type":"main",
                   "proteins":84,
                   "fat":48,
                   "carbohydrates":420,
                   "calories":3377,
                   "price":4142,
                   "image":"https://code.s3.yandex.net/react/code/cheese.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
                   "__v":0
                },
            ],
            price: 999,
        }
        const action = {
            type: GET_ORDER_FEED_SUCCESS,
            payload: { orderInfo: testData }
        };
        const expectedState = {
            ...initialState,
            openOrderFeed: testData,
            getOrderRequest: false,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle GET_ORDER_PROFILE_SUCCESS", () => {
        const testData: TOrderDetails = {
            createdAt: "01.10.2025",
            name: "new order",
            number: 1,
            status: 'done',
            updatedAt:  "01.10.2025",
            _id: "12345",
            orderIngredients: [
                {
                   "_id":"60666c42cc7b410027a1a9b3",
                   "name":"Филе Люминесцентного тетраодонтимформа",
                   "type":"main",
                   "proteins":44,
                   "fat":26,
                   "carbohydrates":85,
                   "calories":643,
                   "price":988,
                   "image":"https://code.s3.yandex.net/react/code/meat-03.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
                   "__v":0
                },
                {
                   "_id":"60666c42cc7b410027a1a9bf",
                   "name":"Сыр с астероидной плесенью",
                   "type":"main",
                   "proteins":84,
                   "fat":48,
                   "carbohydrates":420,
                   "calories":3377,
                   "price":4142,
                   "image":"https://code.s3.yandex.net/react/code/cheese.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
                   "__v":0
                },
            ],
            price: 999,
        }
        const action = {
            type: GET_ORDER_PROFILE_SUCCESS,
            payload: { orderInfo: testData }
        };
        const expectedState = {
            ...initialState,
            openOrderProfile: testData,
            getOrderRequest: false,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_ORDER_REQUEST", () => {
        const action = { type: POST_ORDER_REQUEST };
        const expectedState = {
            ...initialState,
            postOrderRequest: true,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle POST_ORDER_SUCCESS", () => {
        const action = { type: POST_ORDER_SUCCESS };
        const expectedState = {
            ...initialState,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });

    it("should handle POST_ORDER_FAILED", () => {
        const action = { type: POST_ORDER_FAILED };
        const expectedState = {
            ...initialState,
            postOrderRequest: false,
            postOrderFailed: true,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle SET_FEED_MODAL_ORDER", () => {
        const testData: TOrderDetails = {
            createdAt: "01.10.2025",
            name: "new order",
            number: 1,
            status: 'done',
            updatedAt:  "01.10.2025",
            _id: "12345",
            orderIngredients: [
                {
                   "_id":"60666c42cc7b410027a1a9b3",
                   "name":"Филе Люминесцентного тетраодонтимформа",
                   "type":"main",
                   "proteins":44,
                   "fat":26,
                   "carbohydrates":85,
                   "calories":643,
                   "price":988,
                   "image":"https://code.s3.yandex.net/react/code/meat-03.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
                   "__v":0
                },
                {
                   "_id":"60666c42cc7b410027a1a9bf",
                   "name":"Сыр с астероидной плесенью",
                   "type":"main",
                   "proteins":84,
                   "fat":48,
                   "carbohydrates":420,
                   "calories":3377,
                   "price":4142,
                   "image":"https://code.s3.yandex.net/react/code/cheese.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
                   "__v":0
                },
            ],
            price: 999,
        }
        const action = {
            type: SET_FEED_MODAL_ORDER ,
            payload: { orderInfo: testData }
        };
        const expectedState = {
            ...initialState,
            openOrderFeed: testData
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle SET_MODAL_ORDER", () => {
        const testData: TCurrentOrder = {
            success: true,
            name: "test",
            order: {
                _id: "1",
                ingredients: [
                    {
                       "_id":"60666c42cc7b410027a1a9b3",
                       "name":"Филе Люминесцентного тетраодонтимформа",
                       "type":"main",
                       "proteins":44,
                       "fat":26,
                       "carbohydrates":85,
                       "calories":643,
                       "price":988,
                       "image":"https://code.s3.yandex.net/react/code/meat-03.png",
                       "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                       "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
                       "__v":0
                    }
                ],
                owner: {
                    name: "testUser",
                    email: "testEmail",
                    createdAt: "01.10.2025",
                    updatedAt: "01.10.2025",
                },
                status: 'done',
                name: "test",
                createdAt: "01.10.2025",
                updatedAt: "01.10.2025",
                number: 1,
                price: 10000,
            }
        }
        const action = {
            type: SET_MODAL_ORDER,
            payload: { order: testData }
        };
        const expectedState = {
            ...initialState,
            currentOrder: testData,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle SET_PROFILE_MODAL_ORDER", () => {
        const testData: TOrderDetails = {
            createdAt: "01.10.2025",
            name: "new order",
            number: 1,
            status: 'done',
            updatedAt:  "01.10.2025",
            _id: "12345",
            orderIngredients: [
                {
                   "_id":"60666c42cc7b410027a1a9b3",
                   "name":"Филе Люминесцентного тетраодонтимформа",
                   "type":"main",
                   "proteins":44,
                   "fat":26,
                   "carbohydrates":85,
                   "calories":643,
                   "price":988,
                   "image":"https://code.s3.yandex.net/react/code/meat-03.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/meat-03-large.png",
                   "__v":0
                },
                {
                   "_id":"60666c42cc7b410027a1a9bf",
                   "name":"Сыр с астероидной плесенью",
                   "type":"main",
                   "proteins":84,
                   "fat":48,
                   "carbohydrates":420,
                   "calories":3377,
                   "price":4142,
                   "image":"https://code.s3.yandex.net/react/code/cheese.png",
                   "image_mobile":"https://code.s3.yandex.net/react/code/cheese-mobile.png",
                   "image_large":"https://code.s3.yandex.net/react/code/cheese-large.png",
                   "__v":0
                },
            ],
            price: 999,
        }
        const action = {
            type: SET_PROFILE_MODAL_ORDER,
            payload: { orderInfo: testData }
        };
        const expectedState = {
            ...initialState,
            openOrderProfile: testData,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle UNSET_FEED_MODAL_ORDER", () => {
        const action = { type: UNSET_FEED_MODAL_ORDER };
        const expectedState = {
            ...initialState,
            openOrderFeed: null,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle UNSET_MODAL_ORDER", () => {
        const action = { type: UNSET_MODAL_ORDER };
        const expectedState = {
            ...initialState,
            currentOrder: null,
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
    it("should handle UNSET_PROFILE_MODAL_ORDER", () => {
        const action = { type: UNSET_PROFILE_MODAL_ORDER };
        const expectedState = {
            ...initialState,
            openOrderProfile: null
        };
        expect(currentOrder(initialState, action)).toEqual(expectedState);
    });
})