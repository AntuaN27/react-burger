import { currentIngredient, initialState } from "./currentIngredient";
import {
    SET_MODAL_INGREDIENT,
    UNSET_MODAL_INGREDIENT,
} from "../constants/currentIngredient";
import {TIngredient} from "../types/data";

describe("current ingredient reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(currentIngredient(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle SET_MODAL_INGREDIENT", () => {
        const testData: TIngredient = {
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
        const action = {
            type: SET_MODAL_INGREDIENT,
            payload: { ingredient: testData}
        };
        const expectedState = {
            ...initialState,
            current_ingredient: testData
        };
        expect(currentIngredient(initialState, action)).toEqual(expectedState);
    });
    it("should handle UNSET_MODAL_INGREDIENT", () => {
        const action = { type: UNSET_MODAL_INGREDIENT };
        const expectedState = {
            ...initialState,
        };
        expect(currentIngredient(initialState, action)).toEqual(expectedState);
    });
})