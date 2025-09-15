import {
    SET_MODAL_INGREDIENT,
    UNSET_MODAL_INGREDIENT
} from "../constants/currentIngredient";
import {TIngredient} from "../types/data";

export interface ISetModalIngredientAction {
    readonly type: typeof SET_MODAL_INGREDIENT,
    readonly payload: {
        ingredient: TIngredient;
    }
}

export interface IUnsetModalIngredientAction {
    readonly type: typeof UNSET_MODAL_INGREDIENT,
}

export type TCurrentIngredientActions = ISetModalIngredientAction | IUnsetModalIngredientAction;