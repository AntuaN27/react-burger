import { SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT } from '../actions/currentIngredient';

const initialState = {
    current_ingredient: [],
}

// @ts-ignore "sprint5"
export const currentIngredient = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_INGREDIENT: {
            return {
                ...state,
                current_ingredient: [action.payload.ingredient],
            };
        }
        case UNSET_MODAL_INGREDIENT: {
            return {
                ...state,
                current_ingredient: [],
            };
        }
        default: {
            return state;
        }
    }
};