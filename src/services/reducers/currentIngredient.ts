import {
    SET_MODAL_INGREDIENT,
    UNSET_MODAL_INGREDIENT
} from "../constants/currentIngredient";
import {TCurrentIngredientActions} from '../actions/currentIngredient';
import {TIngredient} from "../types/data";

type TCurrentIngredientState = {
    current_ingredient: TIngredient | null;
}

const initialState: TCurrentIngredientState = {
    current_ingredient: null,
}

export const currentIngredient = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientState => {
    switch (action.type) {
        case SET_MODAL_INGREDIENT: {
            return {
                ...state,
                current_ingredient: action.payload.ingredient,
            };
        }
        case UNSET_MODAL_INGREDIENT: {
            return {
                ...state,
                current_ingredient: null,
            };
        }
        default: {
            return state;
        }
    }
};