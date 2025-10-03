import { burgerIngredients, initialState } from "./burgerIngredients";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../constants/burgerIngredients";
import {TIngredient} from "../types/data";

describe("burger ingredients reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(burgerIngredients(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle GET_INGREDIENTS_REQUEST", () => {
        const action = { type: GET_INGREDIENTS_REQUEST };
        const expectedState = {
            ...initialState,
            ingredientsRequest: true,
        };
        expect(burgerIngredients(initialState, action)).toEqual(expectedState);
    });
    it("should handle GET_INGREDIENTS_SUCCESS", () => {
        const testData: ReadonlyArray<TIngredient> = [
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
        ];
        const action = {
            type: GET_INGREDIENTS_SUCCESS,
            payload: { ingredients: testData}
        };
        const expectedState = {
            ...initialState,
            ingredients: testData,
            ingredientsRequest: false,
        };
        expect(burgerIngredients(initialState, action)).toEqual(expectedState);
    });
    it("should handle GET_INGREDIENTS_FAILED", () => {
        const action = { type: GET_INGREDIENTS_FAILED };
        const expectedState = {
            ...initialState,
            ingredientsRequest: false,
            ingredientsFailed: true,
        };
        expect(burgerIngredients(initialState, action)).toEqual(expectedState);
    });
})