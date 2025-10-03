import { burgerConstructor, initialState } from "./burgerConstructor";
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CART,
} from "../constants/burgerСonstructor";
import {TIngredient} from "../types/data";

describe("burger constructor reducer", () => {
    it("should return the initial state when called with undefined state", () => {
        expect(burgerConstructor(undefined, { type: "" } as any)).toEqual(initialState);
    });
    it("should handle ADD_CONSTRUCTOR_INGREDIENT", () => {
        const testData: {ingredient: TIngredient, ingredient_uuid: string} = {
            ingredient: {
                "_id":"60666c42cc7b410027a1a9b2",
               "name":"Флюоресцентная булка R2-D3",
               "type":"bun",
               "proteins":44,
               "fat":26,
               "carbohydrates":85,
               "calories":643,
               "price":988,
               "image":"https://code.s3.yandex.net/react/code/bun-01.png",
               "image_mobile":"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
               "image_large":"https://code.s3.yandex.net/react/code/bun-01-large.png",
               "__v":0
            },
            ingredient_uuid: "550e8400-e29b-41d4-a716-446655440000"
        };
        const action = { type: ADD_CONSTRUCTOR_INGREDIENT, payload: testData };
        const expectedState = {
            ...initialState,
            burger_ingredients: [
                {
                    ...testData.ingredient,
                    uuid: testData.ingredient_uuid,
                }
            ],
        };
        expect(burgerConstructor(initialState, action)).toEqual(expectedState);
    });
    it("should handle REMOVE_CONSTRUCTOR_INGREDIENT", () => {
        const testData = {
            ingredient_uuid: "550e8400-e29b-41d4-a716-446655440000",
        };
        const action = { type: REMOVE_CONSTRUCTOR_INGREDIENT, payload: testData };
        const expectedState = {
          ...initialState,
        };
        expect(burgerConstructor(initialState, action)).toEqual(expectedState);
    });
    it("should handle MOVE_CONSTRUCTOR_INGREDIENT", () => {
        const initial = {
            ...initialState,
            burger_ingredients: [
                { _id: "1", name: "bun", type: "bun", proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: "", image_mobile: "", image_large: "", __v: 0 },
                { _id: "2", name: "cheese", type: "main", proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: "", image_mobile: "", image_large: "", __v: 0 },
                { _id: "3", name: "lettuce", type: "main", proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: "", image_mobile: "", image_large: "", __v: 0 }
            ]
        };
        const testData = {
            fromIndex: 0,
            toIndex: 1,
        };
        const action = { type: MOVE_CONSTRUCTOR_INGREDIENT, payload: testData };
        const expectedState = {
            ...initial,
            burger_ingredients: [
                initial.burger_ingredients[0],
                initial.burger_ingredients[2], // Меняются местами
                initial.burger_ingredients[1]  // Меняются местами
            ]
        };
        expect(burgerConstructor(initial, action)).toEqual(expectedState);
    });
    it("should handle CLEAR_CART", () => {
        const action = { type: CLEAR_CART };
        expect(burgerConstructor(initialState, action)).toEqual(initialState);
    });
})