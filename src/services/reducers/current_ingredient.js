import { SET_MODAL_INGREDIENT, UNSET_MODAL_INGREDIENT } from '../actions/current_ingredient';

const initialState = {
    current_ingredient: [],
}

export const currentIngredient = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL_INGREDIENT: {
            return {
                ...state,
                current_ingredient: [action.ingredient],
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