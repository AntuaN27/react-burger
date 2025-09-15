import {
    ADD_CONSTRUCTOR_INGREDIENT,
    REMOVE_CONSTRUCTOR_INGREDIENT,
    MOVE_CONSTRUCTOR_INGREDIENT,
    CLEAR_CART,
} from "../constants/burgerСonstructor"
import {TIngredient} from "../types/data";

export interface IAddConstructorIngredientAction {
    readonly type: typeof ADD_CONSTRUCTOR_INGREDIENT;
    readonly payload: {
        ingredient: TIngredient,
        ingredient_uuid: string,
    }
}

export interface IRemoveConstructorIngredientAction {
    readonly type: typeof REMOVE_CONSTRUCTOR_INGREDIENT;
    readonly payload: {
        ingredient_uuid: string,
    }
}

export interface IMoveConstructorIngredientAction {
    readonly type: typeof MOVE_CONSTRUCTOR_INGREDIENT;
    readonly payload: {
        fromIndex: number,
        toIndex: number,
    }
}

export interface IClearCart {
    readonly type: typeof CLEAR_CART;
}

export type TBurgerConstructorActions = IAddConstructorIngredientAction
    | IRemoveConstructorIngredientAction
    | IMoveConstructorIngredientAction
    | IClearCart;