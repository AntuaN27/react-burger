import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from "../constants/burgerIngredients";
import {TIngredient} from "../types/data";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    readonly payload: {
        ingredients: ReadonlyArray<TIngredient>
    }
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TBurgerIngredientsActions = IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;